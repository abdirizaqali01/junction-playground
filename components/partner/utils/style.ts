import type { CSSProperties } from 'react'

export const withVars = <T extends string>(
  style: CSSProperties,
  vars: Record<T, string>
) => ({ ...style, ...vars }) as CSSProperties & Record<T, string>

