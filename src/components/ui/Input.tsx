import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  mask?: 'phone' | 'cpf'
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, mask, fullWidth = false, className = '', ...props }, ref) => {
    const baseClasses = 'px-4 py-3 rounded-lg border bg-[#ffffff] dark:bg-[#1a1a1a] text-[#333333] dark:text-[#ffffff] transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

    const borderClasses = error
      ? 'border-red-500 dark:border-red-500 focus:ring-2 focus:ring-red-500'
      : 'border-[#cccccc] dark:border-[#666666] focus:ring-2 focus:ring-[#ff69b4] dark:focus:ring-[#ff1493]'

    const widthClass = fullWidth ? 'w-full' : ''

    const combinedClasses = `${baseClasses} ${borderClasses} ${widthClass} ${className}`

    const masks = {
      phone: '(99) 99999-9999',
      cpf: '999.999.999-99',
    }

    const inputElement = mask ? (
      <InputMask
        mask={masks[mask]}
        className={combinedClasses}
        {...props}
      >
        {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
          <input ref={ref} {...inputProps} />
        )}
      </InputMask>
    ) : (
      <input ref={ref} className={combinedClasses} {...props} />
    )

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-semibold mb-2 text-[#333333] dark:text-[#ffffff] transition-colors duration-300">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {inputElement}
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
