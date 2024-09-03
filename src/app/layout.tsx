import "@/app/globals.css";

import type { Metadata } from "next";
import { Kaisei_Opti } from "next/font/google";

import { MusicProvider } from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "Lyric App Sample",
  description: "Sample Lyric Application with React + TextAlive",
};

const kaisei_opti = Kaisei_Opti({
  subsets: ["latin"],
  variable: "--font-kaisei-opti",
  weight: ["400"],
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" className={`${kaisei_opti.variable}`}>
      <body>
        <MusicProvider>
          <div className="h-svh w-full overflow-hidden">{children}</div>
        </MusicProvider>
      </body>
    </html>
  );
}
