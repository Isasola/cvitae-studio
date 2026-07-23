import { useParams, Link, Navigate } from 'react-router-dom'
import { useAdminPosts } from '../hooks/useAdminData.js'
import Seo from '../components/Seo.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const { posts } = useAdminPosts()
  const post = posts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const paragraphs = post.content.split('\n\n')

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Seo title={`${post.title} | CVitae Studio`} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 font-body text-sm font-bold tracking-wide mb-10 border-[3px] border-black px-4 py-2 bg-cream hover:bg-black hover:text-cream transition-colors duration-100"
      >
        ← BLOG
      </Link>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="font-body text-xs font-bold px-2 py-0.5 border-[2px] border-black tracking-wide uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-wide mb-4">
        {post.title.toUpperCase()}
      </h1>

      <div className="flex items-center gap-4 mb-10 pb-6 border-b-[3px] border-black">
        <span className="font-body text-sm opacity-60">{post.date}</span>
        <span className="font-body text-sm font-bold">{post.readTime} MIN READ</span>
      </div>

      <div className="font-body text-base leading-relaxed space-y-5">
        {paragraphs.map((block, i) => {
          if (block.startsWith('## ')) {
            return (
              <h2 key={i} className="font-display text-3xl tracking-wide mt-10 mb-2">
                {block.replace('## ', '').toUpperCase()}
              </h2>
            )
          }
          if (block.startsWith('```')) {
            const code = block.replace(/^```\w*\n/, '').replace(/```$/, '')
            return (
              <pre
                key={i}
                className="bg-black text-gold font-mono text-sm p-5 overflow-x-auto border-[3px] border-black shadow-brutal"
              >
                <code>{code}</code>
              </pre>
            )
          }
          if (block.startsWith('- ')) {
            const items = block.split('\n').filter(l => l.startsWith('- '))
            return (
              <ul key={i} className="space-y-2 pl-4">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-gold font-bold mt-0.5">—</span>
                    <span>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                  </li>
                ))}
              </ul>
            )
          }
          return (
            <p key={i}
              dangerouslySetInnerHTML={{
                __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
          )
        })}
      </div>

      <div className="mt-16 p-8 border-[3px] border-black bg-black text-cream shadow-brutal-gold">
        <p className="font-display text-3xl tracking-wide mb-3">READY TO BUILD?</p>
        <p className="font-body text-sm opacity-80 mb-5">We ship components, wrappers, and loaders that work out of the box.</p>
        <a
          href="https://wa.me/595992954169"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream hover:border-cream transition-colors duration-100"
        >
          TALK TO US ON WHATSAPP
        </a>
      </div>
    </div>
  )
}
