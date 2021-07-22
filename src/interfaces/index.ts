export interface Photo {
  id: string
  created_at: string
  updated_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  downloads: number
  likes: number
  liked_by_user: boolean
  description: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  exif: any
  location: any
  tags: [any]
  user: any
}
