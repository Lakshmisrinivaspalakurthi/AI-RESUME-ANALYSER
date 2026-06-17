// @ts-ignore
import "./globals.css";

export const metadata = {
  title: "AI Resume Analyzer",
  description: "ATS Resume Analysis Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
