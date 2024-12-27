import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { useRouter } from "next/navigation"
import NavBarPc from "@/Components/NavBarPc"
import dynamic from "next/dynamic"

const NavBarMobile = dynamic(() => import("@/Components/navbarMobile"), {
  ssr: false,
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "shreyansh's 3D portfolio",
  description:
    "3D portfolio created by shreyansh that has wholesome 3D exoerience",
  applicationName: "my-world-3D",
  keywords:
    "react-three-fiber , three js , r3f , 3d portfolio , next js , react js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden bg-black antialiased`}
      >
        <div className="">
          <div className="hidden lg:block  ">
            <NavBarPc />
          </div>
          <div className="lg:hidden block  top-0  w-full">
            <NavBarMobile />
          </div>
          <div className=" ">{children}</div>
        </div>
      </body>
    </html>
  )
}
