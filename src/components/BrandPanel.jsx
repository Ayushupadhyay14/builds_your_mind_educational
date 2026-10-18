// Neutral brand panel used where a stock photo used to be hot-linked.
// Decorative only: it carries no claims. Swap for a real photo when one exists.
const BrandPanel = ({ icon: Icon, className = "" }) => (
  <div
    aria-hidden="true"
    className={`relative w-full aspect-[4/3] rounded-2xl shadow-xl gradient-brand flex items-center justify-center overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 brand-pattern"></div>
    <Icon className="relative text-white/90 text-7xl" />
  </div>
);

export default BrandPanel;
