import { ServicePage } from "@/components/service-page"; export default function Page({params}:{params:{service:string}}){return <ServicePage division="memories" slug={params.service}/>}
