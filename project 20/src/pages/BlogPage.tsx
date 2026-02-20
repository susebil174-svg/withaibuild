import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Search } from 'lucide-react';
import { POSTS } from '../data/posts';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

const CATEGORIES = ['All', 'Announcement', 'Tutorial', 'Case Study', 'Engineering', 'Opinion'];

export default function BlogPage() {
  const loading = usePageLoader();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  if (loading) return <PageSkeleton />;

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ideas, updates, and insights
          </h1>
          <p className="text-white/40 text-sm max-w-md">
            Product updates, tutorials, and thoughts on the future of building software.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-white/40 hover:text-white/70 border border-white/8 hover:border-white/16'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 text-sm">No posts found.</div>
        )}

        {featured && (
          <Link to={`/blog/${featured.slug}`} className="group block mb-8">
            <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300 md:grid md:grid-cols-5">
              <div className="md:col-span-3 h-56 md:h-auto overflow-hidden">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="md:col-span-2 p-7 flex flex-col justify-center">
                <span className="text-xs font-medium text-blue-400 mb-3 uppercase tracking-wide">
                  {featured.category}
                </span>
                <h2 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-white/40 leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400">
                      {featured.author.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{featured.author.name}</p>
                      <div className="flex items-center gap-1 text-white/30 text-xs">
                        <Clock size={10} />
                        {featured.readTime}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-[#0d0d0d] border border-white/6 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-blue-400 uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white mt-2 mb-2 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400">
                        {post.author.avatar}
                      </div>
                      <span className="text-xs text-white/40">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/25 text-xs">
                      <Clock size={10} />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
