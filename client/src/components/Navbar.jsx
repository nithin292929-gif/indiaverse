import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tours', label: 'Tours' },
    { to: '/map', label: '🗺️ Map' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        padding: '0 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '68px',
        background: 'rgba(6,8,15,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxSizing: 'border-box',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', flexShrink: 0
          }}>🇮🇳</div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.3rem', fontWeight: 700,
            color: 'white', letterSpacing: '-0.02em'
          }}>
            India<span style={{ color: '#f47c3a' }}>Verse</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: 'none',
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '0.88rem',
                fontWeight: 500,
                background: location.pathname === link.to ? 'rgba(244,124,58,0.15)' : 'transparent',
                color: location.pathname === link.to ? '#f47c3a' : '#8a8a9a',
                border: location.pathname === link.to ? '1px solid rgba(244,124,58,0.3)' : '1px solid transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/tours" style={{
            textDecoration: 'none', marginLeft: '8px',
            padding: '10px 22px', borderRadius: '999px',
            fontSize: '0.88rem', fontWeight: 600,
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            color: 'white',
          }}>
            Book Now
          </Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: 'transparent', border: 'none',
            cursor: 'pointer', padding: '8px',
            display: 'flex', flexDirection: 'column',
            gap: '5px', zIndex: 200,
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: 'white', borderRadius: '2px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: 'white', borderRadius: '2px',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2px',
            background: 'white', borderRadius: '2px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(6,8,15,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '16px',
        }}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none',
                fontSize: '1.8rem',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                color: location.pathname === link.to ? '#f47c3a' : 'white',
                padding: '12px 32px',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/tours"
            onClick={() => setMenuOpen(false)}
            style={{
              textDecoration: 'none', marginTop: '16px',
              padding: '16px 48px', borderRadius: '999px',
              fontSize: '1.1rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
              color: 'white',
            }}
          >
            Book Now →
          </Link>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}