'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { resources, categories, type Resource } from '@/lib/resources-data'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

// Dynamic import for the map to avoid SSR issues
const ResourceMap = dynamic(() => import('@/components/resource-map').then(mod => mod.ResourceMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-secondary/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

function ResourcesContent() {
  const searchParams = useSearchParams()
  const highlightId = searchParams.get('id')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    
    // If there's a highlight ID, find and select that resource
    if (highlightId) {
      const resource = resources.find(r => r.id === highlightId)
      if (resource) {
        setSelectedResource(resource)
      }
    }
  }, [highlightId])
  
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(resource.category)
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories])
  
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="inline-block px-4 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm mb-4">
                Community Directory
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-chestnut mb-4">
                Local Resources
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find nonprofits, services, and programs in your neighborhood. Use the map and filters to discover what&apos;s nearby.
              </p>
            </div>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search resources, services, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 paper-texture rounded-2xl border-2 border-border focus:border-terracotta focus:outline-none transition-colors text-lg"
              />
              <svg 
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedCategories.includes(category.id)
                      ? "bg-terracotta text-primary-foreground scale-105"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  )}
                >
                  {category.label}
                </button>
              ))}
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="px-4 py-2 rounded-full text-sm font-medium border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* View Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredResources.length}</span> resources
              </p>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-terracotta focus:ring-terracotta"
                  />
                  <span className="text-sm">Show Heatmap</span>
                </label>
                <div className="flex items-center bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === 'grid' ? "bg-card shadow" : "hover:bg-muted"
                    )}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      viewMode === 'list' ? "bg-card shadow" : "hover:bg-muted"
                    )}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map and Resources Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="lg:sticky lg:top-24 h-[500px] lg:h-[calc(100vh-120px)] rounded-3xl overflow-hidden shadow-xl">
                <ResourceMap 
                  resources={filteredResources}
                  selectedResource={selectedResource}
                  onResourceSelect={setSelectedResource}
                  showHeatmap={showHeatmap}
                />
              </div>
              
              {/* Resources List */}
              <div className="space-y-6">
                {filteredResources.length === 0 ? (
                  <div className="text-center py-16 paper-texture rounded-3xl">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-chestnut mb-2">No resources found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className={cn(
                    viewMode === 'grid' 
                      ? "grid sm:grid-cols-2 gap-6" 
                      : "space-y-4"
                  )}>
                    {filteredResources.map((resource, index) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isSelected={selectedResource?.id === resource.id}
                        onSelect={() => setSelectedResource(resource)}
                        viewMode={viewMode}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Resource Detail Modal */}
        {selectedResource && (
          <ResourceDetailModal
            resource={selectedResource}
            onClose={() => setSelectedResource(null)}
          />
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  )
}

interface ResourceCardProps {
  resource: Resource
  isSelected: boolean
  onSelect: () => void
  viewMode: 'grid' | 'list'
  delay: number
}

function ResourceCard({ resource, isSelected, onSelect, viewMode, delay }: ResourceCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  if (viewMode === 'list') {
    return (
      <article
        onClick={onSelect}
        className={cn(
          "group paper-texture rounded-2xl p-4 flex gap-4 cursor-pointer transition-all duration-300",
          isSelected 
            ? "ring-2 ring-terracotta shadow-lg" 
            : "hover:shadow-md",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={resource.image}
            alt={resource.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-chestnut group-hover:text-terracotta transition-colors truncate">
              {resource.name}
            </h3>
            <span className="flex-shrink-0 px-2 py-1 bg-secondary text-xs rounded-full capitalize">
              {resource.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{resource.description}</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {resource.address}
          </p>
        </div>
      </article>
    )
  }
  
  return (
    <article
      onClick={onSelect}
      className={cn(
        "group paper-texture rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
        isSelected 
          ? "ring-2 ring-terracotta shadow-xl scale-[1.02]" 
          : "hover:shadow-lg hover:-translate-y-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={resource.image}
          alt={resource.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chestnut/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="px-2 py-1 bg-card/90 backdrop-blur rounded-full text-xs capitalize">
            {resource.category}
          </span>
          {resource.featured && (
            <span className="px-2 py-1 bg-honey text-chestnut rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-chestnut group-hover:text-terracotta transition-colors line-clamp-1">
          {resource.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {resource.description}
        </p>
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {resource.hours}
        </div>
      </div>
    </article>
  )
}

interface ResourceDetailModalProps {
  resource: Resource
  onClose: () => void
}

function ResourceDetailModal({ resource, onClose }: ResourceDetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-chestnut/40 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative paper-texture rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-card transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={resource.image}
            alt={resource.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chestnut/60 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm capitalize mb-3">
              {resource.category}
            </span>
            <h2 className="text-3xl font-serif text-chestnut">{resource.name}</h2>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
          
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
              <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div className="text-sm font-medium">Address</div>
                <div className="text-sm text-muted-foreground">{resource.address}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
              <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <div className="text-sm font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">{resource.phone}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
              <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-sm font-medium">Email</div>
                <div className="text-sm text-muted-foreground break-all">{resource.email}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
              <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-sm font-medium">Hours</div>
                <div className="text-sm text-muted-foreground">{resource.hours}</div>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-chestnut mb-3">Services Offered</h3>
            <div className="flex flex-wrap gap-2">
              {resource.services.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sage/10 text-sage rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:bg-chestnut hover:scale-105"
            >
              Visit Website
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={`tel:${resource.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-terracotta text-terracotta rounded-xl font-medium transition-all duration-300 hover:bg-terracotta hover:text-primary-foreground"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
