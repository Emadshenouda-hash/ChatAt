import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getAboutUs } from '../services/api';

// Helper to flatten potential Strapi rich text/content arrays
const renderRichText = (content) => {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((item) =>
      typeof item === 'string'
        ? item
        : item?.children
        ? renderRichText(item.children)
        : ''
    ).join(' ');
  }
  if (content?.children) return renderRichText(content.children);
  return String(content || '');
};

export default function AboutPage() {
  const { i18n } = useTranslation();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      setLoading(true);
      setError(null);
      try {
        if (typeof getAboutUs !== 'function') throw new Error('getAboutUs is not a function - check your import');

        // 🌐 Debug log to show the current language!
        console.log("🌐 Current language is:", i18n.language);

        const data = await getAboutUs(i18n.language);
        setAboutData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutUs();
  }, [i18n.language]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '200px'
      }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #d97706',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}/>
        <div style={{ marginLeft: '1rem', color: '#78716c' }}>
          {i18n.language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </div>
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '200px',
        color: '#ef4444',
        textAlign: 'center'
      }}>
        <div>
          <h2>{i18n.language === 'ar' ? 'خطأ في تحميل الصفحة' : 'Error loading page'}</h2>
          <p style={{ color: '#78716c', marginTop: '1rem' }}>{error || (i18n.language === 'ar' ? 'لا توجد بيانات' : 'No data available')}</p>
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
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '250px',
      paddingBottom: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Title */}
        <h1 style={{
          fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif",
          fontSize: 'clamp(2.5rem, 4vw, 4rem)',
          fontWeight: 900,
          color: '#7c2d12',
          marginBottom: '2rem',
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          textAlign: i18n.language === 'ar' ? 'right' : 'left'
        }}>
          {aboutData.title}
        </h1>

        {/* Hero Image */}
        {aboutData.hero_image && (
          <div style={{
            width: '100%',
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '3rem'
          }}>
            <img
              src={aboutData.hero_image}
              alt={aboutData.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Main Content */}
        <div style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          lineHeight: 1.8,
          color: '#57534e',
          marginBottom: '3rem',
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          textAlign: i18n.language === 'ar' ? 'right' : 'left',
          fontFamily: i18n.language === 'ar' ? "'Cairo', Arial, sans-serif" : "'Inter', sans-serif"
        }}>
          {renderRichText(aboutData.content)}
        </div>

        {/* Mission & Vision */}
        {(aboutData.mission || aboutData.vision) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Mission */}
            {aboutData.mission && (
              <div style={{
                background: '#fef7f0',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(217, 119, 6, 0.1)'
              }}>
                <h3 style={{
                  color: '#d97706',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                  textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif"
                }}>
                  {i18n.language === 'ar' ? 'مهمتنا' : 'Our Mission'}
                </h3>
                <p style={{
                  color: '#57534e',
                  lineHeight: 1.6,
                  direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                  textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  fontFamily: i18n.language === 'ar' ? "'Cairo', Arial, sans-serif" : "'Inter', sans-serif"
                }}>
                  {renderRichText(aboutData.mission)}
                </p>
              </div>
            )}
            {/* Vision */}
            {aboutData.vision && (
              <div style={{
                background: '#f0f9ff',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(14, 165, 233, 0.1)'
              }}>
                <h3 style={{
                  color: '#0ea5e9',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                  textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif"
                }}>
                  {i18n.language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
                </h3>
                <p style={{
                  color: '#57534e',
                  lineHeight: 1.6,
                  direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
                  textAlign: i18n.language === 'ar' ? 'right' : 'left',
                  fontFamily: i18n.language === 'ar' ? "'Cairo', Arial, sans-serif" : "'Inter', sans-serif"
                }}>
                  {renderRichText(aboutData.vision)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Team Section */}
        {aboutData.team_description && (
          <div style={{
            background: '#ffffff',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{
              color: '#7c2d12',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
              textAlign: i18n.language === 'ar' ? 'right' : 'left',
              fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif"
            }}>
              {i18n.language === 'ar' ? 'فريقنا' : 'Our Team'}
            </h3>
            <p style={{
              color: '#57534e',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
              textAlign: i18n.language === 'ar' ? 'right' : 'left',
              fontFamily: i18n.language === 'ar' ? "'Cairo', Arial, sans-serif" : "'Inter', sans-serif"
            }}>
              {renderRichText(aboutData.team_description)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
