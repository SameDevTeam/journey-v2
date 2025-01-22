import { ReactNode } from 'react'

interface PageLayoutProps {
  title?: string
  children: ReactNode
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      {title && (
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </header>
      )}
      <main>{children}</main>
    </div>
  )
} 