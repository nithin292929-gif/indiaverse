import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tours', label: 'Tours' },
    { to: '/map', label: 'Map' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <>
      <style>{`
        .nav-link { transition: all 0.2s; }
        .nav-link:hover { color: #f47c3a !important; }
        .book-btn { transition: all 0.2s; }
        .book-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(244,124,58,0.5) !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: '0 clamp(16px, 4vw, 48px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '70px', boxSizing: 'border-box',
        background: scrolled ? 'rgba(6,8,15,0.97)' : 'rgba(6,8,15,0.7)',
        backdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(244,124,58,0.1)' : '1px solid rgba(255,255,255,0.04)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(244,124,58,0.3)',
          }}>🇮🇳</div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem', fontWeight: 700,
            color: 'white', letterSpacing: '-0.02em'
          }}>
            India<span style={{
              background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Verse</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {links.map(link => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#f47c3a' : '#9a9aaa',
                  background: active ? 'rgba(244,124,58,0.12)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(244,124,58,0.25)' : 'transparent'}`,
                  position: 'relative',
                }}
              >
                {link.label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: '-2px',
                    left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: '#f47c3a',
                  }} />
                )}
              </Link>
            )
          })}

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />

          <Link to="/tours" className="book-btn" style={{
            textDecoration: 'none',
            padding: '10px 24px', borderRadius: '999px',
            fontSize: '0.88rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #f47c3a, #e8692a)',
            color: 'white',
            boxShadow: '0 4px 16px rgba(244,124,58,0.3)',
            letterSpacing: '0.01em',
          }}>
            Book Now ✈️
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            cursor: 'pointer', padding: '8px 10px',
            display: 'flex', flexDirection: 'column',
            gap: '5px', zIndex: 200,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: 'white', borderRadius: '2px',
              transition: 'all 0.3s',
              transform: i === 0 && menuOpen ? 'rotate(45deg) translate(5px, 5px)'
                : i === 2 && menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(6,8,15,0.99)',
        backdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '8px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', top: '24px', right: '24px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'white', width: '40px', height: '40px',
            borderRadius: '10px', cursor: 'pointer', fontSize: '1.1rem'
          }}
        >✕</button>

        {/* Logo in menu */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem', fontWeight: 700, color: 'white'
          }}>
            India<span style={{
              background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Verse</span>
          </span>
        </div>

        {links.map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            style={{
              textDecoration: 'none',
              fontSize: '1.6rem',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              color: location.pathname === link.to ? '#f47c3a' : 'white',
              padding: '12px 48px',
              borderRadius: '16px',
              background: location.pathname === link.to ? 'rgba(244,124,58,0.1)' : 'transparent',
              border: `1px solid ${location.pathname === link.to ? 'rgba(244,124,58,0.2)' : 'transparent'}`,
              transition: 'all 0.2s',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.05}s`,
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/tours"
          onClick={() => setMenuOpen(false)}
          style={{
            textDecoration: 'none', marginTop: '24px',
            padding: '16px 56px', borderRadius: '999px',
            fontSize: '1.1rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(244,124,58,0.4)',
          }}
        >
          Book Now ✈️
        </Link>
      </div>
    </>
  )
}