import fs from "fs"
import { pathJarEn } from "../../properties/path.mjs"

export const readJarEnFolder = () => {
    const jarsNames = [];

    return new Promise(async (resolve, reject) => {
        // читаем какие файлы есть в папке по пути ./src/jar/jar_en/
        fs.readdir(pathJarEn, (err, jars) => {
            // вывод ошибки если будет
            if (!jars.length || err) {
                reject("readJarEnFolder: " + err)
                return;
            }
            // записываем в массив имя мода без лишней информации и обычное имя мода
            for (const key in jars) {
                jarsNames.push({
                    modName: jars[key].split("-")[0],
                    jarName: jars[key]
                })
            }
            resolve(jarsNames)
        })
    })
}