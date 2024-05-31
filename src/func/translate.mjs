import fs from "fs"
import { readFolder } from "./read/readFolder.mjs";
import { pathJsonAll } from "../properties/path.mjs";
import axios from "axios";
import { googleTranslateURL } from "../properties/googleTranslateUrl.mjs";
import { prefix } from "../properties/prefix.mjs";

export const translate = () => {
    return new Promise(async (resolve, reject) => {
        const jsonAll = await readFolder(pathJsonAll)
        
        const currentDate = new Date();
        const currentDateTime = currentDate.toISOString().slice(0, 10);
        const jsonData = [];
        const translatedData = [];

        jsonAll.map(async(file) => {
            if(file.split(".")[0] === currentDateTime){
                const jsonDataPush = JSON.parse(fs.readFileSync(pathJsonAll + file))
                jsonData.push(jsonDataPush)
            }
        })

        for (const key in jsonData[0]) {
            for (const name in jsonData[0][key]) {
                const translatedNamespace = {};
                const data = jsonData[0][key][name]

                for (const key in data) {
                    const resTranslate = await axios?.get(googleTranslateURL("en", "ru", encodeURI(data[key]))) || " "
                    const translatedData = resTranslate?.data[0]?.[0]?.[0] || " ";

                    console.log(translatedData)

                    translatedNamespace[key] = translatedData;
                }
                jsonAll.map(async(file) => {
                    if(file.split(".")[0] === currentDateTime){
                        translatedData.push({ [name]: translatedNamespace });
                        fs.writeFileSync(pathJsonAll + prefix + file, JSON.stringify(translatedData, null, 2));
                        
                    }
                })
            
            }
        }
        resolve();
    })
}