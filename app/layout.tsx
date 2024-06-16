import './globals.css'
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from "@/components/navbar/nav"
import FootBar from "@/components/footer/foot"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";

export const revalidate = 0;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tracker',
  description: 'Bug Tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="light" lang="en" className={inter.className}>
      <link rel="icon" href="/bug.svg" sizes="any" />
      <body className='w-full h-full overflow-scroll'>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={"flex flex-col w-full p-2 md:container mx-auto min-h-screen justify-between"}>
            <NavBar />
            <div className="flex container justify-center min-h-[68vh]">
              {children}
            </div>
            <FootBar />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
