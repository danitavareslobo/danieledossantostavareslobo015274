import { useRef, useState } from 'react'
import { Button } from './Button'

interface FileUploadProps {
  label?: string
  accept?: string
  onFileSelect: (file: File) => void
  isLoading?: boolean
  currentImageUrl?: string
}

export function FileUpload({
  label = 'Escolher arquivo',
  accept = 'image/*',
  onFileSelect,
  isLoading = false,
  currentImageUrl,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onFileSelect(file)
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {preview && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-[#cccccc] dark:border-[#666666]">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {preview ? '📷 Alterar Foto' : '📷 ' + label}
      </Button>
    </div>
  )
}
