import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Breadcrumbs() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  // Remove leading/trailing slashes, split path
  const segments = router.asPath.replace(/^\/|\/$/g, '').split('/');

  // Don't show on homepage
  if (
    router.pathname === '/' ||
    segments.length === 0 ||
    (segments.length === 1 && !segments[0])
  )
    return null;

  let currentPath = '';

  // Adjust spacing for Arabic (now noticeably larger)
  const isArabic = i18n.language === 'ar';
  const separatorMargin = isArabic ? '0 0.80em 0 0.70em' : '0 0.18em 0 0.19em';
  const linkMarginL = isArabic ? '0.75em' : '0.20em';
  const linkMarginR = isArabic ? '0.68em' : '0.18em';
  const overallPadding = isArabic ? '0 2.3rem 0 0.5rem' : '0 0.5rem 0 2.3rem';

  return (
    <nav
      aria-label="breadcrumbs"
      style={{
        direction: isArabic ? 'rtl' : 'ltr',
        textAlign: isArabic ? 'right' : 'left',
        fontFamily: isArabic
          ? "'Cairo', Arial, sans-serif"
          : "'Inter', -apple-system, sans-serif",
        margin: '1.5rem 0',
        fontSize: '1.18rem', // slightly larger!
        color: '#78716c',
        padding: overallPadding,
        display: 'flex',
        flexDirection: isArabic ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {/* Home Link */}
      <Link href="/" passHref legacyBehavior>
        <a
          style={{
            color: '#d97706',
            textDecoration: 'none',
            fontWeight: 500,
            marginLeft: isArabic ? linkMarginL : 0,
            marginRight: isArabic ? 0 : linkMarginR,
          }}
        >
          {t('home') || (isArabic ? 'الرئيسية' : 'Home')}
        </a>
      </Link>
      {segments.map((seg, idx) => {
        currentPath += '/' + seg;
        const isLast = idx === segments.length - 1;

        // Localize/capitalize
        let label = seg;
        if (isArabic) {
          if (seg === 'articles') label = t('articles') || 'مقالات';
          if (seg === 'books') label = t('books') || 'كتب';
          if (seg === 'about') label = t('about') || 'من نحن';
        } else {
          label = seg.charAt(0).toUpperCase() + seg.slice(1);
        }

        return (
          <span
            key={seg}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isArabic ? '0.24em' : '0.08em', // More space between items in Arabic
            }}
          >
            {/* Separator */}
            <span
              style={{
                color: '#bababa',
                fontSize: '1em',
                margin: separatorMargin,
                userSelect: 'none',
                fontWeight: 400,
              }}
            >
              {isArabic ? '›' : '/'}
            </span>
            {isLast ? (
              <span
                style={{
                  color: '#57534e',
                  fontWeight: 700,
                  minWidth: 0,
                }}
              >
                {label}
              </span>
            ) : (
              <Link href={currentPath} passHref legacyBehavior>
                <a
                  style={{
                    color: '#d97706',
                    textDecoration: 'none',
                    fontWeight: 500,
                    minWidth: 0,
                    marginLeft: isArabic ? linkMarginL : 0,
                    marginRight: isArabic ? 2 : linkMarginR,
                  }}
                >
                  {label}
                </a>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
