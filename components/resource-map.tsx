'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Resource } from '@/lib/resources-data'

interface ResourceMapProps {
  resources: Resource[]
  selectedResource?: Resource | null
  onResourceSelect?: (resource: Resource) => void
  showHeatmap?: boolean
}

export function ResourceMap({ resources, selectedResource, onResourceSelect, showHeatmap = false }: ResourceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [40.7128, -74.006],
      zoom: 13,
      scrollWheelZoom: true,
    })

    // Add warm-toned tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map)

    mapInstanceRef.current = map
    setIsLoaded(true)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Add markers
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Category colors
    const categoryColors: Record<string, string> = {
      food: '#b5593a',
      shelter: '#5a4a3a',
      health: '#5a8a6a',
      education: '#c9a45c',
      community: '#b5593a',
      youth: '#5a8a6a',
      seniors: '#c9a45c',
      employment: '#5a4a3a',
    }

    resources.forEach(resource => {
      const color = categoryColors[resource.category] || '#b5593a'
      
      // Custom marker icon
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 14px;
            ">
              ${getCategoryIcon(resource.category)}
            </span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      })

      const marker = L.marker(resource.coordinates, { icon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div style="font-family: Georgia, serif; padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #5a4a3a; font-size: 16px;">${resource.name}</h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">${resource.address}</p>
            <p style="margin: 0 0 8px 0; color: #888; font-size: 12px;">${resource.hours}</p>
            <div style="
              display: inline-block;
              padding: 4px 12px;
              background: ${color};
              color: white;
              border-radius: 20px;
              font-size: 11px;
              text-transform: capitalize;
            ">${resource.category}</div>
          </div>
        `)

      marker.on('click', () => {
        if (onResourceSelect) {
          onResourceSelect(resource)
        }
      })

      markersRef.current.push(marker)
    })
  }, [resources, isLoaded, onResourceSelect])

  // Pan to selected resource
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedResource || !isLoaded) return
    
    mapInstanceRef.current.flyTo(selectedResource.coordinates, 15, {
      duration: 1
    })
    
    // Open popup for selected marker
    const marker = markersRef.current.find((_, index) => 
      resources[index]?.id === selectedResource.id
    )
    if (marker) {
      marker.openPopup()
    }
  }, [selectedResource, isLoaded, resources])

  // Add heatmap effect
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || !showHeatmap) return

    // Simple heatmap visualization using circles
    const heatmapLayers: L.Circle[] = []
    
    resources.forEach(resource => {
      const circle = L.circle(resource.coordinates, {
        color: 'transparent',
        fillColor: '#b5593a',
        fillOpacity: 0.15,
        radius: 300,
      }).addTo(mapInstanceRef.current!)
      
      heatmapLayers.push(circle)
    })

    return () => {
      heatmapLayers.forEach(layer => layer.remove())
    }
  }, [resources, isLoaded, showHeatmap])

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-secondary">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 paper-texture p-4 rounded-xl shadow-lg z-[1000]">
        <h4 className="text-sm font-semibold text-chestnut mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-terracotta" />
            <span>Food & Community</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sage" />
            <span>Health & Youth</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-honey" />
            <span>Education & Seniors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chestnut" />
            <span>Shelter & Jobs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    food: '🍽',
    shelter: '🏠',
    health: '💚',
    education: '📚',
    community: '👥',
    youth: '⭐',
    seniors: '💛',
    employment: '💼',
  }
  return icons[category] || '📍'
}
