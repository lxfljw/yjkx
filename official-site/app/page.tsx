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

export const metadata = {
  title: '有迹可循 - 家庭物品收纳管理',
  description: '有迹可循 — 用空间拍照与物品标记，记住每件东西放在哪里，支持拿走放回与轨迹查看。',
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pain />
        <Features />
        <Demo />
        <Flow />
        <Value />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
