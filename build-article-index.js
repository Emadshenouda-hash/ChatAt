// build-article-index.js

const fs = require('fs');
const path = require('path');

// All language folders to scan
const languages = ['ar', 'en'];

languages.forEach(lang => {
  const dir = path.join(__dirname, 'src', 'data', 'articles', lang);
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json') && f !== 'index.json');

  // Collect info for listing
  const summaries = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const data = JSON.parse(raw);
    // Only summary fields, not full 'content'
    return {
      slug: data.slug,
      title: data.title,
      image: data.image,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author
    };
  });

  // Write (overwrite) index.json
  fs.writeFileSync(
    path.join(dir, 'index.json'),
    JSON.stringify(summaries, null, 2),
    'utf8'
  );
  console.log(`Updated ${lang}/index.json with ${summaries.length} entries.`);
});

console.log('Done!');
