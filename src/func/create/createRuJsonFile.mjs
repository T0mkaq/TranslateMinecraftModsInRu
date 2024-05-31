import fs from "fs"
import { readFolder } from "../read/readFolder.mjs"
import { prefix } from "../../properties/prefix.mjs"
import { pathJsonAll, pathRu } from "../../properties/path.mjs"

export const createRuJsonFile = () => {
    return new Promise(async (resolve, reject) => {
        const jsonAll = await readFolder(pathJsonAll)
        
        const currentDate = new Date();
        const currentDateTime = currentDate.toISOString().slice(0, 10);

        jsonAll.map(async(file) => {
                if(prefix + file.split(".")[0] === prefix + currentDateTime) {
                    const ruFile = prefix + file
                    const translatedJson = await fs.readFileSync(pathJsonAll + ruFile)

                    // после окончания перевода создает файл в нужном месте с переводом мода
                    const jsonData = JSON.parse(translatedJson)
                    for (const key in jsonData) {
                        for (const name in jsonData[key]) {
                            const pathRuJsonFile = pathRu + name + "/assets/" + name + "/lang/ru_ru.json"
                            fs.writeFileSync(pathRuJsonFile, JSON.stringify(jsonData[key][name], null, 2))
                            console.log("Создан ru: " + name)
                        }
                    }
                }
        })
        resolve()
    })
}