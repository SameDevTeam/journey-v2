import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface ApiResponse<T> {
  data: T
  errorCode: number
  errorMessage: string
  hasError: boolean
}

// Directory is now a string from the API
export type Directory = string

interface File {
  id: number
  name: string
  path: string
  fileType: string
  mimeType: string
  length: number
  url: string
  createdOn: string
  modifiedOn: string
  thumbnailUrl?: string
}

type FileType = 'Document' | 'Photo' | 'Video'

// Hook to get directories
export function useDirectories(path: string = '/') {
  return useQuery({
    queryKey: ['directories', path],
    queryFn: async () => {
      const { data } = await api.post<ApiResponse<string[]>>('/admin/file/list-directories', {
        path
      })
      return data.data
    },
  })
}

// Hook to get files by type
export function useFiles(fileType: FileType, path: string = '/') {
  return useQuery({
    queryKey: ['files', fileType, path],
    queryFn: async () => {
      const { data } = await api.post<ApiResponse<File[]>>('/admin/file/list-files', {
        fileType,
        path,
      })
      return data.data
    },
  })
} 