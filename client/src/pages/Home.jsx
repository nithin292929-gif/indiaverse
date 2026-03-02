import { useNavigate } from 'react-router-dom'
import Hero3D from '../components/Hero3D'

const stats = [
  { number: '500+', label: 'Destinations' },
  { number: '10K+', label: 'Happy Travelers' },
  { number: '28', label: 'States Covered' },
  { number: '4.9★', label: 'Average Rating' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#06080f', minHeight: '100vh' }}>
      <style>{`
        .hero-title { font-size: clamp(2.2rem, 7vw, 5.5rem) !important; }
        .hero-sub { font-size: clamp(0.95rem, 2.5vw, 1.15rem) !important; }
        .stats-bar { gap: 32px !important; padding: 32px 24px !important; }
        .features-grid { grid-template-columns: 1fr !important; }
        .cta-section { margin: 0 16px 60px !important; padding: 48px 24px !important; }
        .cta-title { font-size: clamp(1.8rem, 5vw, 3rem) !important; }
        .hero-buttons { flex-direction: column !important; align-items: center !important; }
        .hero-buttons button { width: 240px !important; }
        @media (min-width: 640px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-buttons { flex-direction: row !important; }
          .hero-buttons button { width: auto !important; }
        }
        @media (min-width: 1024px) {
          .features-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Hero3D />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 20%, #06080f 80%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(transparent, #06080f)' }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 20px',
          paddingTop: '68px'
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(244,124,58,0.12)',
            border: '1px solid rgba(244,124,58,0.25)',
            borderRadius: '999px', padding: '7px 18px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '0.72rem', color: '#f47c3a', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ✦ Discover Incredible India
            </span>
          </div>

          <h1 className="hero-title" style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800, color: 'white',
            lineHeight: 1.1, marginBottom: '20px',
            maxWidth: '800px',
          }}>
            Where Every Journey<br />
            <span style={{ background: 'linear-gradient(135deg, #f47c3a, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Becomes a Story
            </span>
          </h1>

          <p className="hero-sub" style={{
            color: '#8a8a9a', maxWidth: '480px',
            lineHeight: 1.7, marginBottom: '36px', fontWeight: 300
          }}>
            From the snow-capped Himalayas to sun-kissed Kerala backwaters — experience India's magic like never before.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/tours')}
              style={{
                background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                color: 'white', fontWeight: 600,
                padding: '15px 36px', borderRadius: '999px',
                fontSize: '1rem', border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(244,124,58,0.35)',
              }}
            >
              Explore Tours →
            </button>
            <button
              onClick={() => navigate('/map')}
              style={{
                background: 'transparent', color: 'white', fontWeight: 500,
                padding: '15px 36px', borderRadius: '999px',
                fontSize: '1rem', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              🗺️ View Map
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-bar" style={{
        background: 'rgba(255,255,255,0.03)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '36px 48px',
        display: 'flex', justifyContent: 'center',
        gap: '48px', flexWrap: 'wrap'
      }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700,
              background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>{stat.number}</div>
            <div style={{ color: '#8a8a9a', fontSize: '0.82rem', marginTop: '4px', fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: 'clamp(48px, 8vw, 100px) clamp(16px, 4vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#f47c3a', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px' }}>
            ✦ Why Choose Us
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white' }}>
            Travel Done Differently
          </h2>
        </div>

        <div className="features-grid" style={{ display: 'grid', gap: '20px' }}>
          {[
            { icon: '🏛️', title: 'Curated Experiences', desc: 'Hand-picked destinations chosen by travel experts with decades of experience.' },
            { icon: '🛡️', title: 'Safe & Trusted', desc: 'Verified guides, insured trips and 24/7 support throughout your journey.' },
            { icon: '💰', title: 'Best Price Guarantee', desc: "Find a lower price? We'll match it. No hidden fees, ever." },
            { icon: '🌿', title: 'Eco Responsible', desc: "Sustainable travel practices that protect India's natural beauty." },
          ].map(item => (
            <div key={item.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '28px',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.15rem', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#8a8a9a', lineHeight: 1.7, fontSize: '0.88rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section" style={{
        margin: '0 48px 100px',
        background: 'linear-gradient(135deg, rgba(244,124,58,0.15), rgba(201,168,76,0.15))',
        border: '1px solid rgba(244,124,58,0.2)',
        borderRadius: '24px', padding: '64px 48px',
        textAlign: 'center',
      }}>
        <h2 className="cta-title" style={{ fontFamily: 'Playfair Display, serif', color: 'white', marginBottom: '14px' }}>
          Ready to Explore India?
        </h2>
        <p style={{ color: '#8a8a9a', marginBottom: '32px', fontSize: '1rem' }}>
          Join thousands of travelers who discovered India with us
        </p>
        <button
          onClick={() => navigate('/tours')}
          style={{
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            color: 'white', fontWeight: 600,
            padding: '16px 44px', borderRadius: '999px',
            fontSize: '1rem', border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(244,124,58,0.35)',
          }}
        >
          View All Tours →
        </button>
      </div>
    </div>
  )
}