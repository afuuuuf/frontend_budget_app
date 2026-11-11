export function Card({ as: Tag = 'section', className = '', children, ...props }) {
  return (
    <Tag className={`rounded-2xl border border-mist bg-surface p-6 ${className}`} {...props}>
      {children}
    </Tag>
  )
}
