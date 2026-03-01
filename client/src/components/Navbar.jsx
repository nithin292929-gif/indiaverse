import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tours', label: 'Tours' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      padding: '0 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      height: '72px',
      background: 'rgba(6,8,15,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem'
        }}>🇮🇳</div>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.4rem', fontWeight: 700,
          color: 'white', letterSpacing: '-0.02em'
        }}>
          India<span style={{ color: '#f47c3a' }}>Verse</span>
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              textDecoration: 'none',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              background: location.pathname === link.to ? 'rgba(244,124,58,0.15)' : 'transparent',
              color: location.pathname === link.to ? '#f47c3a' : '#8a8a9a',
              border: location.pathname === link.to ? '1px solid rgba(244,124,58,0.3)' : '1px solid transparent',
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/tours" style={{
          textDecoration: 'none',
          marginLeft: '8px',
          padding: '10px 24px',
          borderRadius: '999px',
          fontSize: '0.9rem',
          fontWeight: 600,
          background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
          color: 'white',
        }}>
          Book Now
        </Link>
      </div>
    </nav>
  )
}