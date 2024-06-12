/**
 * Technical Product Requirements Document (Tech PRD)
 *
 * Component: HeroParallax
 *
 * Overview:
 * The `HeroParallax` component is designed to display a series of product cards with a parallax scrolling effect.
 * As the user scrolls, the product cards move at different speeds, creating a visually appealing 3D effect.
 * This component utilizes the 'framer-motion' library for smooth animations and 'next/image' for optimized image rendering.
 * It is divided into a main container, a header, and individual product cards.
 *
 * Features:
 * 1. **Parallax Scrolling**: The product cards move horizontally and rotate as the user scrolls down the page.
 * 2. **Responsive Design**: The layout adapts to different screen sizes, ensuring a consistent experience across devices.
 * 3. **Smooth Animations**: Spring animations are used for natural and fluid transitions.
 * 4. **Optimized Images**: Using 'next/image' for efficient image loading and rendering.
 * 5. **Hover Effects**: Product cards have hover effects for improved interactivity and user engagement.
 *
 * Component Breakdown:
 * - `HeroParallax`: Main container that organizes products into three rows and applies the parallax effect.
 * - `Header`: Displays a title and description at the top of the component.
 * - `ProductCard`: Individual card component displaying product details, with animations and hover effects.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces.
 * - framer-motion: Library for declarative animations in React.
 * - next/image: Component for optimized image rendering in Next.js.
 * - next/link: Component for client-side navigation in Next.js.
 *
 * Props:
 * - `products`: Array of product objects, each containing `title`, `link`, and `thumbnail`.
 *
 * Scroll Animation Details:
 * - Horizontal Translation: Products in the first and third rows move right, while those in the second row move left.
 * - Rotation: Product cards rotate slightly as they appear into view.
 * - Opacity: Product cards fade in as they come into view.
 * - Vertical Translation: The entire block of product cards moves vertically for additional depth effect.
 *
 * How to Use:
 * 1. Pass an array of product objects to the `HeroParallax` component.
 * 2. Each product object should have `title`, `link`, and `thumbnail`.
 * 3. Include the component in a page to display the parallax scrolling effect.
 */

'use client' // This directive is used in Next.js to indicate that the component is a client-side component

import React from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Main component that creates the parallax effect with product cards
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    link: string
    thumbnail: string
  }[]
}) => {
  const firstRow = products.slice(0, 5) // First 5 products
  const secondRow = products.slice(5, 10) // Next 5 products
  const thirdRow = products.slice(10, 15) // Last 5 products
  const ref = React.useRef(null) // Reference for the container element
  const { scrollYProgress } = useScroll({
    target: ref, // Track the scroll progress of the container
    offset: ['start start', 'end start'], // Offset for the scroll tracking
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 } // Configuration for spring animations

  // Creating spring animations with transformation values based on scroll progress
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]), // Horizontal translation
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]), // Horizontal translation in reverse
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]), // Rotation around X-axis
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), // Opacity transition
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]), // Rotation around Z-axis
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]), // Vertical translation
    springConfig
  )

  return (
    <div
      ref={ref} // Attach ref to the container
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX, // Apply rotation around X-axis
          rotateZ, // Apply rotation around Z-axis
          translateY, // Apply vertical translation
          opacity, // Apply opacity transition
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX} // Apply horizontal translation
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse} // Apply reverse horizontal translation
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX} // Apply horizontal translation
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

// Header component for the hero section
export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> development studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  )
}

// ProductCard component to display individual product details
export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
  translate: MotionValue<number> // MotionValue for horizontal translation
}) => {
  return (
    <motion.div
      style={{
        x: translate, // Apply horizontal translation
      }}
      whileHover={{
        y: -20, // Move up on hover
      }}
      key={product.title}
      className="group/product h-32 w-56 md:h-96 md:w-96  relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  )
}
