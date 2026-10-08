import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";

export function WhatsAppButton() {
  return <a className="whatsapp-fab" href={whatsappUrl("Olá! Vim pelo site da Gorod Studio e quero conversar sobre um projeto.")} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={22} /><span>WhatsApp</span></a>;
}
