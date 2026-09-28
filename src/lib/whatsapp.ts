export const WHATSAPP_CONFIG = {
  phone: "2348000000000",
  brandName: "AURELIA ESTATES",
} as const;

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encoded}`;
}

export function openWhatsApp(message: string): void {
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

export function propertyInterestMessage(
  propertyName: string,
  location: string
): string {
  return `Hello ${WHATSAPP_CONFIG.brandName}, I'm interested in ${propertyName} in ${location}. I would like to know more about this property.`;
}

export function contactFormMessage(data: {
  name: string;
  email: string;
  phone: string;
  property?: string;
  message: string;
}): string {
  const propertyLine = data.property
    ? `\nProperty of interest: ${data.property}`
    : "";
  return `Hello ${WHATSAPP_CONFIG.brandName},\n\nMy name is ${data.name}.\nEmail: ${data.email}\nPhone: ${data.phone}${propertyLine}\n\nMessage:\n${data.message}`;
}

export function viewingRequestMessage(data: {
  name: string;
  email: string;
  phone: string;
  property: string;
  date: string;
  time: string;
  message: string;
}): string {
  return `Hello ${WHATSAPP_CONFIG.brandName},\n\nI would like to request a viewing.\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProperty: ${data.property}\nPreferred Date: ${data.date}\nPreferred Time: ${data.time}\n\nMessage:\n${data.message || "Looking forward to scheduling a visit."}`;
}
