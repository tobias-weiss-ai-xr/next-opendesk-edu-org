// This layout is required by Next.js but does NOT render anything visible
// The actual UI layout is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
