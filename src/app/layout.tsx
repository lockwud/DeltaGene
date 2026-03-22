import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DeltaGene | Advanced Genetic Solutions',
  description: 'Discover your genetic potential with DeltaGene. Cutting-edge DNA testing and personalized health insights powered by advanced genetic science.',
  keywords: 'genetic testing, DNA, health, personalized medicine, genetics, DeltaGene',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
