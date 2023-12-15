import '@mantine/core/styles.css';
import './globals.css';
import { AxiomWebVitals } from 'next-axiom';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Nav from '@/components/Nav/Nav';

export const metadata = {
  title: 'Buk - A Singular Social Network',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 
          ! Comment this line while you are using cypress, 
          ! it has hydration issues, even with the `suppressHydrationWarning` attribute 
        */}
        <ColorSchemeScript suppressHydrationWarning />
        <AxiomWebVitals />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Nav />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
