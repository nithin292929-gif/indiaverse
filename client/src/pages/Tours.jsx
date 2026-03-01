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

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', paddingTop: '100px' }}>

      {/* Page Header */}
      <div style={{
        textAlign: 'center', padding: '60px 48px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '200px',
          background: 'radial-gradient(ellipse, rgba(244,124,58,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <p style={{
          color: '#f47c3a', fontSize: '0.78rem', fontWeight: 600,
          letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px'
        }}>
          ✦ Explore India
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800, color: 'white', marginBottom: '16px'
        }}>
          Find Your Perfect{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Adventure
          </span>
        </h1>
        <p style={{ color: '#8a8a9a', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>
          Handpicked journeys across India's most breathtaking destinations
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px' }}>

        {/* Search + Filter Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1, minWidth: '280px',
            display: 'flex', alignItems: 'center', gap: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px', padding: '4px 20px',
          }}>
            <span style={{ color: '#8a8a9a', fontSize: '1rem' }}>🔍</span>
            <input
              placeholder="Search destinations, states..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchTours()}
              style={{
                flex: 1, background: 'transparent',
                border: 'none', outline: 'none',
                color: 'white', fontSize: '0.95rem',
                padding: '12px 0',
              }}
            />
          </div>
          <button
            onClick={fetchTours}
            style={{
              background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
              color: 'white', fontWeight: 600,
              padding: '14px 32px', borderRadius: '999px',
              fontSize: '0.95rem', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(244,124,58,0.3)',
            }}
          >
            Search
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const active = (cat === 'All' && !category) || cat === category
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? '' : cat)}
                style={{
                  padding: '8px 22px', borderRadius: '999px',
                  fontSize: '0.88rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: active ? '#f47c3a' : 'rgba(255,255,255,0.1)',
                  background: active ? 'rgba(244,124,58,0.15)' : 'transparent',
                  color: active ? '#f47c3a' : '#8a8a9a',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {!loading && (
          <p style={{ color: '#8a8a9a', fontSize: '0.88rem', marginBottom: '32px' }}>
            Showing <span style={{ color: 'white', fontWeight: 600 }}>{tours.length}</span> tours
            {category && <span> in <span style={{ color: '#f47c3a' }}>{category}</span></span>}
          </p>
        )}

        {/* Tours Grid with Flip Cards */}
        {loading ? (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingTop: '100px', gap: '16px'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '3px solid rgba(244,124,58,0.2)',
              borderTopColor: '#f47c3a',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#8a8a9a' }}>Loading tours...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : tours.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <p style={{ color: '#8a8a9a', fontSize: '1.1rem' }}>No tours found. Try a different search!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px'
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