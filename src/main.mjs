import { createFolder } from "./func/create/createForder.mjs";
import { createRuJsonFile } from "./func/create/createRuJsonFile.mjs";
import { deleteFolderRecursive } from "./func/deleteFolderRecursive.mjs";
import { ruJar } from "./func/jar/ruJar.mjs";
import { unJar } from "./func/jar/unJar.mjs";
import { readEnJson } from "./func/read/readEnJson.mjs";
import { translate } from "./func/translate.mjs";
import { pathJarEn, pathJarRu, pathJsonAll, pathRu } from "./properties/path.mjs";

export const main = async () => {
    createFolder()
        .then(() => unJar())
        .then(() => readEnJson())
        .then(() => translate())
        .then(() => createRuJsonFile())
        .then(() => ruJar())
        .then(() => deleteFolderRecursive(pathJsonAll))
        .then(() => deleteFolderRecursive(pathJarEn))
        .then(() => deleteFolderRecursive(pathRu))
        .catch((error) => console.error(error));
};