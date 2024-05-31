import { createFolder } from "./func/create/createForder.mjs";
import { createRuJsonFile } from "./func/create/createRuJsonFile.mjs";
import { deleteFolderRecursive } from "./func/deleteFolderRecursive.mjs";
import { ruJar } from "./func/jar/ruJar.mjs";
import { unJar } from "./func/jar/unJar.mjs";
import { readEnJson } from "./func/read/readEnJson.mjs";
import { translate } from "./func/translate.mjs";
import { pathJarEn, pathJarRu, pathJsonAll, pathRu } from "./properties/path.mjs";

// главный метод обработки кода 
export const main = async () => {
    createFolder()
        .then(() => unJar())
        .then(() => readEnJson())
        .then(() => translate())
        .then(() => createRuJsonFile())
        .then(() => ruJar())
        .then(() => deleteFolderRecursive(pathJsonAll)) // можно удалить - не будет после окончания работы удалять файлы в папке ./src/data/json/
        .then(() => deleteFolderRecursive(pathJarEn)) // можно удалить - не будет после окончания работы удалять файлы в папке ./src/jar/jar_en/
        .then(() => deleteFolderRecursive(pathRu)) // можно удалить - не будет после окончания работы удалять файлы в папке ./src/data/ru/
        .catch((error) => console.error(error));
};