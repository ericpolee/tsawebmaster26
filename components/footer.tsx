import Link from 'next/link'

export function Footer() {
  return (
    <footer className="paper-texture border-t-4 border-dashed border-terracotta/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 60 60" className="w-10 h-10" aria-hidden="true">
                <path d="M10 35 L30 15 L50 35 L50 50 L10 50 Z" fill="oklch(0.55 0.14 45)" />
                <path d="M5 35 L30 10 L55 35 L50 35 L30 15 L10 35 Z" fill="oklch(0.35 0.08 50)" />
                <rect x="25" y="38" width="10" height="12" rx="1" fill="oklch(0.75 0.12 85)" />
                <path d="M30 28 C28 26 24 26 24 29 C24 32 30 35 30 35 C30 35 36 32 36 29 C36 26 32 26 30 28" fill="oklch(0.55 0.15 140)" />
              </svg>
              <span className="font-caveat text-2xl text-chestnut">Neighborly</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Connecting neighbors with the resources, services, and events that make our community thrive. 
              Because good neighbors look out for each other.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-chestnut mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-terracotta transition-colors">
                  Browse Resources
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-terracotta transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-terracotta transition-colors">
                  Add a Resource
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-chestnut mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@neighborly.community
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Made with care for our community
            </p>
            <p className="text-sm text-muted-foreground">
              Building stronger neighborhoods, one connection at a time
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
