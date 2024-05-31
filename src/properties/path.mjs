import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Начало файла
const currentURL = import.meta.url;
const currentPath = fileURLToPath(currentURL);

// ./src/jar*
const pathJarEn = join(dirname(currentPath), "../" + "/jar/jar_en/");
const pathJarRu = join(dirname(currentPath), "../" + "/jar/jar_ru/");

// ./src/data*
const pathJsonAll = join(dirname(currentPath), "../" + "/data/json/");
const pathRu = join(dirname(currentPath), "../" + "/data/ru/");

export { pathJarEn, pathJarRu, pathJsonAll, pathRu }