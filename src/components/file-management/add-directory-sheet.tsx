import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Folder, FolderPlus } from 'lucide-react'

interface AddDirectorySheetProps {
  currentPath: string
}

export function AddDirectorySheet({ currentPath }: AddDirectorySheetProps) {
  const [directoryName, setDirectoryName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleCreateDirectory = () => {
    // This will be implemented later
    console.log('Creating directory:', directoryName, 'in path:', currentPath)
    // Reset form and close sheet
    setDirectoryName('')
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FolderPlus className="h-4 w-4" />
          Yeni Dizin
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Yeni Dizin Oluştur</SheetTitle>
          <SheetDescription>
            {currentPath === '/' 
              ? 'Ana dizin içinde yeni bir dizin oluşturun.' 
              : `"${currentPath.substring(1)}" dizini içinde yeni bir dizin oluşturun.`}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="directory-name">Dizin Adı</Label>
            <Input
              id="directory-name"
              placeholder="Dizin adını girin"
              value={directoryName}
              onChange={(e) => setDirectoryName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2 rounded-md border p-4">
            <Folder className="h-10 w-10 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Dizin Yolu</span>
              <span className="text-xs text-muted-foreground">{currentPath}</span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button 
            onClick={handleCreateDirectory} 
            disabled={!directoryName.trim()}
          >
            Dizin Oluştur
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 