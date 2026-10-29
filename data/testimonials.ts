export type Testimonial = { id: string; quote: string; author: string; role: string; published: boolean; placeholder: boolean };

// TODO: substituir por depoimentos reais, com autorização e atribuição confirmadas.
// Estes campos são espaços editoriais, não depoimentos de clientes.
export const testimonials: Testimonial[] = [
  { id: "operacao", quote: "Espaço reservado para um relato sobre a experiência de construir com a Gorod.", author: "Nome a confirmar", role: "Papel e projeto a confirmar", published: false, placeholder: true },
  { id: "produto", quote: "Espaço reservado para uma evidência de resultado, acompanhada de contexto e fonte.", author: "Nome a confirmar", role: "Papel e projeto a confirmar", published: false, placeholder: true },
];
