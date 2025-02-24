export default function Loading() {
  return (
    <div className="min-h-screen bg-rose-pine-base flex items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-4 border-rose-pine-dawn-foam/20 dark:border-rose-pine-foam/20 rounded-full animate-pulse" />
          <div className="absolute inset-0 border-t-4 border-rose-pine-dawn-foam dark:border-rose-pine-foam rounded-full animate-spin" />
        </div>
        <p className="text-lg text-rose-pine-subtle animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
