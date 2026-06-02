import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Ticker } from '@/components/layout/Ticker'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { TechnicalStack } from '@/components/sections/TechnicalStack'
import { ProjectIndex } from '@/components/sections/ProjectIndex'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <TechnicalStack />
        <ProjectIndex />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
