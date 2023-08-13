export interface IUser {
  id: number
  name: string
  email: string
  phone_number: string
  image_url?: string
  role: string
}

export interface IUploadStatus {
  is_uploaded: boolean
}

export interface IAvailability {
  is_available: boolean
}
