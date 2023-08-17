import { app, BrowserWindow, ipcMain } from "electron"
import {
  FETCH_DATA_FROM_STORAGE,
  FETCH_DIRECTORY,
  SET_DATA_TO_STORAGE,
  FILE_FOLDER_EXISTS,
  CREATE_FOLDER,
} from "../utils/constants.json"
import path from "node:path"
import fs from "node:fs"
import { createPathIfNotExist } from "./helpers"


app.commandLine.appendSwitch("ignore-certificate-errors", "true")
process.env.DIST = path.join(__dirname, "../dist")
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public")
const workingDir = path.join(__dirname, "storage")

ipcMain.on(CREATE_FOLDER, (event, _path) => {
  const response = createPathIfNotExist(path.join(workingDir, _path))
  event.returnValue = response
})

ipcMain.on(FILE_FOLDER_EXISTS, (event, _path) => {
  event.returnValue = fs.existsSync(path.join(workingDir, _path))
})

ipcMain.on(FETCH_DIRECTORY, (event, _path) => {
  try {
    event.returnValue = fs.readdirSync(path.join(workingDir, _path))
  } catch (error) {
    event.returnValue = error
  }
})

ipcMain.on(FETCH_DATA_FROM_STORAGE, (event, _path) => {
  try {
    event.returnValue = fs.readFileSync(path.join(workingDir, _path))

  } catch (error: any) {
    event.returnValue = {
      error: error?.message,
      code: error?.code,
    }
  }
})

ipcMain.handle(SET_DATA_TO_STORAGE, async (_, _path: string, data: any) => {
  try {
    fs.writeFileSync(path.join(workingDir, _path), data)
    return true

  } catch (error: any) {
    return false
  }
})

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"))
  }
}

app.on("window-all-closed", () => {
  win = null
})

app.whenReady().then(createWindow)
