export default function SkeletonPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
}