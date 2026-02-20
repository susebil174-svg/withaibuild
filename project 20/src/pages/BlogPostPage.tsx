import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { POSTS } from '../data/posts';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4 leading-snug">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-base font-semibold text-white mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-blue-500/50 pl-4 py-1 my-5">
          <p className="text-sm text-blue-300/70 italic leading-relaxed">{line.replace('> ', '')}</p>
        </blockquote>
      );
    } else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4 ml-2">
          {listItems.map((item, idx) => {
            const parts = item.split('**');
            return (
              <li key={idx} className="flex items-start gap-2 text-sm text-white/60 leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                <span>
                  {parts.map((part, pIdx) =>
                    pIdx % 2 === 1 ? (
                      <strong key={pIdx} className="text-white font-medium">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    } else if (/^\d+\. /.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-4 ml-2 list-none">
          {listItems.map((item, idx) => {
            const parts = item.split('**');
            return (
              <li key={idx} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                <span className="text-blue-400 font-mono text-xs mt-0.5 flex-shrink-0">{idx + 1}.</span>
                <span>
                  {parts.map((part, pIdx) =>
                    pIdx % 2 === 1 ? (
                      <strong key={pIdx} className="text-white font-medium">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      );
      continue;
    } else if (line === '') {
      // skip blank
    } else {
      const parts = line.split('**');
      elements.push(
        <p key={i} className="text-sm text-white/55 leading-[1.9] mb-0">
          {parts.map((part, pIdx) =>
            pIdx % 2 === 1 ? (
              <strong key={pIdx} className="text-white/80 font-medium">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default function BlogPostPage() {
  const loading = usePageLoader();
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  if (loading) return <PageSkeleton />;
  if (!post) return <Navigate to="/blog" replace />;

  const related = POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-10"
        >
          <ArrowLeft size={13} />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">{post.category}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4 leading-snug tracking-tight">
            {post.title}
          </h1>
          <p className="text-sm text-white/45 leading-relaxed mb-6">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-white/6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center text-sm font-semibold text-blue-400">
                {post.author.avatar}
              </div>
              <div>
                <p className="text-xs font-medium text-white">{post.author.name}</p>
                <p className="text-xs text-white/30">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Calendar size={12} />
              {post.date}
            </div>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Clock size={12} />
              {post.readTime}
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mb-10 h-56 md:h-72">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article className="space-y-2">{renderContent(post.content)}</article>

        <div className="mt-10 pt-6 border-t border-white/6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 bg-white/5 border border-white/8 px-3 py-1 rounded-full"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-sm font-semibold text-white mb-5">More from {post.category}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group bg-[#0d0d0d] border border-white/6 rounded-2xl overflow-hidden hover:border-white/12 transition-all duration-300"
                >
                  <div className="h-32 overflow-hidden">
                    <img
                      src={r.coverImage}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-white/30 mt-1.5">{r.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
