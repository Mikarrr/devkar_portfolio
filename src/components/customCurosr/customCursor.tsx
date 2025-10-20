'use client'
import { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [dotPos, setDotPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })

      const timeoutId = setTimeout(() => {
        setDotPos({ x: e.clientX, y: e.clientY })
      }, 100)

      return () => clearTimeout(timeoutId)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (
        target.closest('.rev-button') ||
        target.closest('.menu-logo') ||
        target.closest('.arrow-rev-button') ||
        target.closest('.category-filter ul li') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (
        target.closest('.rev-button') ||
        target.closest('.menu-logo') ||
        target.closest('.arrow-rev-button') ||
        target.closest('.category-filter ul li') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div>
      <div
        className={`cursor-dot ${isHovering ? 'large' : ''}`}
        style={{
          left: `${dotPos.x}px`,
          top: `${dotPos.y}px`,
        }}
      ></div>
      <div className="cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>
    </div>
  )
}

export default CustomCursor
