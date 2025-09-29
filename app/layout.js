import { Press_Start_2P, Poppins } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-title",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Bytes of Fortune",
  description: "Retro arcade coding challenge: spin, solve, score.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${poppins.variable} antialiased bg-grid`}> 
        {children}
      </body>
    </html>
  );
}
