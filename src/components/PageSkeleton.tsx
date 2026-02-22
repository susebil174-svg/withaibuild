export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6 animate-pulse">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14 space-y-4">
          <div className="h-3 w-16 rounded-full bg-white/6" />
          <div className="h-8 w-72 rounded-xl bg-white/7" />
          <div className="h-4 w-96 rounded-lg bg-white/5" />
        </div>

        <div className="space-y-4 mb-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/4 border border-white/5 rounded-2xl p-5 space-y-3">
              <div className="h-4 w-40 rounded-lg bg-white/6" />
              <div className="h-3 w-full rounded bg-white/4" />
              <div className="h-3 w-4/5 rounded bg-white/4" />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/4 border border-white/5 rounded-2xl p-5 space-y-2.5">
              <div className="h-4 w-32 rounded-lg bg-white/6" />
              <div className="h-3 w-full rounded bg-white/4" />
              <div className="h-3 w-3/4 rounded bg-white/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
