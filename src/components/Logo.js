export default function Logo() {
  // You can use an <img src="/img/logo.svg" /> instead for a real logo
  return (
    <div className="site-logo" style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '2rem', letterSpacing: '.03em' }}>
      {/* Example: site icon + name – replace as needed */}
      <span role="img" aria-label="logo">🌐</span>
    </div>
  );
}
