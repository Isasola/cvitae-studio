import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import Components from './pages/Components.jsx'
import Wrappers from './pages/Wrappers.jsx'
import License from './pages/License.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Admin from './pages/Admin.jsx'
import FilestackDemo from './pages/demos/FilestackDemo.jsx'
import ParticleDemo from './pages/demos/ParticleDemo.jsx'
import EmptyStateGenerator from './pages/generators/EmptyStateGenerator.jsx'
import GrowthLineDemo from './pages/demos/GrowthLineDemo.jsx'
import NeoBrutalismDemo from './pages/demos/NeoBrutalismDemo.jsx'
import OpsConsoleDemo from './pages/demos/OpsConsoleDemo.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Routes>
        {/* Full-screen pages — no shared header/footer */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/demo/filestack"    element={<FilestackDemo />} />
        <Route path="/demo/particle"     element={<ParticleDemo />} />
        <Route path="/demo/growth-line"   element={<GrowthLineDemo />} />
        <Route path="/demo/neo-brutalism" element={<NeoBrutalismDemo />} />
        <Route path="/demo/ops-console"   element={<OpsConsoleDemo />} />

        {/* Public site */}
        <Route path="*" element={
          <>
            <Header />
            <main className="flex-1 pt-[72px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/components" element={<Components />} />
                <Route path="/wrappers" element={<Wrappers />} />
                <Route path="/license" element={<License />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/generators/empty-state" element={<EmptyStateGenerator />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </>
        } />
      </Routes>
    </div>
  )
}
