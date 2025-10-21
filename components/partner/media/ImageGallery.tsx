"use client"

import React from 'react'

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
          className="bg-[#464646]/50 rounded-lg aspect-video flex items-center justify-center overflow-hidden"
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
