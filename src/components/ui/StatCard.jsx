import { Card } from '@/components/ui/Card'

const VALUE_TONE = { default: 'text-ink', income: 'text-primary', expense: 'text-terracotta' }
const ICON_TONE = { default: 'text-primary', income: 'text-primary', expense: 'text-terracotta' }

export function StatCard({
  label,
  value,
  caption,
  footer,
  icon: Icon,
  tone = 'default',
  featured = false,
  className = '',
}) {
  return (
    <Card
      className={`flex min-h-[158px] flex-col ${
        featured ? 'border-primary bg-primary text-white' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={`text-sm ${featured ? 'text-white/90' : 'text-slate'}`}>{label}</p>
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className={featured ? 'text-lime' : ICON_TONE[tone]}
          />
        )}
      </div>

      <p
        className={`mt-3 text-[32px] font-medium leading-tight tracking-tight ${
          featured ? 'text-white' : VALUE_TONE[tone]
        }`}
      >
        {value}
      </p>

      {caption && (
        <p className={`mt-3 text-[13px] ${featured ? 'text-lime' : 'text-slate'}`}>{caption}</p>
      )}
      {footer && <p className="mt-auto pt-3 text-[13px] text-white">{footer}</p>}
    </Card>
  )
}
