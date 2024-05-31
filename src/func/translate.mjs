import fs from "fs"
import { readFolder } from "./read/readFolder.mjs";
import { pathJsonAll } from "../properties/path.mjs";
import axios from "axios";
import { googleTranslateURL } from "../properties/googleTranslateUrl.mjs";
import { prefix } from "../properties/prefix.mjs";

export const translate = () => {
    return new Promise(async (resolve, reject) => {
        // получаем весь созданный json файл
        const jsonAll = await readFolder(pathJsonAll)
        
        const currentDate = new Date();
        const currentDateTime = currentDate.toISOString().slice(0, 10);
        const jsonData = [];
        const translatedData = [];

        jsonAll.map(async(file) => {
            // сравниваем его название со свежей датой для продолжения 
            if(file.split(".")[0] === currentDateTime){
                const jsonDataPush = JSON.parse(fs.readFileSync(pathJsonAll + file))
                // записываем для меньшей вложенности
                jsonData.push(jsonDataPush)
            }
        })

        for (const key in jsonData[0]) {
            for (const name in jsonData[0][key]) {
                const translatedNamespace = {};
                const data = jsonData[0][key][name]

                for (const key in data) {
                    // переводим слова
                    const resTranslate = await axios?.get(googleTranslateURL("en", "ru", encodeURI(data[key]))) || " "
                    const translatedData = resTranslate?.data[0]?.[0]?.[0] || " ";

                    console.log(translatedData)
                    // и сразу же их записываем в обьект
                    translatedNamespace[key] = translatedData;
                }
                jsonAll.map(async(file) => {
                    if(file.split(".")[0] === currentDateTime){
                        // после заполнения обьекта одного мода он создает файл с переводом в ./src/data/json/ru_*
                        translatedData.push({ [name]: translatedNamespace });
                        fs.writeFileSync(pathJsonAll + prefix + file, JSON.stringify(translatedData, null, 2));
                        
                    }
                })
            
            }
        }
        resolve();
    })
}