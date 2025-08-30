// import { Cairo, Tajawal } from 'next/font/google'
import "./globals.css";
import SideMenu from "./components/SideMenu";
import ScrollToTop from "./components/scroll";

// const cairo = Cairo({
//   subsets: ["arabic", "latin"],
//   weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
//   variable: "--font-cairo",
// })

// const tajawal = Tajawal({
//   subsets: ["arabic", "latin"],
//   weight: ["200", "300", "400", "500", "700", "800", "900"],
//   display: "swap",
//   variable: "--font-tajawal",
// })

export const metadata = {
  title: "Ashraf Elgezery | Frontend Developer",
  description:
    "Frontend Developer specializing in React, Next.js, and building modern, responsive web applications.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript",
    "Web Development",
    "Responsive Design",
    "Portfolio",
  ],
  openGraph: {
    title: "Ashraf Elgezery | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and building modern, responsive web applications.",
    url: "https://your-portfolio-link.com",
    siteName: "Ashraf Elgezery Portfolio",
    images: [
      {
        url: "/profile/profile-2.jpg",
        width: 1200,
        height: 630,
        alt: "Ashraf Elgezery profile photo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraf Elgezery | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and building modern, responsive web applications.",
    images: ["/profile/profile-2.jpg"],
  },
};

<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ashraf Elgezery",
    jobTitle: "Frontend Developer",
    url: "https://your-portfolio-link.com",
    sameAs: [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername"
    ]
  })}
</script>

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-white flex">
        {/* Sidebar */}
        <SideMenu />
        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
