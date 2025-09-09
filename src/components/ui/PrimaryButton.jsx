// components/ui/PrimaryButton.jsx

export default function PrimaryButton({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block px-6 py-3 text-lg font-semibold rounded-xl shadow-md text-white 
                 bg-gradient-to-r from-accent to-[#393939] hover:from-[#393939] hover:to-accent
                 focus:ring-2 focus:ring-accent focus:outline-none duration-500 transition"
    >
      {children}
    </a>
  );
}
