import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import './theme-config.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import '@radix-ui/themes/styles.css';
import Provider from './auth/Provider';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'I-Tracker',
  description: 'Issue-Tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Provider>
          {/* <Theme appearance="light" accentColor="blue" radius="full"> */}
          <Theme accentColor="blue" grayColor="olive" radius="full">
            <NavBar />
            <main className='p-5'>
              <Container>
                {children}
              </Container>
            </main>
            {/* <ThemePanel /> */}
          </Theme>
        </Provider>
      </body>

    </html >
  )
}
