import json, os, secrets, sqlite3, time
from contextlib import closing
from typing import Any
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel, ConfigDict, Field

DB=os.getenv("DATABASE_PATH","/data/timeless.db")
STATUSES=("New","Contacted","Confirmed","In Progress","Completed","Cancelled")
app=FastAPI(title="Timeless API",docs_url=None,redoc_url=None)
origins=[x.strip() for x in os.getenv("CORS_ORIGINS","http://localhost:3000").split(",")]
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_methods=["GET","POST","PATCH"],allow_headers=["*"])
security=HTTPBasic()

def connect():
    db=sqlite3.connect(DB);db.row_factory=sqlite3.Row;return db

@app.on_event("startup")
def initialize():
    os.makedirs(os.path.dirname(DB),exist_ok=True)
    with closing(connect()) as db:
        db.execute("""create table if not exists enquiries(id integer primary key autoincrement,reference text unique not null,division text not null,status text not null default 'New',customer_name text not null,phone text not null,email text,service text,event_date text,details text not null,internal_notes text,created_at text not null default current_timestamp,updated_at text not null default current_timestamp)""");db.commit()

class Enquiry(BaseModel):
    model_config=ConfigDict(extra="allow")
    division:str=Field(pattern="^(memories|services|general)$")
    customer_name:str=Field(min_length=2,max_length=120)
    phone:str=Field(min_length=5,max_length=40)
    email:str|None=None
    service:str|None=None
    event_date:str|None=None
    needed_date:str|None=None

def admin(credentials:HTTPBasicCredentials=Depends(security)):
    expected=os.getenv("ADMIN_PASSWORD","")
    if not expected or not secrets.compare_digest(credentials.password,expected):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials",headers={"WWW-Authenticate":"Basic"})

@app.get("/health")
def health(): return {"status":"ok"}

@app.post("/enquiries",status_code=201)
def create_enquiry(item:Enquiry):
    reference=f"TL-{int(time.time()*1000):X}"
    values=item.model_dump();event_date=values.get("event_date") or values.get("needed_date")
    with closing(connect()) as db:
        db.execute("insert into enquiries(reference,division,customer_name,phone,email,service,event_date,details) values(?,?,?,?,?,?,?,?)",(reference,item.division,item.customer_name,item.phone,item.email,item.service,event_date,json.dumps(values)));db.commit()
    return {"reference":reference}

@app.get("/admin/enquiries",dependencies=[Depends(admin)])
def list_enquiries():
    with closing(connect()) as db:return [dict(row) for row in db.execute("select * from enquiries order by created_at desc limit 500")]

class Update(BaseModel):
    status:str|None=None
    internal_notes:str|None=None

@app.patch("/admin/enquiries/{enquiry_id}",dependencies=[Depends(admin)])
def update_enquiry(enquiry_id:int,item:Update):
    if item.status and item.status not in STATUSES:raise HTTPException(400,"Invalid status")
    with closing(connect()) as db:
        found=db.execute("select id from enquiries where id=?",(enquiry_id,)).fetchone()
        if not found:raise HTTPException(404,"Enquiry not found")
        if item.status:db.execute("update enquiries set status=?,updated_at=current_timestamp where id=?",(item.status,enquiry_id))
        if item.internal_notes is not None:db.execute("update enquiries set internal_notes=?,updated_at=current_timestamp where id=?",(item.internal_notes,enquiry_id))
        db.commit()
    return {"ok":True}
