export default function Footer() {
  const socialLinks = [
    {
      href: 'https://facebook.com/yourpage',
      label: 'Facebook',
      svg: (
        <svg width="27" height="27" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#1877F3"/>
        <path d="M30.913 24H26.75V38H21.75V24H19V19.5H21.75V17.125C21.75 14.5 23.056 12 27.108 12H31V16.5H28.4C28.027 16.5 27.75 16.805 27.75 17.25V19.5H31L30.913 24Z" fill="white"/>
        </svg>
      ),
    },
    {
      href: 'https://twitter.com/yourpage',
      label: 'Twitter (X)',
      svg: (
        <svg width="27" height="27" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#181818"/>
          <path d="M30.4756 15.5938H32.7473L27.7616 21.4801L33.6279 29.5H28.7179L25.0497 24.6419L21.0003 29.5H18.7271L24.0559 23.2166L18.3717 15.5938H23.3896L26.7923 20.032L30.4756 15.5938ZM29.6606 28.1597H31.0191L22.3739 16.8127H21.0134L29.6606 28.1597Z" fill="white"/>
        </svg>
      ),
    },
    {
      href: 'https://instagram.com/yourpage',
      label: 'Instagram',
      svg: (
        <svg width="27" height="27" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="url(#instaGrad)"/>
          <defs>
            <linearGradient id="instaGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F58529"/>
              <stop offset="0.5" stopColor="#DD2A7B"/>
              <stop offset="1" stopColor="#515BD4"/>
            </linearGradient>
          </defs>
          <rect x="14" y="14" width="20" height="20" rx="6" stroke="white" strokeWidth="2"/>
          <circle cx="24" cy="24" r="4.5" stroke="white" strokeWidth="2"/>
          <circle cx="30.2" cy="17.8" r="1.4" fill="white"/>
        </svg>
      ),
    },
    {
      href: 'https://youtube.com/yourpage',
      label: 'YouTube',
      svg: (
        <svg width="27" height="27" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#FF0000"/>
          <polygon points="20,32 20,16 33,24" fill="white"/>
        </svg>
      ),
    }
  ];

  return (
    <footer style={{
      background: '#e8f4fa', padding: '1.6rem 0', textAlign: 'center', marginTop: '2rem',
      borderTop: '1px solid #c6e2ee'
    }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem', display: 'flex', justifyContent: 'center', gap: '1.2rem' }}>
        {socialLinks.map(link => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
            style={{ color: '#1175AD', textDecoration: 'none', display: 'inline-block', verticalAlign: 'middle' }}
            aria-label={link.label}
          >
            {link.svg}
          </a>
        ))}
      </div>
      <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>
        © {new Date().getFullYear()} ChatAt
      </p>
    </footer>
  );
}
