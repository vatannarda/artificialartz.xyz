/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { MouseGlow } from './components/mouse-glow'
import { Home } from './pages/home'
import { ShowcasePage } from './pages/showcase'
import { ContactPage } from './pages/contact'
import { BlogPage } from './pages/blog'

export default function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E0E0E0] font-sans selection:bg-[#D30000]/30 selection:text-white">
      <MouseGlow />
      <Header />
      <main className="min-h-screen bg-[#000000]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
