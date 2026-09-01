export type Division="memories"|"tailoring";
export type Service={name:string;slug:string;division:Division;short:string;long:string;available:boolean;options:string[]};
export const services:Service[]=[
 {name:"Fingerprint Tree",slug:"fingerprint-tree",division:"memories",short:"An artwork your guests complete together, one fingerprint at a time.",long:"Guests add individual fingerprints during the event, gradually creating a personalized tree that represents the people who shared the occasion.",available:true,options:["Couple names","Event date","Frame style","Colour theme","Guest count","Custom message"]},
 {name:"Memory Dropbox",slug:"memory-dropbox",division:"memories",short:"A personal collection of messages to revisit after the celebration.",long:"Guests write personal messages onto individual pieces, creating a collection the couple can keep and revisit.",available:true,options:["Couple photo","Names","Wedding date","Message-piece shape","Display design","Theme"]},
 {name:"Personalized Memory Piece",slug:"personalized-memory-piece",division:"memories",short:"A custom keepsake shaped around your story.",long:"A personalized piece designed around the people, details and feeling of your occasion.",available:true,options:[]},
 {name:"Custom Tailoring",slug:"custom-tailoring",division:"tailoring",short:"Clothing considered and made around you.",long:"From the first idea to the final fitting, we create clothing around the individual, occasion and desired feeling.",available:true,options:[]}
];
export const divisionServices=(d:Division)=>services.filter(s=>s.division===d&&s.available);
export const whatsapp=(message="Hello Timeless, I'd like to make an enquiry.")=>{const number=import.meta.env.VITE_WHATSAPP_NUMBER||"";return number?`https://wa.me/${number.replace(/\D/g,"")}?text=${encodeURIComponent(message)}`:"/contact"};
