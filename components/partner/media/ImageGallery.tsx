"use client"

import React from 'react'
import { partnerSurfaces } from '@/styles/design-system'

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) return null
  
  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {images.map((img, index) => (
        <div 
          key={index} 
          className="rounded-lg aspect-video flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: partnerSurfaces.placeholder }}
        >
          <img 
            src={img} 
            alt={`Project image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
