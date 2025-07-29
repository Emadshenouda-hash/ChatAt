import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getArticles } from '../../services/api';

export default function ArticlesPage() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      console.log('🚀 Articles page: Starting to fetch articles for language:', i18n.language);
      setLoading(true);
      setError(null);
      
      try {
        console.log('📡 Articles page: Calling getArticles API...');
        const fetchedArticles = await getArticles(i18n.language);
        console.log('📦 Articles page: Received articles:', fetchedArticles);
        console.log('📏 Articles page: Number of articles:', fetchedArticles.length);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('💥 Articles page: Failed to fetch articles:', error);
        console.error('🔍 Error details:', {
          message: error.message,
          code: error.code,
          response: error.response,
          request: error.request
        });
        
        // More detailed error handling
        let errorMessage = 'Unknown error occurred';
        
        if (error.code === 'ECONNREFUSED') {
          errorMessage = 'Cannot connect to Strapi server. Make sure it\'s running on localhost:1337';
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
          errorMessage = 'Network error: No response from server';
        } else {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
        setArticles([]);
      } finally {
        setLoading(false);
        console.log('✅ Articles page: Loading completed');
      }
    };

    fetchArticles();
  }, [i18n.language]);

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '200px',
      padding: '200px 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#7c2d12',
          marginBottom: '2rem',
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          textAlign: i18n.language === 'ar' ? 'right' : 'left'
        }}>
          {i18n.language === 'ar' ? 'جميع المقالات' : 'All Articles'}
        </h1>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            fontSize: '1.2rem',
            color: '#78716c'
          }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #d97706',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}/>
            <div>{i18n.language === 'ar' ? 'جاري تحميل المقالات...' : 'Loading articles...'}</div>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            fontSize: '1.2rem',
            color: '#ef4444'
          }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
              {i18n.language === 'ar' ? 'خطأ في تحميل المقالات' : 'Error Loading Articles'}
            </h2>
            
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '1rem', 
              color: '#57534e',
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '8px',
              fontFamily: 'monospace'
            }}>
              {error}
            </div>
            
            <div style={{ fontSize: '0.9rem', color: '#78716c' }}>
              {i18n.language === 'ar' ? 'تحقق من الكونسول لمزيد من التفاصيل' : 'Check console for more details'}
            </div>
            
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#d97706',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {i18n.language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            fontSize: '1.2rem',
            color: '#78716c'
          }}>
            {i18n.language === 'ar' ? 'لا توجد مقالات متاحة' : 'No articles available'}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {articles.map((article) => (
              <article 
                key={article.id}
                lang={i18n.language}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                  padding: '0',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif",
                    color: '#7c2d12',
                    fontSize: 'clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)',
                    fontWeight: 700,
                    margin: '0 0 0.75rem 0',
                    lineHeight: 1.3,
                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                    textAlign: i18n.language === 'ar' ? 'right' : 'left'
                  }}>
                    {article.title}
                  </h3>
                  
                  <div style={{
                    fontFamily: i18n.language === 'ar' ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                    color: '#78716c',
                    fontSize: 'clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)',
                    fontWeight: 500,
                    margin: '0 0 1rem 0',
                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                    textAlign: i18n.language === 'ar' ? 'right' : 'left'
                  }}>
                    {article.date} • {article.author}
                  </div>
                  
                  <div style={{
                    fontFamily: i18n.language === 'ar' ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                    color: '#57534e',
                    fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                    textAlign: i18n.language === 'ar' ? 'right' : 'left'
                  }}>
                    {article.summary}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
