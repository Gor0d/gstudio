"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useMotionPreferences } from "./motion-provider";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [["Soluções", "/servicos"], ["Projetos", "/projetos"], ["Como trabalhamos", "/#processo"], ["Sobre", "/sobre"]];
export function SiteHeader() {
  const pathname = usePathname();
  const { enabled } = useMotionPreferences();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onHash = () => setHash(window.location.hash);
    onScroll(); onHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("hashchange", onHash); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; element?.close(); };
  }, [open]);
  function close() { setOpen(false); dialog.current?.close(); trigger.current?.focus(); }
  function trapFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const targets = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = targets[0], last = targets[targets.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  function current(href: string): "page" | "location" | undefined {
    if (href === "/#processo") return pathname === "/" && hash === "#processo" ? "location" : undefined;
    return pathname === href || pathname.startsWith(href + "/") ? "page" : undefined;
  }
  function navLinks(mobile = false) { return links.map(([label, href]) => <Link key={href} href={href} aria-current={current(href)} onClick={() => { setHash(href.includes("#") ? "#processo" : ""); close(); }}>{label}{current(href) && !mobile && <motion.span className="nav-active-indicator" layoutId="nav-active-indicator" aria-hidden="true" transition={enabled ? { type: "spring", stiffness: 400, damping: 35 } : { duration: 0 }} />}</Link>); }
  return <header className={"site-header" + (scrolled ? " is-scrolled" : "")}><div className="shell header-inner">
    <Link href="/" onClick={() => setHash("")} className="brand" aria-label="Gorod Studio, página inicial"><span className="brand-mark" aria-hidden="true">G</span><span>Gorod <strong>Studio</strong></span></Link>
    <nav className="desktop-nav" aria-label="Navegação principal">{navLinks()}</nav>
    <Link href="/contato" aria-current={pathname === "/contato" ? "page" : undefined} className="button button-small header-cta">Orçamento <ArrowUpRight size={15} /></Link>
    <button ref={trigger} className="mobile-menu-trigger" aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={23} /></button>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu-dialog" aria-labelledby="mobile-menu-title" onKeyDown={trapFocus} onCancel={close} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="mobile-menu-content"><div className="mobile-menu-top"><span id="mobile-menu-title">Explorar a Gorod</span><button className="mobile-menu-close" aria-label="Fechar menu" onClick={close} autoFocus><X size={24} /></button></div><nav aria-label="Navegação móvel">{navLinks(true)}<Link href="/contato" className="button" onClick={close}>Conversar sobre um projeto <ArrowUpRight size={17} /></Link></nav></div>
    </dialog>
  </div></header>;
}
