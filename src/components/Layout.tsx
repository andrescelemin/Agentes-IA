/**
 * Main layout component that wraps all pages
 * Provides consistent header, navigation, and footer across the site
 */
import { ReactNode } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
