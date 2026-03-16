/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Home } from './pages/home'
import { ShowcasePage } from './pages/showcase'
import { ContactPage } from './pages/contact'
import { BlogPage } from './pages/blog'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#E0E0E0] font-sans">
      <Header />
      <main className="min-h-screen bg-black">
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
