import { company } from "@/data/config";
export function whatsappUrl(message = "Hello Timeless, I'd like to make an enquiry.") {
  return company.whatsapp ? `https://wa.me/${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : "/contact";
}
