import Header from './components/header'
import Hero from './components/hero'
import SocialProof from './components/social-proof'
import ToolGrid from './components/tool-grid'
import Workflow from './components/workflow'
import LiveDashboard from './components/live-dashboard'
import Pricing from './components/pricing'
import BuildInPublic from './components/build-in-public'
import FAQ from './components/faq'
import FinalCTA from './components/final-cta'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <ToolGrid />
        <Workflow />
        <LiveDashboard />
        <Pricing />
        <BuildInPublic />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
