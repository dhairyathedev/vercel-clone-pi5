import fs from 'fs';
import path from 'path';

export const getFiles = (dir: string) => {
    let results: string[] = [];

    const content = fs.readdirSync(dir);
    content.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath));
        } else {
            results.push(filePath);
        }
    });

    return results; 
};
