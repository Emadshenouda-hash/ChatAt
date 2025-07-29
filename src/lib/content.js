import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentByCategory(category, language = 'en') {
  const categoryPath = path.join(contentDirectory, category, language);
  
  // Check if directory exists
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(categoryPath);
  const allContent = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(categoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      language,
      ...matterResult.data,
    };
  });

  // Sort by date
  return allContent.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getContentData(category, language, slug) {
  const fullPath = path.join(contentDirectory, category, language, `${slug}.md`);
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    language,
    contentHtml,
    ...matterResult.data,
  };
}
