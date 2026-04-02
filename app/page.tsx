'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { resources, events } from '@/lib/resources-data'
import { useEffect, useState } from 'react'

const featuredResources = resources.filter(r => r.featured)
const upcomingEvents = events.slice(0, 3)

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-honey/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                  <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Your neighborhood, connected</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-chestnut">
                  <span className="block">Welcome to</span>
                  <span className="font-caveat text-terracotta">Neighborly</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Discover local resources, connect with community programs, and find the support you need. 
                  Because good neighbors look out for each other.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-primary-foreground rounded-2xl font-medium text-lg transition-all duration-300 hover:bg-chestnut hover:scale-105 hover:shadow-xl"
                  >
                    Explore Resources
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-medium text-lg transition-all duration-300 hover:bg-muted hover:scale-105"
                  >
                    View Events
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <div className="font-caveat text-4xl text-terracotta">{resources.length}+</div>
                    <div className="text-sm text-muted-foreground">Local Resources</div>
                  </div>
                  <div className="text-center">
                    <div className="font-caveat text-4xl text-sage">{events.length}+</div>
                    <div className="text-sm text-muted-foreground">Community Events</div>
                  </div>
                  <div className="text-center">
                    <div className="font-caveat text-4xl text-honey">8</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Decorative frame */}
                  <div className="absolute inset-0 bg-terracotta/10 rounded-3xl transform rotate-3" />
                  <div className="absolute inset-0 bg-sage/10 rounded-3xl transform -rotate-2" />
                  
                  {/* Main image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src="/images/hero-cozy-neighborhood.jpg"
                      alt="Cozy neighborhood illustration"
                      width={600}
                      height={600}
                      className="object-cover"
                      priority
                    />
                    
                    {/* Floating cards */}
                    <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-xl animate-float">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Find Resources</div>
                          <div className="text-xs text-muted-foreground">Near You</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Community</div>
                          <div className="text-xs text-muted-foreground">Support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Resources Section */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm mb-4">
                Community Spotlight
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-chestnut mb-4">
                Featured Resources
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover some of the wonderful organizations and services that make our neighborhood special
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <article
                  key={resource.id}
                  className={`group paper-texture rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 stagger-${index + 1} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={resource.image}
                      alt={resource.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-chestnut/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-card/90 backdrop-blur rounded-full text-sm text-foreground capitalize">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-chestnut group-hover:text-terracotta transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {resource.address}
                    </div>
                    
                    <Link
                      href={`/resources?id=${resource.id}`}
                      className="inline-flex items-center gap-2 text-terracotta font-medium hover:gap-3 transition-all"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-terracotta text-terracotta rounded-2xl font-medium transition-all duration-300 hover:bg-terracotta hover:text-primary-foreground"
              >
                View All Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="inline-block px-4 py-1 bg-sage/10 text-sage rounded-full text-sm mb-4">
                  Mark Your Calendar
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-chestnut">
                  Upcoming Events
                </h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-terracotta font-medium hover:gap-3 transition-all"
              >
                See Full Calendar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <article
                  key={event.id}
                  className={`group paper-texture rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300 stagger-${index + 1} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                >
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-20 h-20 bg-terracotta/10 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-terracotta">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2 py-1 bg-sage/10 text-sage text-xs rounded-full">
                        {event.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {event.time}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-chestnut group-hover:text-terracotta transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="hidden md:flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-terracotta group-hover:text-primary-foreground transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20 bg-terracotta/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="paper-texture rounded-3xl p-12 md:p-16 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-4 border-dashed border-terracotta/20 rounded-full" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-4 border-dashed border-sage/20 rounded-full" />
              
              <h2 className="text-3xl md:text-4xl font-serif text-chestnut mb-4">
                Know a Great Resource?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Help grow our community hub by sharing local nonprofits, services, or programs that neighbors should know about.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-primary-foreground rounded-2xl font-medium text-lg transition-all duration-300 hover:bg-chestnut hover:scale-105 hover:shadow-xl"
              >
                Submit a Resource
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
