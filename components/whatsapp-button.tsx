"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";
export function WhatsAppButton() {
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return <a hidden={footerVisible} className="whatsapp-fab" href={whatsappUrl("Olá! Vim pelo site da Gorod Studio e quero conversar sobre um projeto.")} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={22} /><span>WhatsApp</span></a>;
}
