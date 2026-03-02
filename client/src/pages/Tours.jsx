import { useEffect, useState } from 'react'
import API from '../api/axios'
import FlipCard3D from '../components/FlipCard3D'

export default function Tours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => { fetchTours() }, [category])

  async function fetchTours() {
    try {
      setLoading(true)
      const res = await API.get('/tours', { params: { search, category } })
      setTours(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Heritage', 'Nature', 'Beach', 'Adventure', 'Spiritual']

  const categoryIcons = {
    All: '🌏', Heritage: '🏛️', Nature: '🌿',
    Beach: '🏖️', Adventure: '🏔️', Spiritual: '🕌'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', paddingTop: '70px' }}>
      <style>{`
        .tours-grid { grid-template-columns: 1fr; }
        @media (max-width: 640px) {
          .tours-header { padding: 28px 16px 20px !important; }
          .search-row { flex-direction: column !important; }
          .tours-container { padding: 24px 16px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="tours-header" style={{
        textAlign: 'center',
        padding: 'clamp(32px, 5vw, 64px) 32px clamp(24px, 4vw, 48px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(244,124,58,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          color: '#f47c3a', fontSize: '0.75rem', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <span style={{ width: '24px', height: '1px', background: '#f47c3a', display: 'inline-block' }} />
          Explore India
          <span style={{ width: '24px', height: '1px', background: '#f47c3a', display: 'inline-block' }} />
        </p>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 800, color: 'white',
          marginBottom: '16px', lineHeight: 1.1,
        }}>
          Find Your Perfect{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Adventure
          </span>
        </h1>

        <p style={{
          color: '#6a6a7a', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
        }}>
          Handpicked journeys across India's most breathtaking destinations
        </p>
      </div>

      <div className="tours-container" style={{
        maxWidth: '960px', margin: '0 auto',
        padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 32px)',
      }}>

        {/* Search Row */}
        <div className="search-row" style={{
          display: 'flex', gap: '12px', marginBottom: '20px',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '4px 20px',
            transition: 'all 0.2s',
          }}
            onFocus={() => {}}
          >
            <span style={{ color: '#6a6a7a', fontSize: '1rem' }}>🔍</span>
            <input
              placeholder="Search destinations, states, experiences..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchTours()}
              style={{
                flex: 1, background: 'transparent',
                border: 'none', outline: 'none',
                color: 'white', fontSize: '0.95rem',
                padding: '14px 0',
              }}
            />
            {search && (
              <button
                onClick={() => { setSearch(''); fetchTours() }}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none', color: '#6a6a7a',
                  width: '24px', height: '24px', borderRadius: '50%',
                  cursor: 'pointer', fontSize: '0.8rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✕</button>
            )}
          </div>

          <button
            onClick={fetchTours}
            style={{
              background: 'linear-gradient(135deg, #f47c3a, #e8692a)',
              color: 'white', fontWeight: 700,
              padding: '0 28px', borderRadius: '16px',
              fontSize: '0.92rem', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(244,124,58,0.3)',
              whiteSpace: 'nowrap', letterSpacing: '0.02em',
              transition: 'all 0.2s',
            }}
          >
            Search
          </button>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex', gap: '8px',
          marginBottom: '40px', flexWrap: 'wrap',
        }}>
          {categories.map(cat => {
            const active = (cat === 'All' && !category) || cat === category
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? '' : cat)}
                style={{
                  padding: '9px 20px', borderRadius: '12px',
                  fontSize: '0.85rem', fontWeight: active ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: active ? '#f47c3a' : 'rgba(255,255,255,0.08)',
                  background: active
                    ? 'linear-gradient(135deg, rgba(244,124,58,0.2), rgba(201,168,76,0.1))'
                    : 'rgba(255,255,255,0.03)',
                  color: active ? '#f47c3a' : '#6a6a7a',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: active ? '0 4px 16px rgba(244,124,58,0.15)' : 'none',
                }}
              >
                <span>{categoryIcons[cat]}</span>
                {cat}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {!loading && (
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '24px',
          }}>
            <p style={{ color: '#6a6a7a', fontSize: '0.85rem' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>{tours.length}</span> tours found
              {category && <span> in <span style={{ color: '#f47c3a', fontWeight: 600 }}>{category}</span></span>}
              {search && <span> for "<span style={{ color: '#f47c3a' }}>{search}</span>"</span>}
            </p>
            <p style={{ color: '#6a6a7a', fontSize: '0.78rem' }}>
              Click any card to book ✈️
            </p>
          </div>
        )}

        {/* Tours Grid */}
        {loading ? (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingTop: '80px', gap: '20px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '3px solid rgba(244,124,58,0.15)',
              borderTopColor: '#f47c3a',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ color: '#6a6a7a', fontSize: '0.9rem' }}>
              Finding your perfect adventure...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : tours.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              color: 'white', fontSize: '1.4rem', marginBottom: '8px',
            }}>
              No tours found
            </h3>
            <p style={{ color: '#6a6a7a' }}>Try a different search or category!</p>
            <button
              onClick={() => { setSearch(''); setCategory(''); fetchTours() }}
              style={{
                marginTop: '20px',
                background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                color: 'white', border: 'none',
                padding: '12px 28px', borderRadius: '12px',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
              }}
            >
              Show All Tours
            </button>
          </div>
        ) : (
          <div className="tours-grid" style={{
            display: 'grid', gap: '20px',
            maxWidth: '900px', margin: '0 auto',
          }}>
            {tours.map(tour => (
              <FlipCard3D key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}