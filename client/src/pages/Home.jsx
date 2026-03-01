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

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        {/* 3D Hero Background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.9 }}>
          <Hero3D />
        </div>

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, #06080f 80%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(transparent, #06080f)' }} />

        {/* Hero Content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
          paddingTop: '72px'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(244,124,58,0.12)',
            border: '1px solid rgba(244,124,58,0.25)',
            borderRadius: '999px', padding: '8px 20px',
            marginBottom: '32px'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#f47c3a', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ✦ Discover Incredible India
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '800px',
          }}>
            Where Every Journey<br />
            <span style={{ background: 'linear-gradient(135deg, #f47c3a, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Becomes a Story
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            color: '#8a8a9a', fontSize: '1.15rem',
            maxWidth: '520px', lineHeight: 1.7,
            marginBottom: '48px', fontWeight: 300
          }}>
            From the snow-capped Himalayas to sun-kissed Kerala backwaters — experience India's magic like never before.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/tours')}
              style={{
                background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                color: 'white', fontWeight: 600,
                padding: '16px 40px', borderRadius: '999px',
                fontSize: '1rem', border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(244,124,58,0.35)',
              }}
            >
              Explore Tours →
            </button>
            <button
              onClick={() => navigate('/tours')}
              style={{
                background: 'transparent',
                color: 'white', fontWeight: 500,
                padding: '16px 40px', borderRadius: '999px',
                fontSize: '1rem', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Watch Story ▶
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 48px',
        display: 'flex', justifyContent: 'center', gap: '80px', flexWrap: 'wrap'
      }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>{stat.number}</div>
            <div style={{ color: '#8a8a9a', fontSize: '0.85rem', marginTop: '4px', fontWeight: 500, letterSpacing: '0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div style={{ padding: '100px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#f47c3a', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ Why Choose Us
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', fontWeight: 700, color: 'white' }}>
            Travel Done Differently
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {[
            { icon: '🏛️', title: 'Curated Experiences', desc: 'Hand-picked destinations chosen by travel experts with decades of experience.' },
            { icon: '🛡️', title: 'Safe & Trusted', desc: 'Verified guides, insured trips and 24/7 support throughout your journey.' },
            { icon: '💰', title: 'Best Price Guarantee', desc: "Find a lower price? We'll match it. No hidden fees, ever." },
            { icon: '🌿', title: 'Eco Responsible', desc: "Sustainable travel practices that protect India's natural beauty." },
          ].map(item => (
            <div key={item.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px', padding: '32px',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.2rem', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#8a8a9a', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        margin: '0 48px 100px',
        background: 'linear-gradient(135deg, rgba(244,124,58,0.15), rgba(201,168,76,0.15))',
        border: '1px solid rgba(244,124,58,0.2)',
        borderRadius: '28px', padding: '80px 48px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: 'white', marginBottom: '16px' }}>
          Ready to Explore India?
        </h2>
        <p style={{ color: '#8a8a9a', marginBottom: '40px', fontSize: '1.05rem' }}>
          Join thousands of travelers who discovered India with us
        </p>
        <button
          onClick={() => navigate('/tours')}
          style={{
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            color: 'white', fontWeight: 600,
            padding: '18px 48px', borderRadius: '999px',
            fontSize: '1.05rem', border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(244,124,58,0.35)',
          }}
        >
          View All Tours →
        </button>
      </div>

    </div>
  )
}