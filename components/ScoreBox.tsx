import React, { useState } from 'react'

interface ScoreBoxProps {
  value: number
  onChange: (value: number) => void
}

export function ScoreBox({ value, onChange }: ScoreBoxProps) {
  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex gap-3">
      {scores.map((score) => (
        <button
          key={score}
          onClick={() => onChange(score)}
          className={`w-12 h-12 rounded-full font-semibold text-lg transition-all ${
            value === score
              ? 'bg-[#55D186] text-white scale-110'
              : 'bg-[#55D186]/20 text-[#55D186] hover:bg-[#55D186]/30'
          }`}
        >
          {score}
        </button>
      ))}
    </div>
  )
}