import 'bootstrap-icons/font/bootstrap-icons.css'
import type { Metadata } from 'next'
import './css/lib/bootstrap/bootstrap-cyborg.css'

export const metadata: Metadata = {
  title: 'hedgehacks | GTrend Tool',
  description:
    'Hedgehacks is a GTrend social arb trading tool to help you find your next big trade or idea.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
