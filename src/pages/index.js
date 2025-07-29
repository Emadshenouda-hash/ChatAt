import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { getArticles } from '../services/api';

// ======= Header Component =======
function Header() {
  const { t, i18n } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const navLinks = i18n.language === 'ar'
    ? [
        { href: '/', label: 'الرئيسية', hasDropdown: false },
        { href: '/articles', label: 'مقالات', hasDropdown: true, dropdown: ['تقنية', 'ثقافة', 'مجتمع'] },
        { href: '/books', label: 'كتب', hasDropdown: false },
        { href: '/about', label: 'من نحن', hasDropdown: false }
      ]
    : [
        { href: '/', label: 'Home', hasDropdown: false },
        { href: '/articles', label: 'Articles', hasDropdown: true, dropdown: ['Tech', 'Culture', 'Community'] },
        { href: '/books', label: 'Books', hasDropdown: false },
        { href: '/about', label: 'Who We Are', hasDropdown: false }
      ];

  const buttonStyle = {
    color: "#fff",
    background: "transparent",
    fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
    fontWeight: 600,
    border: "none",
    padding: "0.5em 1.4em",
    borderRadius: 18,
    fontSize: "clamp(0.9rem, 0.8rem + 0.3vw, 1rem)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    outline: "none",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  };

  return (
    <header 
      lang={i18n.language} 
      style={{
        width: "100%",
        background: isScrolled 
          ? "rgba(255, 255, 255, 0.8)" 
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: isScrolled ? "blur(20px)" : "blur(5px)",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "blur(5px)",
        borderBottom: `1px solid ${isScrolled ? 'rgba(229, 231, 235, 0.8)' : '#e5e7eb'}`,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isScrolled ? "0 10px 15px -3px rgba(124, 45, 18, 0.1)" : "none"
      }}
    >
      <div className="hero-title-overlay-modern" style={{
        marginBottom: "0.7rem",
        padding: "0 2.5vw",
        marginTop: isScrolled ? "0.5rem" : "1cm",
        transition: "all 0.3s ease"
      }}>
        <h1 style={{
          fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif",
          color: "#7c2d12",
          fontSize: isScrolled ? "clamp(1.5rem, 1.2rem + 1vw, 2.5rem)" : "clamp(2.5rem, 2rem + 2vw, 4.5rem)",
          fontWeight: 900,
          margin: ".5rem 0",
          letterSpacing: i18n.language === 'ar' ? "0.02em" : "-0.025em",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          lineHeight: 1.1,
          textAlign: i18n.language === "ar" ? "right" : "left",
          transition: "all 0.3s ease"
        }}>
          {t('siteName')}
        </h1>
        
        {!isScrolled && (
          <div style={{
            fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
            color: "#666",
            fontWeight: 500,
            fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.6rem)",
            margin: "1.2rem 0 0.35rem 0",
            lineHeight: 1.5,
            direction: i18n.language === "ar" ? "rtl" : "ltr",
            textAlign: i18n.language === "ar" ? "right" : "left",
            opacity: 1,
            transition: "opacity 0.3s ease"
          }}>
            {t('tagline')}
          </div>
        )}
      </div>

      <div
        style={{
          width: "92%",
          background: "#c2410c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isScrolled ? ".3rem 1vw" : ".5rem 1vw",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 16,
          margin: `${isScrolled ? '0.3cm' : '1cm'} auto 20px auto`,
          boxShadow: "0 10px 15px -3px rgba(124, 45, 18, 0.1)",
          transition: "all 0.3s ease"
        }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <ul style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: .5,
          marginRight: i18n.language === "ar" ? "1.5rem" : 0,
          listStyle: "none",
          padding: 0
        }}>
          {navLinks.map((link, index) => (
            <li key={link.href} style={{ position: "relative" }}>
              {/* Use next/link for navigation */}
              <Link href={link.href} passHref legacyBehavior>
                <a
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#9a3412";
                    if (link.hasDropdown) setActiveMenu(index);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      style={{
                        transform: activeMenu === index ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease"
                      }}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </a>
              </Link>

              {link.hasDropdown && activeMenu === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: i18n.language === "ar" ? "auto" : 0,
                    right: i18n.language === "ar" ? 0 : "auto",
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #f0f0f0",
                    minWidth: "200px",
                    padding: "0.5rem 0",
                    marginTop: "0.5rem",
                    zIndex: 1001,
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  onMouseEnter={() => setActiveMenu(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {link.dropdown?.map((item, itemIndex) => (
                    <Link key={itemIndex} href={`${link.href}/${item.toLowerCase()}`} passHref legacyBehavior>
                      <a
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "#1c1917",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          transition: "all 0.15s ease",
                          direction: i18n.language === "ar" ? "rtl" : "ltr"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f5f5f4";
                          e.currentTarget.style.color = "#c2410c";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#1c1917";
                        }}
                      >
                        {item}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          <li>
            <button
              style={{ ...buttonStyle, position: "relative" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#9a3412"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              onClick={() => setShowSearch(show => !show)}
              type="button"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2"/>
                <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{marginLeft:6}}>{i18n.language === "ar" ? "بحث" : "Search"}</span>
              
              {showSearch && (
                <div style={{
                  position: "absolute",
                  top: "110%",
                  left: i18n.language === "ar" ? "auto" : 0,
                  right: i18n.language === "ar" ? 0 : "auto",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 18,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  padding: "13px 16px",
                  minWidth: 250,
                  zIndex: 1002,
                  display: "flex",
                  gap: "8px"
                }}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={i18n.language === "ar" ? "ابحث في المقالات..." : "Search articles..."}
                    style={{
                      fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                      borderRadius: 100,
                      border: "1.5px solid #d6d3d1",
                      padding: "8px 16px",
                      fontSize: "1.08rem",
                      outline: "none",
                      flex: 1,
                      direction: i18n.language === "ar" ? "rtl" : "ltr"
                    }}
                  />
                  <button
                    style={{
                      fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                      background: "linear-gradient(135deg, #d97706 0%, #c2410c 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "100px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "transform 0.2s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    onClick={() => alert("Search functionality coming soon!")}
                  >
                    {i18n.language === "ar" ? "ابحث" : "Go"}
                  </button>
                </div>
              )}
            </button>
          </li>
        </ul>

        <button
          onClick={() => i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")}
          style={{
            ...buttonStyle,
            background: "rgba(255,255,255,0.18)",
            borderRadius: 10,
            marginLeft: i18n.language === "ar" ? 0 : 18,
            marginRight: i18n.language === "ar" ? 18 : 0,
            fontWeight: 700
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#9a3412"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
          type="button"
        >
          {i18n.language === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </header>
  );
}

// ======= Dynamic Hero Section Component =======
function DynamicHeroSection({ i18n, t }) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Realistic social proof data
  const socialProof = i18n.language === 'ar' 
    ? [
        { number: "جديد", label: "إطلاق حديث" },
        { number: "2+", label: "مقال منشور" },
        { number: "متنامي", label: "مجتمع" }
      ]
    : [
        { number: "New", label: "Fresh Launch" },
        { number: "2+", label: "Articles" },
        { number: "Growing", label: "Community" }
      ];

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginTop: "200px",
      direction: i18n.language === "ar" ? "rtl" : "ltr"
    }}>
      
      {/* Video Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -2
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #fef7f0 0%, #fdeee0 50%, #f5f5f4 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite"
        }} />
      </div>

      {/* Floating Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(194, 65, 12, 0.1) 100%)",
          transform: `translateY(${scrollY * 0.1}px)`,
          animation: "float 6s ease-in-out infinite"
        }} />
        
        <div style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(194, 65, 12, 0.08) 100%)",
          transform: `translateY(${scrollY * 0.15}px)`,
          animation: "float 8s ease-in-out infinite reverse"
        }} />

        <div style={{
          position: "absolute",
          top: "40%",
          left: "80%",
          width: "0",
          height: "0",
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "52px solid rgba(217, 119, 6, 0.12)",
          transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.1}deg)`,
          animation: "rotate 10s linear infinite"
        }} />
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        padding: "0 2rem",
        textAlign: "center",
        zIndex: 1
      }}>
        
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
          <h1 style={{
            fontFamily: i18n.language === 'ar' ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif",
            fontSize: "clamp(3rem, 5vw, 6rem)",
            fontWeight: 900,
            color: "#7c2d12",
            margin: "0 0 1.5rem 0",
            lineHeight: 1.1,
            letterSpacing: i18n.language === 'ar' ? "0.02em" : "-0.02em"
          }}>
            {i18n.language === 'ar' ? 'اكتشف عالم' : 'Discover the World'}
            <br />
            <span style={{
              background: "linear-gradient(135deg, #d97706 0%, #c2410c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {i18n.language === 'ar' ? 'القصص' : 'of Stories'}
            </span>
          </h1>
        </div>

        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s"
        }}>
          <p style={{
            fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
            fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
            color: "#57534e",
            margin: "0 0 3rem 0",
            lineHeight: 1.6,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            {i18n.language === 'ar' 
              ? 'منصة تجمع بين الثقافات والتجارب الإنسانية من جميع أنحاء العالم في مكان واحد'
              : 'A platform that brings together cultures and human experiences from around the world in one place'
            }
          </p>
        </div>

        {/* Fixed CTA Buttons */}
        <div style={{
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "0 0 4rem 0",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s"
        }}>
          {/* Primary CTA - Scroll to Articles */}
          <button 
            onClick={() => {
              document.getElementById('articles-section')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            style={{
              fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
              background: "linear-gradient(135deg, #d97706 0%, #c2410c 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 15px rgba(217, 119, 6, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(217, 119, 6, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(217, 119, 6, 0.3)";
            }}
          >
            {i18n.language === 'ar' ? 'ابدأ القراءة' : 'Start Reading'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Secondary CTA - About Page */}
          <Link href="/about" passHref legacyBehavior>
            <button 
              style={{
                fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                background: "transparent",
                color: "#7c2d12",
                border: "2px solid #7c2d12",
                borderRadius: "50px",
                padding: "1rem 2.5rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#7c2d12";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#7c2d12";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {i18n.language === 'ar' ? 'من نحن' : 'About Us'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
              </svg>
            </button>
          </Link>
        </div>

        {/* Updated Social Proof */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s"
        }}>
          {socialProof.map((item, index) => (
            <div key={index} style={{
              textAlign: "center",
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(217, 119, 6, 0.1)",
              minWidth: "120px",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{
                fontSize: "2rem",
                fontWeight: 900,
                color: "#d97706",
                marginBottom: "0.5rem",
                fontFamily: i18n.language === "ar" ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif"
              }}>
                {item.number}
              </div>
              <div style={{
                fontSize: "0.9rem",
                color: "#57534e",
                fontWeight: 500,
                fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif"
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======= Home Page Component with Dynamic Articles =======
export default function Home() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles from Strapi
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedArticles = await getArticles(i18n.language);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setError(error.message);
        // Fallback to empty array
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [i18n.language]); // Refetch when language changes

  return (
    <>
      <Header />
      
      {/* Dynamic Hero Section */}
      <DynamicHeroSection i18n={i18n} t={t} />

      {/* Dynamic Articles Section */}
      <div 
        id="articles-section"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
        }}
      >
        {loading ? (
          // Loading state
          <div style={{
            textAlign: "center",
            padding: "4rem 0",
            fontSize: "1.2rem",
            color: "#78716c"
          }}>
            <div style={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #d97706",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "1rem"
            }}/>
            <div>{i18n.language === 'ar' ? 'جاري تحميل المقالات...' : 'Loading articles...'}</div>
          </div>
        ) : error ? (
          // Error state
          <div style={{
            textAlign: "center",
            padding: "4rem 0",
            fontSize: "1.2rem",
            color: "#ef4444"
          }}>
            {i18n.language === 'ar' ? 'خطأ في تحميل المقالات' : 'Error loading articles'}
            <div style={{ fontSize: "0.9rem", marginTop: "0.5rem", color: "#78716c" }}>
              {i18n.language === 'ar' ? 'تأكد من تشغيل Strapi' : 'Make sure Strapi is running'}
            </div>
          </div>
        ) : articles.length === 0 ? (
          // No articles state
          <div style={{
            textAlign: "center",
            padding: "4rem 0",
            fontSize: "1.2rem",
            color: "#78716c"
          }}>
            {i18n.language === 'ar' ? 'لا توجد مقالات متاحة بعد' : 'No articles available yet'}
            <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {i18n.language === 'ar' ? 'أضف مقالات في Strapi لعرضها هنا' : 'Add articles in Strapi to see them here'}
            </div>
          </div>
        ) : (
          // Articles grid
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "clamp(1.5rem, 4vw, 3rem)",
          }}>
            {articles.map((article) => (
              <article 
                key={article.id}
                lang={i18n.language}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                  padding: "0",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{
                    fontFamily: i18n.language === "ar" ? "'Tajawal', Arial, sans-serif" : "'Merriweather', Georgia, serif",
                    color: "#7c2d12",
                    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
                    fontWeight: 700,
                    margin: "0 0 0.75rem 0",
                    lineHeight: 1.3,
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                    textAlign: i18n.language === "ar" ? "right" : "left"
                  }}>
                    {article.title}
                  </h3>
                  
                  <div style={{
                    fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                    color: "#78716c",
                    fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)",
                    fontWeight: 500,
                    margin: "0 0 1rem 0",
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                    textAlign: i18n.language === "ar" ? "right" : "left"
                  }}>
                    {article.date} • {article.author}
                  </div>
                  
                  <div style={{
                    fontFamily: i18n.language === "ar" ? "'Cairo', Arial, sans-serif" : "'Inter', -apple-system, sans-serif",
                    color: "#57534e",
                    fontSize: "clamp(1rem, 0.9rem + 0.3vw, 1.125rem)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                    textAlign: i18n.language === "ar" ? "right" : "left"
                  }}>
                    {article.summary}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

