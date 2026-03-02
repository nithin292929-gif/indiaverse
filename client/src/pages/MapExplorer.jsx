import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IndiaMap from '../components/IndiaMap'
import API from '../api/axios'

export default function MapExplorer() {
  const [selectedState, setSelectedState] = useState(null)
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [allStates] = useState([
    'Rajasthan', 'Kerala', 'Goa', 'Himachal Pradesh', 'Uttar Pradesh',
    'Karnataka', 'Tamil Nadu', 'West Bengal', 'Uttarakhand', 'Punjab',
    'Ladakh', 'Andaman & Nicobar', 'Meghalaya', 'Maharashtra'
  ])
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedState) {
      fetchToursByState(selectedState)
    }
  }, [selectedState])

  async function fetchToursByState(state) {
    try {
      setLoading(true)
      const res = await API.get('/tours', { params: { state } })
      setTours(res.data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', paddingTop: '72px' }}>

      {/* Header */}
      <div style={{
        textAlign: 'center', padding: '48px 32px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <p style={{ color: '#f47c3a', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
          ✦ Explore By State
        </p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
          Click Any State to{' '}
          <span style={{ background: 'linear-gradient(135deg, #f47c3a, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Explore
          </span>
        </h1>
        <p style={{ color: '#8a8a9a', fontSize: '1rem' }}>
          Discover tour packages across every corner of India
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        height: 'calc(100vh - 220px)',
        maxHeight: '700px',
      }}>

        {/* Map Side */}
        <div style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '24px',
          position: 'relative',
          background: 'radial-gradient(ellipse at center, rgba(244,124,58,0.05) 0%, transparent 70%)',
        }}>
          <IndiaMap onStateSelect={setSelectedState} />
        </div>

        {/* Tours Side */}
        <div style={{ padding: '32px', overflowY: 'auto' }}>
          {!selectedState ? (
            <div style={{
              height: '100%', display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', gap: '16px'
            }}>
              <div style={{ fontSize: '4rem' }}>🗺️</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.5rem' }}>
                Select a State
              </h3>
              <p style={{ color: '#8a8a9a', maxWidth: '280px', lineHeight: 1.7 }}>
                Click any state on the map to discover available tour packages
              </p>

              {/* Quick state buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
                {allStates.map(state => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    style={{
                      padding: '6px 16px', borderRadius: '999px',
                      background: 'rgba(244,124,58,0.1)',
                      border: '1px solid rgba(244,124,58,0.2)',
                      color: '#f47c3a', fontSize: '0.78rem',
                      fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* State header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <button
                  onClick={() => { setSelectedState(null); setTours([]) }}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#8a8a9a', padding: '8px 16px',
                    borderRadius: '999px', cursor: 'pointer', fontSize: '0.85rem'
                  }}
                >
                  ← Back
                </button>
                <div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.5rem' }}>
                    {selectedState}
                  </h2>
                  <p style={{ color: '#8a8a9a', fontSize: '0.82rem' }}>
                    {loading ? 'Loading...' : `${tours.length} tours available`}
                  </p>
                </div>
              </div>

              {/* Tours list */}
              {loading ? (
                <div style={{ textAlign: 'center', paddingTop: '60px', color: '#8a8a9a' }}>
                  Loading tours...
                </div>
              ) : tours.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😔</div>
                  <p style={{ color: '#8a8a9a' }}>No tours available for {selectedState} yet</p>
                  <button
                    onClick={() => navigate('/tours')}
                    style={{
                      marginTop: '16px',
                      background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                      color: 'white', border: 'none',
                      padding: '12px 24px', borderRadius: '999px',
                      cursor: 'pointer', fontWeight: 600
                    }}
                  >
                    Browse All Tours
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {tours.map(tour => (
                    <div
                      key={tour.id}
                      onClick={() => navigate(`/tours/${tour.id}`)}
                      style={{
                        display: 'flex', gap: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '16px', overflow: 'hidden',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#f47c3a'}
                      onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                    >
                      <img
                        src={tour.image_url}
                        alt={tour.title}
                        style={{ width: '120px', height: '100px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ padding: '12px 16px 12px 0', flex: 1 }}>
                        <span style={{
                          color: '#f47c3a', fontSize: '0.7rem',
                          fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.08em'
                        }}>
                          {tour.category}
                        </span>
                        <h3 style={{
                          fontFamily: 'Playfair Display, serif',
                          color: 'white', fontSize: '1rem',
                          fontWeight: 700, margin: '4px 0 6px'
                        }}>
                          {tour.title}
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{
                            background: 'linear-gradient(135deg, #f47c3a, #c9a84c)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            fontWeight: 800, fontSize: '1.1rem',
                            fontFamily: 'Playfair Display, serif'
                          }}>
                            ₹{Number(tour.price).toLocaleString()}
                          </span>
                          <span style={{ color: '#8a8a9a', fontSize: '0.78rem' }}>
                            ⏱ {tour.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}