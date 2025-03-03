import { useState, useRef, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Upload, X, File, Check, AlertCircle } from 'lucide-react'
import { api } from '@/lib/axios'
import { toast } from 'sonner'

interface UploadFileSheetProps {
  currentPath: string
  onUploadComplete?: () => void
}

interface FileWithPreview extends File {
  preview?: string
  uploading?: boolean
  uploaded?: boolean
  error?: boolean
}

export function UploadFileSheet({ currentPath, onUploadComplete }: UploadFileSheetProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      addFiles(Array.from(e.target.files))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const updatedFiles = [...files]

    newFiles.forEach(file => {
      // Check if file already exists in the list
      if (!updatedFiles.some(f => f.name === file.name)) {
        const fileWithPreview = file as FileWithPreview
        
        // Create preview for image files
        if (file.type.startsWith('image/')) {
          fileWithPreview.preview = URL.createObjectURL(file)
        }
        
        updatedFiles.push(fileWithPreview)
      }
    })

    setFiles(updatedFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    
    // Revoke object URL to prevent memory leaks
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview!)
    }
    
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const uploadFile = async (file: FileWithPreview, index: number) => {
    const newFiles = [...files]
    newFiles[index] = { ...file, uploading: true, uploaded: false, error: false }
    setFiles(newFiles)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', currentPath)

      await api.post('/admin/file/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Mark file as uploaded
      const updatedFiles = [...files]
      updatedFiles[index] = { ...file, uploading: false, uploaded: true }
      setFiles(updatedFiles)

      toast.success(`${file.name} başarıyla yüklendi`)
    } catch (error) {
      // Mark file as error
      const updatedFiles = [...files]
      updatedFiles[index] = { ...file, uploading: false, error: true }
      setFiles(updatedFiles)

      toast.error(`${file.name} yüklenirken hata oluştu`)
      console.error('Error uploading file:', error)
    }
  }

  const uploadAllFiles = async () => {
    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      if (!files[i].uploaded && !files[i].uploading) {
        await uploadFile(files[i], i)
      }
    }

    // Call the callback after all files are uploaded
    if (onUploadComplete) {
      onUploadComplete()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files?.length) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const allUploaded = files.length > 0 && files.every(file => file.uploaded)

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Dosya Yükle
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg">
        <SheetHeader>
          <SheetTitle>Dosya Yükle</SheetTitle>
          <SheetDescription>
            {currentPath === '/' 
              ? 'Ana dizine dosya yükleyin.' 
              : `"${currentPath.substring(1)}" dizinine dosya yükleyin.`}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div 
            className={`
              flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6
              ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
              transition-colors cursor-pointer
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload 
              className={`mb-2 h-10 w-10 ${isDragging ? 'text-primary' : 'text-muted-foreground/50'}`}
            />
            <h3 className="font-medium">Dosyaları buraya sürükleyin</h3>
            <p className="text-sm text-muted-foreground">veya dosya seçmek için tıklayın</p>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <Label>Yüklenecek Dosyalar ({files.length})</Label>
              <div className="max-h-[200px] space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
                {files.map((file, index) => (
                  <div 
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {file.preview ? (
                        <div className="h-10 w-10 overflow-hidden rounded border">
                          <img 
                            src={file.preview} 
                            alt={file.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <File className="h-10 w-10 text-blue-500" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium truncate max-w-[150px]">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {file.type || 'Bilinmeyen Tür'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.uploading && <AlertCircle className="h-4 w-4 text-amber-500 animate-pulse" />}
                      {file.uploaded && <Check className="h-4 w-4 text-green-500" />}
                      {file.error && <AlertCircle className="h-4 w-4 text-destructive" />}
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={(e) => { 
                          e.stopPropagation()
                          removeFile(index)
                        }}
                        disabled={file.uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 rounded-md border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Yükleme Yolu</span>
              <span className="text-xs text-muted-foreground">{currentPath}</span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button
            onClick={uploadAllFiles}
            disabled={files.length === 0 || allUploaded}
          >
            Dosyaları Yükle
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 