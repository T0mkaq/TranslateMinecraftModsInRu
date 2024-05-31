import fs from "fs"
import fsex from "fs-extra"
import path from 'path';
import { readFolder } from "./read/readFolder.mjs";

export const deleteFolderRecursive = async(folderPath) =>{
    return new Promise(async (resolve, reject) => {
        if (fs.existsSync(folderPath)) {
            const folder = await readFolder(folderPath)
            folder.map((file)=>{
                const curPath = path.join(folderPath, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    fsex.removeSync(curPath);
                    console.log("-Папка: " + file)
                } else {
                    fs.unlinkSync(curPath);
                    console.log("-Файл: " + file)
                }
            })
        }
        resolve()
    })
}