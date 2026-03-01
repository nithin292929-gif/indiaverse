import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FlipCard3D({ tour }) {
  const [flipped, setFlipped] = useState(false)
  const navigate = useNavigate()

  const categoryColors = {
    Heritage:  '#f47c3a',
    Nature:    '#34d399',
    Beach:     '#4af0ff',
    Adventure: '#f472b6',
    Spiritual: '#a78bfa',
    default:   '#c9a84c'
  }
  const color = categoryColors[tour.category] || categoryColors.default

  return (
    <div
      style={{ width: '100%', height: '420px', perspective: '1200px', cursor: 'pointer' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* FRONT FACE */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '20px',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <img
            src={tour.image_url}
            alt={tour.title}
            style={{ width: '100%', height: '55%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
            background: 'linear-gradient(to bottom, transparent 40%, rgba(6,8,15,0.8))'
          }} />

          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            background: color, color: 'white',
            padding: '4px 14px', borderRadius: '999px',
            fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em'
          }}>
            {tour.category}
          </div>

          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            color: 'white', padding: '4px 12px',
            borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600
          }}>
            ⭐ {tour.rating}
          </div>

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(180deg, #0e1420, #06080f)',
            padding: '20px', height: '45%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'white', fontSize: '1.15rem',
                fontWeight: 700, marginBottom: '6px'
              }}>
                {tour.title}
              </h3>
              <p style={{ color: '#8a8a9a', fontSize: '0.85rem' }}>
                📍 {tour.location}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{
                  background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  fontSize: '1.5rem', fontWeight: 800,
                  fontFamily: 'Playfair Display, serif'
                }}>
                  ₹{Number(tour.price).toLocaleString()}
                </span>
                <span style={{ color: '#8a8a9a', fontSize: '0.78rem' }}> /person</span>
              </div>
              <span style={{
                color: '#8a8a9a', fontSize: '0.82rem',
                background: 'rgba(255,255,255,0.06)',
                padding: '4px 12px', borderRadius: '999px'
              }}>
                ⏱ {tour.duration}
              </span>
            </div>

            <div style={{
              position: 'absolute', bottom: '12px', left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', gap: '4px'
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: i === 1 ? color : 'rgba(255,255,255,0.2)'
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '20px',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          overflow: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, #0e1420, #06080f)',
          border: `1px solid ${color}33`,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '32px',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`
          }} />

          <div>
            <span style={{
              color: color, fontSize: '0.72rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              {tour.category} Experience
            </span>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              color: 'white', fontSize: '1.5rem',
              fontWeight: 700, margin: '12px 0'
            }}>
              {tour.title}
            </h3>
            <p style={{
              color: '#8a8a9a', lineHeight: 1.7,
              fontSize: '0.88rem',
            }}>
              {tour.description?.slice(0, 120)}...
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Location', value: tour.location },
              { label: 'State',    value: tour.state },
              { label: 'Duration', value: tour.duration },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{ color: '#8a8a9a', fontSize: '0.85rem' }}>{item.label}</span>
                <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                ₹{Number(tour.price).toLocaleString()}
              </span>
              <span style={{ color: '#8a8a9a', fontSize: '0.85rem' }}> per person</span>
            </div>

            <button
              onClick={() => navigate(`/tours/${tour.id}`)}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, #f47c3a, #c9a84c)`,
                color: 'white', fontWeight: 700,
                padding: '14px', borderRadius: '12px',
                fontSize: '0.95rem', border: 'none', cursor: 'pointer',
                boxShadow: `0 8px 24px rgba(244,124,58,0.35)`,
              }}
            >
              Book This Tour →
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}