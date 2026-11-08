import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = { title: "Turnos" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 760, margin: "0 auto", padding: 24 }}>
        <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <Link href="/">Servicios</Link>
          <Link href="/book">Reservar</Link>
          <Link href="/appointments">Mis turnos</Link>
          <Link href="/admin">Reporte</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
