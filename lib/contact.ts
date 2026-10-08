export const WHATSAPP_NUMBER = "5591982837669";
export const WHATSAPP_DISPLAY = "(91) 98283-7669";
export const CONTACT_EMAIL = "emersongsguimaraes@gmail.com";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
