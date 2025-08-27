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
  title: "Ashraf Portfolio",
  description: "Ashraf Portfolio",
  keywords: "Ashraf Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-white flex">
        {/* Sidebar */}
        <SideMenu/>
        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
        <ScrollToTop/>
      </body>
    </html>
  );
}
