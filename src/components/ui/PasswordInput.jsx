import { forwardRef, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Input } from '@/components/ui/Input'

export const PasswordInput = forwardRef(function PasswordInput({ id, ...props }, ref) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      ref={ref}
      id={id}
      type={visible ? 'text' : 'password'}
      adornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="rounded p-1 text-slate hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {visible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      }
      {...props}
    />
  )
})
