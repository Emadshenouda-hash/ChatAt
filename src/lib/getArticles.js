import fs from 'fs';
import path from 'path';

export function getArticles(language) {
  const dir = path.join(process.cwd(), `src/data/articles/${language}`);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files.map(filename => {
    const fullPath = path.join(dir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  });
}
