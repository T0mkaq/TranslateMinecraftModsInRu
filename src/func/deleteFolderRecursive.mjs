import fs from "fs"
import fsex from "fs-extra"
import path from 'path';
import { readFolder } from "./read/readFolder.mjs";

export const deleteFolderRecursive = async(folderPath) =>{
    // функция удаления по пути folderPath, чтобы не скапливался мусор
    return new Promise(async (resolve, reject) => {
        if (fs.existsSync(folderPath)) {
            // получаем и пребираем содержимое папок
            const folder = await readFolder(folderPath)
            folder.map((file)=>{
                const curPath = path.join(folderPath, file);
                // если открывается то это папка и удаляем, а если нет то это файл
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