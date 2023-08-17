import { ipcRenderer } from 'electron'
import { FETCH_DIRECTORY, FETCH_DATA_FROM_STORAGE, FILE_FOLDER_EXISTS, CREATE_FOLDER, SET_DATA_TO_STORAGE } from '../../utils/constants.json'


export default {
    readDir: (path: string) => ipcRenderer.sendSync(FETCH_DIRECTORY, path),
    readFile: (path: string) => {
        path = `${path}.json`
        const response = ipcRenderer.sendSync(FETCH_DATA_FROM_STORAGE, path)
        if (response.error) {
            throw response
        }
    },
    exists: (path: string) => ipcRenderer.sendSync(FILE_FOLDER_EXISTS, path),

    saveFile: (path: string, fileName: string, data: any) => ipcRenderer.invoke(SET_DATA_TO_STORAGE, `${path}/${fileName}`, data),
    createFolder: (path: string) => ipcRenderer.sendSync(CREATE_FOLDER, path)
}
