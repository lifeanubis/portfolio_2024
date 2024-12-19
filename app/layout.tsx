import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { useRouter } from "next/navigation"
import NavBarPc from "@/Components/NavBarPc"
import NavBarMobile from "@/Components/navbarMobile"

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
  title: "Create Next App",
  description: "Generated by create next app",
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
          <div className="hidden lg:block ">
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
