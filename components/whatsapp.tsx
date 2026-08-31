import { MessageCircle } from "lucide-react"; import { whatsappUrl } from "@/lib/whatsapp";
export function WhatsApp(){return <a href={whatsappUrl()} className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink text-ivory shadow-xl" aria-label="Contact Timeless on WhatsApp"><MessageCircle/></a>}
