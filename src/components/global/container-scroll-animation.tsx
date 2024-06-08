/**
 * This React component uses the 'framer-motion' library for animations and 'next/image' for optimized image rendering.
 * The `ContainerScroll` component is a scrollable container that includes a header and a card.
 * The card rotates and scales based on the user's scroll progress, and the header translates vertically.
 * It also adapts its layout depending on whether the user is on a mobile device.
 */

'use client' // This directive is used in Next.js to indicate that the component is a client-side component

import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'

export const ContainerScroll = ({
  titleComponent,
}: {
  titleComponent: string | React.ReactNode
}) => {
  const containerRef = useRef<any>(null) // Create a reference for the container element
  const { scrollYProgress } = useScroll({
    target: containerRef, // Track the scroll progress of the container
  })
  const [isMobile, setIsMobile] = React.useState(false) // State to check if the device is mobile

  // Effect to set and update the mobile state based on window width
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Consider mobile if width is 768px or less
    }
    checkMobile() // Initial check
    window.addEventListener('resize', checkMobile) // Add resize event listener
    return () => {
      window.removeEventListener('resize', checkMobile) // Clean up the event listener on unmount
    }
  }, [])

  // Function to get scale dimensions based on whether the device is mobile
  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  // Transformations based on scroll progress
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]) // Rotate from 20 degrees to 0
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions()) // Scale based on the device type
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]) // Translate vertically from 0 to -100px

  return (
    <div
      className="h-[80rem] flex items-center justify-center relative p-20"
      ref={containerRef} // Attach ref to the container
    >
      <div
        className="py-40 w-full relative"
        style={{
          perspective: '1000px', // Perspective for 3D effect
        }}
      >
        <Header
          translate={translate} // Pass the translation to the header
          titleComponent={titleComponent} // Pass the title component
        />
        <Card
          rotate={rotate} // Pass the rotation to the card
          translate={translate} // Pass the translation to the card
          scale={scale} // Pass the scale to the card
        />
      </div>
    </div>
  )
}

// Header component which accepts translate and titleComponent as props
export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate, // Apply vertical translation
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

// Card component which accepts rotate, scale, and translate as props
export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any
  scale: any
  translate: any
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // Apply rotation on the X-axis
        scale, // Apply scaling
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003', // Box shadow for depth effect
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="bg-gray-100 h-full w-full rounded-2xl gap-4 overflow-hidden p-4 transition-all ">
        <Image
          src="/temp-banner.png" // Source of the image
          fill // Fill the container
          alt="bannerImage" // Alt text for the image
          className="object-cover border-8 rounded-2xl" // Styling for the image
        />
      </div>
    </motion.div>
  )
}
