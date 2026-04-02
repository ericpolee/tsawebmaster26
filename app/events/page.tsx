'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { events, type Event } from '@/lib/resources-data'
import { cn } from '@/lib/utils'

const eventCategories = ['All', 'Social', 'Workshop', 'Employment', 'Youth', 'Seniors', 'Health', 'Food', 'Community']

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)) // April 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const filteredEvents = useMemo(() => {
    let filtered = events
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(e => e.category === selectedCategory)
    }
    
    if (selectedDate) {
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.date)
        return eventDate.toDateString() === selectedDate.toDateString()
      })
    }
    
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [selectedCategory, selectedDate])
  
  // Calendar generation
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (number | null)[] = []
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }, [currentDate])
  
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear()
    })
  }
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(null)
  }
  
  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    if (selectedDate?.toDateString() === clickedDate.toDateString()) {
      setSelectedDate(null)
    } else {
      setSelectedDate(clickedDate)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Header */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="inline-block px-4 py-1 bg-sage/10 text-sage rounded-full text-sm mb-4">
                Community Calendar
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-chestnut mb-4">
                Upcoming Events
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join your neighbors at local gatherings, workshops, and community celebrations. There&apos;s always something happening!
              </p>
            </div>
          </div>
        </section>
        
        {/* Category Filters */}
        <section className="py-6 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {eventCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category)
                    setSelectedDate(null)
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedCategory === category
                      ? "bg-sage text-primary-foreground scale-105"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Calendar and Events */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className={`lg:col-span-1 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <div className="paper-texture rounded-3xl p-6 shadow-lg sticky top-24">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-secondary rounded-full transition-colors"
                      aria-label="Previous month"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h2 className="text-xl font-semibold text-chestnut">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-secondary rounded-full transition-colors"
                      aria-label="Next month"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Day Labels */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />
                      }
                      
                      const dayEvents = getEventsForDay(day)
                      const hasEvents = dayEvents.length > 0
                      const isSelected = selectedDate?.getDate() === day && 
                                        selectedDate?.getMonth() === currentDate.getMonth()
                      const isToday = day === 1 && currentDate.getMonth() === 3 && currentDate.getFullYear() === 2026
                      
                      return (
                        <button
                          key={day}
                          onClick={() => handleDateClick(day)}
                          className={cn(
                            "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200",
                            isSelected
                              ? "bg-terracotta text-primary-foreground scale-110 shadow-lg"
                              : hasEvents
                                ? "bg-sage/10 hover:bg-sage/20"
                                : "hover:bg-secondary",
                            isToday && !isSelected && "ring-2 ring-terracotta"
                          )}
                        >
                          <span className={cn(
                            "text-sm font-medium",
                            isSelected ? "text-primary-foreground" : "text-foreground"
                          )}>
                            {day}
                          </span>
                          {hasEvents && (
                            <div className="flex gap-0.5 mt-1">
                              {dayEvents.slice(0, 3).map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    isSelected ? "bg-primary-foreground" : "bg-sage"
                                  )}
                                />
                              ))}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Legend */}
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-sage/20 rounded" />
                        <span>Has Events</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-terracotta rounded" />
                        <span>Selected</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="mt-4 w-full py-2 text-sm text-terracotta hover:text-chestnut transition-colors"
                    >
                      Clear date filter
                    </button>
                  )}
                </div>
              </div>
              
              {/* Events List */}
              <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif text-chestnut">
                    {selectedDate 
                      ? `Events on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                      : selectedCategory === 'All' 
                        ? 'All Events'
                        : `${selectedCategory} Events`
                    }
                  </h2>
                  <span className="text-muted-foreground">
                    {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-16 paper-texture rounded-3xl">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-semibold text-chestnut mb-2">No events found</h3>
                    <p className="text-muted-foreground">Try selecting a different date or category</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} delay={index * 0.05} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

interface EventCardProps {
  event: Event
  delay: number
}

function EventCard({ event, delay }: EventCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])
  
  const eventDate = new Date(event.date)
  
  return (
    <article
      className={cn(
        "group paper-texture rounded-2xl overflow-hidden transition-all duration-500",
        "hover:shadow-lg",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Date Badge */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-terracotta/10 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-terracotta">
                {eventDate.getDate()}
              </span>
              <span className="text-sm text-muted-foreground">
                {eventDate.toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>
          </div>
          
          {/* Event Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                getCategoryStyles(event.category)
              )}>
                {event.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-chestnut group-hover:text-terracotta transition-colors mb-2">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          </div>
          
          {/* Expand Button */}
          <div className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all duration-300",
              isExpanded && "rotate-180"
            )}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Content */}
      <div className={cn(
        "overflow-hidden transition-all duration-500",
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-6 pt-0">
          <div className="pl-0 sm:pl-24 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Organized by:</span>
              <span className="font-medium text-foreground">{event.organizer}</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta text-primary-foreground rounded-xl text-sm font-medium transition-all duration-300 hover:bg-chestnut">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Calendar
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-terracotta text-terracotta rounded-xl text-sm font-medium transition-all duration-300 hover:bg-terracotta hover:text-primary-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function getCategoryStyles(category: string): string {
  const styles: Record<string, string> = {
    Social: 'bg-terracotta/10 text-terracotta',
    Workshop: 'bg-honey/20 text-chestnut',
    Employment: 'bg-chestnut/10 text-chestnut',
    Youth: 'bg-sage/10 text-sage',
    Seniors: 'bg-honey/20 text-chestnut',
    Health: 'bg-sage/10 text-sage',
    Food: 'bg-terracotta/10 text-terracotta',
    Community: 'bg-sage/10 text-sage',
  }
  return styles[category] || 'bg-secondary text-secondary-foreground'
}
