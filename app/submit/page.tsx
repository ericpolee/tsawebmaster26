'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { categories } from '@/lib/resources-data'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  category: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  hours: string
  services: string
  submitterName: string
  submitterEmail: string
  additionalInfo: string
}

const initialFormData: FormData = {
  name: '',
  category: '',
  description: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  hours: '',
  services: '',
  submitterName: '',
  submitterEmail: '',
  additionalInfo: '',
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Resource name is required'
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    if (!formData.submitterName.trim()) {
      newErrors.submitterName = 'Your name is required'
    }
    if (!formData.submitterEmail.trim()) {
      newErrors.submitterEmail = 'Your email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitterEmail)) {
      newErrors.submitterEmail = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData(initialFormData)
  }
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="paper-texture rounded-3xl p-12 shadow-xl animate-fade-in-up">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-serif text-chestnut mb-4">Thank You!</h1>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Your resource submission has been received. Our team will review it and add it to the community hub soon. 
                We appreciate you helping grow our neighborhood directory!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:bg-chestnut"
                >
                  Submit Another
                </button>
                <a
                  href="/resources"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-terracotta text-terracotta rounded-xl font-medium transition-all duration-300 hover:bg-terracotta hover:text-primary-foreground"
                >
                  Browse Resources
                </a>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
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
              <span className="inline-block px-4 py-1 bg-honey/20 text-chestnut rounded-full text-sm mb-4">
                Contribute
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-chestnut mb-4">
                Add a Resource
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Know a great local service, nonprofit, or program? Help your neighbors discover it by submitting it to our community hub.
              </p>
            </div>
          </div>
        </section>
        
        {/* Form Section */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Resource Information */}
              <div className={`paper-texture rounded-3xl p-8 shadow-lg transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-chestnut">Resource Information</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Resource Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Community Food Bank"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 bg-card transition-colors focus:outline-none",
                        errors.name 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-terracotta"
                      )}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                      Category <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 bg-card transition-colors focus:outline-none appearance-none",
                        errors.category 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-terracotta"
                      )}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-destructive mt-1">{errors.category}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card transition-colors focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                      Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about this resource and how it helps the community..."
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 bg-card transition-colors focus:outline-none resize-none",
                        errors.description 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-terracotta"
                      )}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive mt-1">{errors.description}</p>
                    )}
                  </div>
                  
                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                      Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, City, State"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 bg-card transition-colors focus:outline-none",
                        errors.address 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-terracotta"
                      )}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Resource Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@resource.org"
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card transition-colors focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  
                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://resource.org"
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card transition-colors focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  
                  {/* Hours */}
                  <div className="sm:col-span-2">
                    <label htmlFor="hours" className="block text-sm font-medium text-foreground mb-2">
                      Hours of Operation
                    </label>
                    <input
                      type="text"
                      id="hours"
                      name="hours"
                      value={formData.hours}
                      onChange={handleChange}
                      placeholder="Mon-Fri: 9AM-5PM, Sat: 10AM-2PM"
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card transition-colors focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  
                  {/* Services */}
                  <div className="sm:col-span-2">
                    <label htmlFor="services" className="block text-sm font-medium text-foreground mb-2">
                      Services Offered
                    </label>
                    <textarea
                      id="services"
                      name="services"
                      value={formData.services}
                      onChange={handleChange}
                      rows={3}
                      placeholder="List the services provided (one per line or comma-separated)..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card transition-colors focus:outline-none focus:border-terracotta resize-none"
                    />
                  </div>
                </div>
              </div>
              
              {/* Your Information */}
              <div className={`paper-texture rounded-3xl p-8 shadow-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-chestnut">Your Information</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Submitter Name */}
                  <div>
                    <label htmlFor="submitterName" className="block text-sm font-medium text-foreground mb-2">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="submitterName"
                      name="submitterName"
                      value={formData.submitterName}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 bg-card transition-colors focus:outline-none",
                        errors.submitterName 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-terracotta"
                      )}
                    />
                    {errors.submitterName && (
                      <p className="text-sm text-destructive mt-1">{errors.submitterName}</p>
                    )}
                  </div>
                  
                  {/* Submitter Email */}
                  <div>
                    <label htmlFor="submitterEmail" className="block text-sm font-medium text-foreground mb-2">
                      Your Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="submitterEmail"
                      name="submitterEmail"
                      value={formData.submitterEmail}
                      onChange={handleChange}
                      placeholder="jane@email.com"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border-2 bg-card transition-colors focus:outline-none",
                        errors.submitterEmail 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-terracotta"
                      )}
                    />
                    {errors.submitterEmail && (
                      <p className="text-sm text-destructive mt-1">{errors.submitterEmail}</p>
                    )}
                  </div>
                  
                  {/* Additional Info */}
                  <div className="sm:col-span-2">
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-foreground mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Anything else we should know about this resource?"
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card transition-colors focus:outline-none focus:border-terracotta resize-none"
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className={`text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "inline-flex items-center gap-3 px-10 py-4 bg-terracotta text-primary-foreground rounded-2xl font-medium text-lg transition-all duration-300",
                    isSubmitting 
                      ? "opacity-70 cursor-not-allowed" 
                      : "hover:bg-chestnut hover:scale-105 hover:shadow-xl"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Resource
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  By submitting, you confirm this information is accurate to the best of your knowledge.
                </p>
              </div>
            </form>
          </div>
        </section>
        
        {/* Tips Section */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="paper-texture rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-serif text-chestnut mb-6 text-center">Tips for a Great Submission</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Be Accurate</h4>
                  <p className="text-sm text-muted-foreground">
                    Double-check contact information and hours to help neighbors find the right info.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Be Descriptive</h4>
                  <p className="text-sm text-muted-foreground">
                    Share what makes this resource special and who it can help in our community.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-chestnut" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Think Local</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on resources that serve our local community and neighborhood.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
