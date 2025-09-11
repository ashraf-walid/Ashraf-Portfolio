import "./globals.css";
import SideMenu from "../components/SideMenu";
import ScrollToTop from "../components/scroll";
import ClientWrapper from "@/components/ClientWrapper";
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
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "Ashraf Elgezery | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and building modern, responsive web applications.",
    url: "https://ashraf-portfolio-seven.vercel.app/",
    metadataBase: new URL("https://ashraf-portfolio-seven.vercel.app/"),
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
        
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ashraf Elgezery",
              jobTitle: "Frontend Developer",
              url: "https://ashraf-portfolio-seven.vercel.app/",
              sameAs: [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername",
              ],
            }),
          }}
        />
      </head>

      <body className="bg-background text-white flex overflow-x-hidden">
        <ClientWrapper>
          {/* Sidebar */}
          <SideMenu />
          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
          <ScrollToTop />
        </ClientWrapper>
      </body>
    </html>
  );
}
