import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FlipCard3D({ tour }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const categoryColors = {
    Heritage: { from: '#c9783a', to: '#8B4513', accent: '#f47c3a' },
    Nature: { from: '#2d6a4f', to: '#1b4332', accent: '#34d399' },
    Beach: { from: '#0077b6', to: '#023e8a', accent: '#4af0ff' },
    Adventure: { from: '#7b2d8b', to: '#4a0e6b', accent: '#f472b6' },
    Spiritual: { from: '#b5451b', to: '#7c2d12', accent: '#fb923c' },
    default: { from: '#1a1a2e', to: '#16213e', accent: '#f47c3a' },
  }

  const colors = categoryColors[tour.category] || categoryColors.default

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/tours/${tour.id}`)}
      style={{
        position: 'relative',
        width: '100%',
        height: '220px',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${colors.accent}44`
          : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Left - Image panel (40%) */}
      <div style={{
        width: '40%', position: 'relative', flexShrink: 0, overflow: 'hidden',
      }}>
        <img
          src={tour.image_url}
          alt={tour.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
        {/* Image overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, transparent 60%, rgba(6,8,15,0.9) 100%)`,
        }} />

        {/* Category ribbon */}
        <div style={{
          position: 'absolute', top: '16px', left: '-8px',
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          color: 'white', padding: '4px 16px 4px 16px',
          fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          borderRadius: '0 4px 4px 0',
          boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
        }}>
          {tour.category}
        </div>

        {/* Rating */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px', padding: '4px 10px',
          fontSize: '0.78rem', color: '#c9a84c', fontWeight: 700,
        }}>
          ⭐ {tour.rating}
        </div>
      </div>

      {/* Right - Content panel (60%) */}
      <div style={{
        flex: 1,
        background: `linear-gradient(135deg, #0d1117 0%, #0a0d14 100%)`,
        padding: '24px 28px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent}18 0%, transparent 70%)`,
          transition: 'opacity 0.3s',
          opacity: hovered ? 1 : 0.5,
        }} />

        {/* Decorative lines like film strip */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '3px',
          background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)`,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.3s',
        }} />

        {/* Top section */}
        <div>
          {/* Location */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '10px',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: colors.accent,
              boxShadow: `0 0 8px ${colors.accent}`,
              display: 'block', flexShrink: 0,
            }} />
            <span style={{ color: colors.accent, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              {tour.location} · {tour.state}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white', fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 800, lineHeight: 1.2,
            marginBottom: '10px',
          }}>
            {tour.title}
          </h3>

          {/* Description */}
          <p style={{
            color: '#6a6a7a', fontSize: '0.82rem',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.3s',
            ...(hovered && { color: '#9a9aaa' }),
          }}>
            {tour.description}
          </p>
        </div>

        {/* Bottom section */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: '14px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Price + Duration */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <div>
              <p style={{ color: '#6a6a7a', fontSize: '0.68rem', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                From
              </p>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                background: `linear-gradient(135deg, ${colors.accent}, #c9a84c)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontSize: '1.5rem', fontWeight: 800, lineHeight: 1,
              }}>
                ₹{Number(tour.price).toLocaleString()}
              </p>
              <p style={{ color: '#6a6a7a', fontSize: '0.7rem', marginTop: '2px' }}>per person</p>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '6px 14px',
              textAlign: 'center',
            }}>
              <p style={{ color: '#6a6a7a', fontSize: '0.65rem', marginBottom: '2px' }}>DURATION</p>
              <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 700 }}>{tour.duration}</p>
            </div>
          </div>

          {/* Book button */}
          <button
            style={{
              background: hovered
                ? `linear-gradient(135deg, ${colors.accent}, #c9a84c)`
                : 'rgba(255,255,255,0.07)',
              color: 'white', border: 'none',
              padding: '10px 22px', borderRadius: '12px',
              fontSize: '0.85rem', fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: hovered ? `0 4px 20px ${colors.accent}44` : 'none',
              letterSpacing: '0.02em',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            Book Now
            <span style={{
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 0.3s',
              display: 'inline-block',
            }}>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}