import fs from "fs"
import { pathRu } from "../../properties/path.mjs"
import { readJarEnFolder } from "../read/readJarEnFolder.mjs"
import path from "path"

export const createFolder = () => {
    return new Promise(async (resolve, reject) => {
    const jarNames = await readJarEnFolder()
    // перебираем обьект полученный из readJarEnFolder
        for (const key in jarNames) {
            const modName = jarNames[key].modName 
            const isForder = path.join(pathRu, modName);

            // проверяем есть ли уже такая папка, если нету то создаем
            if (!fs.existsSync(isForder)) {
                fs.mkdir(pathRu + modName, (err) => {
                if (err) {
                    reject(err);
                    return;
                };
                    resolve(console.log("Папка создана " + modName))
                })
            }
        }
        resolve();
    })
}