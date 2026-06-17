export const metadata = {
  title: "AI Resume Analyzer",
  description:
    "Analyze resumes, ATS scores, skill gaps and career readiness."
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
