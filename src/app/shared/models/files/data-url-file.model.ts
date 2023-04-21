export interface DataUrlFile extends Pick<File, "name" | "lastModified" | "size" | "type"> {
  dataUrl: string
}