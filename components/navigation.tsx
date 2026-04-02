'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/resources', label: 'Resources' },
    { href: '/events', label: 'Events' },
    { href: '/submit', label: 'Add Resource' },
  ]
  
  return (
    <header className="sticky top-0 z-50 paper-texture border-b-4 border-dashed border-terracotta/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <svg 
                viewBox="0 0 60 60" 
                className="w-12 h-12 transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              >
                {/* House base */}
                <path 
                  d="M10 35 L30 15 L50 35 L50 50 L10 50 Z" 
                  fill="oklch(0.55 0.14 45)" 
                  className="transition-all duration-300"
                />
                {/* Roof */}
                <path 
                  d="M5 35 L30 10 L55 35 L50 35 L30 15 L10 35 Z" 
                  fill="oklch(0.35 0.08 50)"
                />
                {/* Door */}
                <rect x="25" y="38" width="10" height="12" rx="1" fill="oklch(0.75 0.12 85)" />
                {/* Windows */}
                <rect x="14" y="38" width="8" height="7" rx="1" fill="oklch(0.85 0.03 85)" />
                <rect x="38" y="38" width="8" height="7" rx="1" fill="oklch(0.85 0.03 85)" />
                {/* Chimney with smoke */}
                <rect x="40" y="18" width="6" height="12" fill="oklch(0.45 0.06 50)" />
                <circle cx="43" cy="14" r="3" fill="oklch(0.90 0.02 80)" className="animate-float" opacity="0.7" />
                <circle cx="45" cy="10" r="2" fill="oklch(0.92 0.02 80)" className="animate-float" style={{ animationDelay: '0.5s' }} opacity="0.5" />
                {/* Heart detail */}
                <path 
                  d="M30 28 C28 26 24 26 24 29 C24 32 30 35 30 35 C30 35 36 32 36 29 C36 26 32 26 30 28" 
                  fill="oklch(0.55 0.15 140)"
                  className="transition-transform duration-300 group-hover:scale-110 origin-center"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-caveat text-3xl text-chestnut leading-none tracking-tight">
                Neighborly
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Community Hub
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-lg font-medium transition-all duration-300 rounded-xl",
                  "hover:bg-secondary hover:text-foreground",
                  pathname === link.href 
                    ? "text-terracotta" 
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-terracotta rounded-full" />
                )}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6 text-chestnut" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300",
                  "hover:bg-secondary",
                  pathname === link.href 
                    ? "bg-secondary text-terracotta" 
                    : "text-muted-foreground"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
