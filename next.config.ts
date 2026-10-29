import type { NextConfig } from "next";

// "standalone" é usado só na imagem Docker; na Vercel quebra o trace de arquivos.
const nextConfig: NextConfig = {
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
