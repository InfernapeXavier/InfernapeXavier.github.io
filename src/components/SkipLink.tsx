export default function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-4 left-4 -translate-y-full focus:translate-y-0 z-50 
                 bg-rose-pine-dawn-pine dark:bg-rose-pine-pine text-white
                 px-4 py-2 rounded-lg shadow-lg transition-transform duration-200
                 focus:outline-none focus:ring-2 focus:ring-rose-pine-foam
                 hover:bg-rose-pine-dawn-foam dark:hover:bg-rose-pine-foam"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
