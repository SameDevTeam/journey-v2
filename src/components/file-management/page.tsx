import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { useDirectories, useFiles } from '@/hooks/file-management'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Folder, FileText, Image, Video, Search, ArrowUpRight, Download, Trash2, ChevronRight, Home } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AddDirectorySheet } from './add-directory-sheet'
import { UploadFileSheet } from './upload-file-sheet'

type FileType = 'Document' | 'Photo' | 'Video'

export default function FileManagementPage() {
  const [activeTab, setActiveTab] = useState<FileType>('Photo')
  
  const location = useLocation()
  const navigate = useNavigate()

  // Extract path from URL
  const getPathFromUrl = () => {
    // Remove the '/file-management' prefix and get the rest of the path
    const pathSegment = location.pathname.replace(/^\/file-management\/?/, '')
    return pathSegment ? `/${pathSegment}` : '/'
  }

  const currentPath = getPathFromUrl()
  
  // Get files for each type to display counts
  const { data: directories, isLoading: isLoadingDirectories, refetch: refetchDirectories } = useDirectories(currentPath)
  const { data: photoFiles, isLoading: isLoadingPhotoFiles, refetch: refetchPhotoFiles } = useFiles('Photo', currentPath)
  const { data: documentFiles, isLoading: isLoadingDocumentFiles, refetch: refetchDocumentFiles } = useFiles('Document', currentPath)
  const { data: videoFiles, isLoading: isLoadingVideoFiles, refetch: refetchVideoFiles } = useFiles('Video', currentPath)
  
  // Get the files for the active tab
  const files = useMemo(() => {
    switch (activeTab) {
      case 'Photo':
        return photoFiles
      case 'Document':
        return documentFiles
      case 'Video':
        return videoFiles
      default:
        return []
    }
  }, [activeTab, photoFiles, documentFiles, videoFiles])
  
  const isLoadingFiles = useMemo(() => {
    switch (activeTab) {
      case 'Photo':
        return isLoadingPhotoFiles
      case 'Document':
        return isLoadingDocumentFiles
      case 'Video':
        return isLoadingVideoFiles
      default:
        return false
    }
  }, [activeTab, isLoadingPhotoFiles, isLoadingDocumentFiles, isLoadingVideoFiles])

  // Handle directory navigation
  const navigateToDirectory = (directoryName: string) => {
    // Generate the new path
    const newPathSegment = currentPath === '/' 
      ? directoryName 
      : `${currentPath.substring(1)}/${directoryName}`
    
    // Navigate to the new URL
    navigate(`/file-management/${newPathSegment}`)
  }

  // Navigate to specific path segment
  const navigateToPath = (pathIndex: number) => {
    if (pathIndex === -1) {
      // Navigate to root
      navigate('/file-management')
      return
    }

    // Split the path and take segments up to the specified index
    const pathSegments = currentPath.split('/').filter(Boolean)
    const newPath = pathSegments.slice(0, pathIndex + 1).join('/')
    navigate(`/file-management/${newPath}`)
  }

  // Refresh all data
  const refreshData = () => {
    refetchDirectories()
    refetchPhotoFiles()
    refetchDocumentFiles()
    refetchVideoFiles()
  }

  // Generate breadcrumb items from current path
  const breadcrumbItems = currentPath.split('/').filter(Boolean)

  // Helper to render count badge
  const renderCountBadge = (count: number | undefined, isLoading: boolean) => {
    if (isLoading) return <span className="ml-1.5 text-xs opacity-70">...</span>
    if (count === undefined) return null
    return <span className="ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted px-1.5 text-xs font-medium">{count}</span>
  }

  return (
    <PageLayout title="Dosya Yönetimi">
      <div className="space-y-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => navigateToPath(-1)}
          >
            <Home className="h-4 w-4" />
          </Button>
          
          {breadcrumbItems.length > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          
          {breadcrumbItems.map((segment, index) => (
            <div key={index} className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2"
                onClick={() => navigateToPath(index)}
              >
                {segment}
              </Button>
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Dizinler</h2>
            <p className="text-sm text-muted-foreground">
              Dosyalarınızı saklamak için dizinlere gözatın veya yeni bir dizin oluşturun.
              <span className="ml-2 text-xs font-medium text-muted-foreground/70">
                Mevcut konum: {currentPath}
              </span>
            </p>
          </div>
          <AddDirectorySheet currentPath={currentPath} />
        </div>

        {/* Scrollable container for directories with themed scrollbar */}
        <div className="relative max-h-[280px] overflow-y-auto pb-4 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted hover:scrollbar-thumb-muted-foreground/50">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {isLoadingDirectories ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            ) : directories && directories.length > 0 ? (
              directories.map((directory) => (
                <Card 
                  key={directory} 
                  className="overflow-hidden hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={() => navigateToDirectory(directory)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="rounded-md bg-primary/10 p-2">
                        <Folder className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium leading-none truncate max-w-full">
                          {directory}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Henüz hiç dizin bulunmuyor.</p>
                <AddDirectorySheet currentPath={currentPath} />
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Dosyalar</h2>
              <p className="text-sm text-muted-foreground">
                Tüm dosyalarınızı görüntüleyin, düzenleyin veya silin.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Ara
              </Button>
              <UploadFileSheet 
                currentPath={currentPath} 
                onUploadComplete={refreshData}
              />
            </div>
          </div>

          <Tabs defaultValue="Photo" className="w-full" onValueChange={(value: string) => setActiveTab(value as FileType)}>
            <div className="mb-2 overflow-x-auto">
              <TabsList className="min-w-max w-full max-w-none">
                <TabsTrigger value="Photo" className="flex-1 min-w-[120px]">
                  <div className="flex items-center">
                    <Image className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Fotoğraflar</span>
                    {renderCountBadge(photoFiles?.length, isLoadingPhotoFiles)}
                  </div>
                </TabsTrigger>
                <TabsTrigger value="Document" className="flex-1 min-w-[120px]">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Dokümanlar</span>
                    {renderCountBadge(documentFiles?.length, isLoadingDocumentFiles)}
                  </div>
                </TabsTrigger>
                <TabsTrigger value="Video" className="flex-1 min-w-[120px]">
                  <div className="flex items-center">
                    <Video className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Videolar</span>
                    {renderCountBadge(videoFiles?.length, isLoadingVideoFiles)}
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            {(['Photo', 'Document', 'Video'] as const).map((type) => (
              <TabsContent key={type} value={type} className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{type === 'Photo' ? 'Fotoğraflar' : type === 'Document' ? 'Dokümanlar' : 'Videolar'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dosya Adı</TableHead>
                          <TableHead>Boyut</TableHead>
                          <TableHead>Tarih</TableHead>
                          <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoadingFiles ? (
                          Array(5).fill(0).map((_, i) => (
                            <TableRow key={i}>
                              <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                              <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                            </TableRow>
                          ))
                        ) : files && files.length > 0 ? (
                          files.map((file) => (
                            <TableRow key={file.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  {activeTab === 'Photo' ? (
                                    <div className="h-10 w-10 overflow-hidden rounded mr-3">
                                      <img 
                                        src={file.thumbnailUrl || file.url} 
                                        alt={file.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ) : activeTab === 'Document' ? (
                                    <FileText className="h-5 w-5 mr-3 text-blue-500" />
                                  ) : (
                                    <Video className="h-5 w-5 mr-3 text-purple-500" />
                                  )}
                                  <span className="font-medium">{file.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatFileSize(file.length)}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {new Date(file.createdOn).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => window.open(file.url, '_blank')}
                                  >
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              <span className="text-muted-foreground">Henüz hiç dosya bulunmuyor.</span>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
} 