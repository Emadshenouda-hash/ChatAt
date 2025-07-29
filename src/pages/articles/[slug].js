import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useEffect, useState } from 'react';

export default function ArticleDetail() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;

  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!slug) return;
    import(`../../data/articles/${i18n.language}/${slug}.json`)
      .then(res => setArticle(res.default || res))
      .catch(() => setArticle(null));
  }, [slug, i18n.language]);

  if (!article) return null;

  return (
    <main>
      <Breadcrumbs />
      <h1 style={{color:'var(--primary)', textAlign:'center'}}>{article.title}</h1>
      <div style={{ textAlign: 'center' }}>
        <img src={article.image} alt={article.title} style={{ maxWidth: 450, borderRadius: 16, margin: '1.5rem auto' }}/>
      </div>
      <div className="meta" style={{ textAlign: "center", margin: "0.6em 0", color: '#666' }}>
        {article.author} • {article.date}
      </div>
      <div style={{
        maxWidth: 800,
        margin: "1.5em auto",
        lineHeight: 1.9,
        fontSize: '1.15rem',
        color: "#333"
      }}>
        {article.content}
      </div>
    </main>
  );
}
