import AdmZip from 'adm-zip';
import {  pathJarRu, pathRu } from "../../properties/path.mjs"
import { readJarEnFolder } from '../read/readJarEnFolder.mjs';

export const ruJar = () => {
    // метод запаковки jar в папку 
    return new Promise(async (resolve, reject) => {
        const zip = new AdmZip();
        const jarNames = await readJarEnFolder();

        for (const key in jarNames) {
            const jarName = jarNames[key].jarName;
            const modName = jarNames[key].modName;

            zip.addLocalFolder(pathRu + modName);
            zip.writeZip(pathJarRu + "ru_" + jarName);
            console.log("Создан ru_Jar: " + jarName)
        }   
        resolve()
    });
};
