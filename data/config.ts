export type Service = { name: string; slug: string; shortDescription: string; longDescription: string; division: "memories" | "tailoring"; available: boolean; featured: boolean; price?: number; priceMode: "exact" | "starting" | "quote"; customizationOptions: string[] };

export const company = {
  name: "TIMELESS",
  tagline: "Made for moments that matter.",
  description: "Personalized memories and custom tailoring created around the moments, people and stories that matter to you.",
  instagram: "https://www.instagram.com/timeless__memoriess/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
};

export const services: Service[] = [
  { name: "Fingerprint Tree", slug: "fingerprint-tree", division: "memories", shortDescription: "An artwork your guests complete together, one fingerprint at a time.", longDescription: "Guests add individual fingerprints during the event, gradually creating a personalized tree that represents the people who shared the occasion.", available: true, featured: true, priceMode: "quote", customizationOptions: ["Couple names", "Event date", "Frame style", "Colour theme", "Guest count", "Custom message"] },
  { name: "Memory Dropbox", slug: "memory-dropbox", division: "memories", shortDescription: "A personal collection of messages to revisit long after the celebration.", longDescription: "Guests write personal messages onto individual pieces, creating a collection the couple can keep and revisit after the celebration.", available: true, featured: true, priceMode: "quote", customizationOptions: ["Couple photo", "Names", "Wedding date", "Message-piece shape", "Display design", "Theme"] },
  { name: "Personalized Memory Piece", slug: "personalized-memory-piece", division: "memories", shortDescription: "A custom keepsake shaped around your story.", longDescription: "A personalized piece designed around the people, details and feeling of your occasion.", available: true, featured: false, priceMode: "quote", customizationOptions: [] },
  { name: "Custom Tailoring", slug: "custom-tailoring", division: "tailoring", shortDescription: "Clothing considered and made around you.", longDescription: "From the first idea to the final fitting, we create clothing around the individual, the occasion and the way it should feel.", available: true, featured: true, priceMode: "quote", customizationOptions: [] },
  { name: "Alterations", slug: "alterations", division: "tailoring", shortDescription: "Thoughtful adjustments for a better fit.", longDescription: "Tell us what needs attention and when you need it. We will contact you to discuss fit and availability.", available: false, featured: false, priceMode: "quote", customizationOptions: [] },
];

export const activeServices = (division: Service["division"]) => services.filter((s) => s.division === division && s.available);
export const formatPrice = (s: Service) => s.priceMode === "quote" || !s.price ? "Request quote" : `${s.priceMode === "starting" ? "Starting from " : ""}RWF ${s.price.toLocaleString()}`;
