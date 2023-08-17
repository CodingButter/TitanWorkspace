import fs from "fs"
export const createPathIfNotExist = (path: string) => {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
    return true

  } catch (error: any) {
    return false
  }
}
