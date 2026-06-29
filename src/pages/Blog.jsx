import { Link } from 'react-router-dom'
import { useAdminPosts } from '../hooks/useAdminData.js'

export default function Blog() {
  const { posts } = useAdminPosts()
  const sorted = [...posts]
    .filter(p => p.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-12">
        <h1 className="font-display text-5xl tracking-widest">BLOG</h1>
        <div className="flex-1 h-[3px] bg-black" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {sorted.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block border-[3px] border-black -mt-[3px] -ml-[3px] first:mt-0 first:ml-0 bg-cream hover:bg-black hover:text-cream transition-colors duration-100 group"
          >
            <article className="p-6 flex flex-col h-full min-h-[260px]">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-body text-xs font-bold px-2 py-0.5 border-[2px] border-current tracking-wide uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="font-display text-2xl leading-tight tracking-wide mb-3 group-hover:text-gold transition-colors duration-100">
                {post.title.toUpperCase()}
              </h2>

              <p className="font-body text-sm leading-relaxed flex-1 opacity-80">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t-[2px] border-current">
                <span className="font-body text-xs opacity-60">{post.date}</span>
                <span className="font-body text-xs font-bold tracking-wide">{post.readTime} MIN READ →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
