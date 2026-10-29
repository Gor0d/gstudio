export type TeamMember = { id: string; name: string; role: string; image: string; linkedin: string | null; published: boolean; placeholder: boolean };
// TODO: preencher nomes, papéis, fotos autorizadas e URLs do LinkedIn dos sócios.
export const team: TeamMember[] = [
  { id: "socio-1", name: "Nome do sócio · a confirmar", role: "Papel no estúdio · a confirmar", image: "/team/socio-1.svg", linkedin: null, published: false, placeholder: true },
  { id: "socio-2", name: "Nome do sócio · a confirmar", role: "Papel no estúdio · a confirmar", image: "/team/socio-2.svg", linkedin: null, published: false, placeholder: true },
];
