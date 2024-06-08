/**
 * Technical Product Requirements Document (Tech PRD)
 *
 * Component: CardContainer, CardBody, CardItem, and useMouseEnter
 *
 * Overview:
 * This module provides a set of components and a custom hook to create a 3D card effect
 * with smooth animations triggered by mouse events. The `CardContainer` acts as the main wrapper
 * that handles mouse movements and applies perspective transformations. The `CardBody` and `CardItem`
 * components are used to build the 3D card structure, allowing nested elements to have independent animations.
 * The `useMouseEnter` hook provides context-based state management to track mouse enter events.
 *
 * Features:
 * 1. **3D Transformations**: Apply 3D rotation and translation effects on mouse move, enter, and leave.
 * 2. **Context Management**: Use React context to share mouse enter state across components.
 * 3. **Customizable Animations**: Allow individual items to have their own transformation settings.
 * 4. **Responsive Design**: Flexbox and utility classes ensure components adapt to various screen sizes.
 * 5. **Reusable Components**: Modular design with `CardContainer`, `CardBody`, and `CardItem` components.
 *
 * Component Breakdown:
 * - `CardContainer`: The main wrapper that handles mouse events and applies perspective transformations.
 * - `CardBody`: Container for the card content, applying preserve-3D transform style.
 * - `CardItem`: Individual card items that can be transformed independently based on mouse enter state.
 * - `useMouseEnter`: Custom hook to use the mouse enter state within the context.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces.
 * - next/image: Component for optimized image rendering in Next.js.
 * - cn: Utility function for conditional class names (assumed to be similar to classnames library).
 *
 * Props:
 * - `CardContainer`:
 *   - `children`: ReactNode, content of the card container.
 *   - `className`: Additional class names for styling.
 *   - `containerClassName`: Class names for the outer container.
 * - `CardBody`:
 *   - `children`: ReactNode, content of the card body.
 *   - `className`: Additional class names for styling.
 * - `CardItem`:
 *   - `as`: Element type for the card item (default is 'div').
 *   - `children`: ReactNode, content of the card item.
 *   - `className`: Additional class names for styling.
 *   - `translateX`, `translateY`, `translateZ`: Number or string, translation values for 3D transformation.
 *   - `rotateX`, `rotateY`, `rotateZ`: Number or string, rotation values for 3D transformation.
 *
 * How to Use:
 * 1. Wrap the card components inside `CardContainer` to enable 3D transformations.
 * 2. Use `CardBody` to structure the main content of the card.
 * 3. Use `CardItem` to define individual items with customizable transformations.
 * 4. Ensure `useMouseEnter` hook is used within the `MouseEnterContext.Provider`.
 */

'use client' // This directive is used in Next.js to indicate that the component is a client-side component

import { cn } from '@/lib/utils' // Utility function for conditional class names
import Image from 'next/image' // Next.js optimized image component
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react'

// Create a context to manage mouse enter state
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

// Main container component that applies 3D transformations based on mouse events
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null) // Reference for the container element
  const [isMouseEntered, setIsMouseEntered] = useState(false) // State to track if the mouse is inside the container

  // Handle mouse move event to apply 3D rotation based on cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
  }

  // Handle mouse enter event
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true)
    if (!containerRef.current) return
  }

  // Handle mouse leave event to reset transformations
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
        style={{
          perspective: '1000px', // Set perspective to create 3D effect
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'flex items-center justify-center relative transition-all duration-200 ease-linear',
            className
          )}
          style={{
            transformStyle: 'preserve-3d', // Ensure nested elements are also transformed
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

// Component to define the body of the card
export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
        className
      )}
    >
      {children}
    </div>
  )
}

// Component to define individual items within the card with customizable transformations
export const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
}) => {
  const ref = useRef<HTMLDivElement>(null) // Reference for the item element
  const [isMouseEntered] = useMouseEnter() // Get mouse enter state from context

  useEffect(() => {
    handleAnimations() // Apply transformations when mouse enter state changes
  }, [isMouseEntered])

  const handleAnimations = () => {
    if (!ref.current) return
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
    }
  }

  return (
    <Tag
      ref={ref}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Custom hook to use the mouse enter context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider')
  }
  return context
}
