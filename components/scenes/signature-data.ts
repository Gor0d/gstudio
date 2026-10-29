export const signatureStages = [
  { title: "Estratégia", short: "Estratégia", phrase: "Começa pela dor de quem opera, não pela tela.", note: "Escuta, processo e o problema certo." },
  { title: "Design", short: "Design", phrase: "O fluxo ganha forma peça por peça, medido ao pixel.", note: "Hierarquia, espaçamento e interação." },
  { title: "Desenvolvimento", short: "Código", phrase: "Cada peça vira código que roda de verdade.", note: "Componentes, dados e deploy contínuo." },
  { title: "Evolução", short: "Evolução", phrase: "Com o uso, os números e a IA continuam melhorando.", note: "Medir, ajustar e publicar de novo." },
  { title: "Qualquer tela", short: "Telas", phrase: "A mesma lógica, de 1440 a 390 pixels.", note: "O layout se reorganiza sozinho." },
];

export const clientQuote = { before: "A gente perde ", pain: "duas horas por dia", after: " conferindo pedido no WhatsApp." };
export const kpis = [
  { label: "Pedidos hoje", value: 128, suffix: "" },
  { label: "Conferidos pela IA", value: 96, suffix: "%" },
  { label: "Horas salvas / semana", value: 10, suffix: " h" },
];
export const weekBars = [42, 58, 51, 74, 66, 88, 97];
export const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];
export const agentQuestion = "Chegou o pedido do Mercado Sol?";
export const agentAnswer = "Chegou às 10:42. Conferi os 14 itens com o estoque e já mandei para separação.";
export const deployToast = "DEPLOY v1.3 · 2 novas automações no ar";

// One typed line per panel piece, in the same order as the pieces in the markup.
export const codeBefore = ["export function Pedidos() {", "  return (", "    <Painel>"];
export const codePieces = [
  "<Nav />",
  "<Header titulo=\"Pedidos de hoje\" />",
  "<Kpi rotulo=\"Pedidos\" valor={128} />",
  "<Kpi rotulo=\"Conferidos\" valor=\"96%\" />",
  "<Kpi rotulo=\"Horas salvas\" valor=\"10 h\" />",
  "<Grafico dados={semana} />",
  "<AgenteIA canal=\"whatsapp\" />",
];
export const codeIndent = "      ";
export const codeAfter = ["    </Painel>", "  );", "}"];

export type TokenKind = "keyword" | "punct" | "string" | "expr" | "tag" | "attr" | "plain";
export type Token = { text: string; kind: TokenKind };
const rules: [RegExp, TokenKind][] = [
  [/^(export|function|return)\b/, "keyword"],
  [/^(<\/?|\/?>)/, "punct"],
  [/^"[^"]*"/, "string"],
  [/^\{[^}]*\}/, "expr"],
  [/^[A-Z][A-Za-z]*/, "tag"],
  [/^[a-z][A-Za-z]*(?==)/, "attr"],
  [/^[\s\S]/, "plain"],
];

/** Just enough JSX highlighting for the demo; not a real lexer. */
export function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let rest = line;
  while (rest) {
    for (const [pattern, kind] of rules) {
      const match = pattern.exec(rest);
      if (!match) continue;
      const previous = tokens[tokens.length - 1];
      if (kind === "plain" && previous?.kind === "plain") previous.text += match[0];
      else tokens.push({ text: match[0], kind });
      rest = rest.slice(match[0].length);
      break;
    }
  }
  return tokens;
}

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export function highlight(tokens: Token[], count = Infinity) {
  let left = count, html = "";
  for (const token of tokens) {
    if (left <= 0) break;
    const part = token.text.slice(0, left);
    left -= part.length;
    html += `<span class="tk-${token.kind}">${escape(part)}</span>`;
  }
  return html;
}
