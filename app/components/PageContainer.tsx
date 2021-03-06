export default function PageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-7xl bg-gray-1 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
