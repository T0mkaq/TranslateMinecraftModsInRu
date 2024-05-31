import AdmZip from 'adm-zip';
import { pathJarEn, pathRu } from "../../properties/path.mjs"
import { readFolder } from "../read/readFolder.mjs"
import { readJarEnFolder } from '../read/readJarEnFolder.mjs';

export const unJar = () => {
    return new Promise(async (resolve, reject) => {
        const jarNames = await readJarEnFolder();

        for (const key in jarNames) {
            const jarName = jarNames[key].jarName;
            const modName = jarNames[key].modName;

            const isFile = await readFolder(pathRu + modName);
            if (!isFile.length) {
                const path = new AdmZip(pathJarEn + jarName);
                path.extractAllTo(pathRu + modName, true);
                console.log("Распакован Jar файл в папку " + modName);
            }
        }
        resolve();
    });
};
