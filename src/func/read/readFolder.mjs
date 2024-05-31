import fs from "fs"

export const readFolder = (path) => {
    const dataNames = [];
    // читаем содержимое папки
    return new Promise(async (resolve, reject) => {
        fs.readdir(path, (err, res) => {
            if (err) {
                reject("readFolder: " + err)
                return;
            }
            for (const key in res) {
                dataNames.push(res[key])
            }

            resolve(dataNames)
        })
    })
}