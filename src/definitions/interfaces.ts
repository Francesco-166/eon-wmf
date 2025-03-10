export interface htmlModule {
  classes?: string
  image?: htmlImage
  html?: string
}

export interface htmlImage {
  filename: string
  path: string
  extension: string
  link?: string
  classes?: string
  height?: string
  imgSource?: string
}
