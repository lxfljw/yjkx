'use client'

import { useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Pain from './components/Pain'
import Features from './components/Features'
import Demo from './components/Demo'
import Flow from './components/Flow'
import Value from './components/Value'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'
import { useInViewOnce } from './components/useInViewOnce'

function MotionSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInViewOnce(ref)
  return (
    <div
      ref={ref}
      className={`motion-section${inView ? ' in-view' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MotionSection><Pain /></MotionSection>
        <MotionSection delay={60}><Value /></MotionSection>
        <MotionSection delay={120}><Features /></MotionSection>
        <MotionSection><Flow /></MotionSection>
        <MotionSection><Demo /></MotionSection>
        <MotionSection><Faq /></MotionSection>
        <MotionSection><Cta /></MotionSection>
      </main>
      <Footer />
    </>
  )
}
