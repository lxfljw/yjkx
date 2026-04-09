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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pain />
        <Value />
        <Features />
        <Flow />
        <Demo />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
