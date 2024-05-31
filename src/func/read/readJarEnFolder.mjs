import fs from "fs"
import { pathJarEn } from "../../properties/path.mjs"

export const readJarEnFolder = () => {
    const jarsNames = [];

    return new Promise(async (resolve, reject) => {
        fs.readdir(pathJarEn, (err, jars) => {
            if (!jars.length || err) {
                reject("readJarEnFolder: " + err)
                return;
            }
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