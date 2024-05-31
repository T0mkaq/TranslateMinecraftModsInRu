import fs from "fs"
import { pathJsonAll, pathRu } from "../../properties/path.mjs"
import { readJarEnFolder } from "./readJarEnFolder.mjs"

export const readEnJson = () => {
    return new Promise(async (resolve, reject) => {
        const jarNames = await readJarEnFolder()
        const newJsonData = [];

        const currentDate = new Date();
        const currentDateTime = currentDate.toISOString().slice(0, 10);
        const fileAllJson = pathJsonAll + currentDateTime + ".json";

        for (const key in jarNames) {
            const modName = jarNames[key].modName
            const folderRuEnJson = pathRu + modName + "/assets/" + modName + "/lang/en_us.json"

            fs.readFile(folderRuEnJson, (err, data) => {
                const jsonData = JSON.parse(data)
                // создаем json файл со всеми англ словами модов
                newJsonData.push({ [modName]: jsonData });
                fs.writeFileSync(fileAllJson, JSON.stringify(newJsonData, null, 2))
                resolve()
            })
        }
    })
    
}