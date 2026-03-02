import { useEffect, useState } from 'react'
import API from '../api/axios'

const mealIcons = {
  'Breakfast': '🌅',
  'Breakfast + Dinner': '🌅🌙',
  'Breakfast + Lunch + Dinner': '🌅☀️🌙',
  'Dinner': '🌙',
  'All Meals': '🍽️',
}

const transportIcons = (transport) => {
  if (!transport) return '🚗'
  const t = transport.toLowerCase()
  if (t.includes('flight') || t.includes('air')) return '✈️'
  if (t.includes('train')) return '🚂'
  if (t.includes('boat') || t.includes('ferry')) return '⛵'
  if (t.includes('elephant')) return '🐘'
  if (t.includes('bike') || t.includes('motorcycle')) return '🏍️'
  return '🚗'
}

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{
          color: i <= rating ? '#c9a84c' : '#3a3a4a',
          fontSize: '0.7rem'
        }}>★</span>
      ))}
    </div>
  )
}

export default function Itinerary({ tourId }) {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeDay, setActiveDay] = useState(1)

  useEffect(() => {
    API.get(`/tours/${tourId}/itinerary`)
      .then(res => {
        setDays(res.data.data)
        if (res.data.data.length > 0) setActiveDay(1)
      })
      .finally(() => setLoading(false))
  }, [tourId])

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#6a6a7a' }}>
      Loading itinerary...
    </div>
  )

  if (days.length === 0) return (
    <div style={{
      padding: '40px', textAlign: 'center',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🗓️</div>
      <p style={{ color: '#6a6a7a' }}>Detailed itinerary coming soon!</p>
    </div>
  )

  const currentDay = days.find(d => d.day_number === activeDay) || days[0]

  return (
    <div>
      <h2 style={{
        fontFamily: 'Playfair Display, serif',
        color: 'white', fontSize: '1.5rem',
        fontWeight: 700, marginBottom: '8px',
      }}>
        Day by Day Itinerary
      </h2>
      <p style={{ color: '#6a6a7a', fontSize: '0.85rem', marginBottom: '24px' }}>
        {days.length} days of carefully planned experiences
      </p>

      {/* Day selector */}
      <div style={{
        display: 'flex', gap: '8px',
        marginBottom: '28px', flexWrap: 'wrap',
      }}>
        {days.map(day => (
          <button
            key={day.day_number}
            onClick={() => setActiveDay(day.day_number)}
            style={{
              padding: '8px 16px', borderRadius: '12px',
              border: '1px solid',
              borderColor: activeDay === day.day_number ? '#f47c3a' : 'rgba(255,255,255,0.08)',
              background: activeDay === day.day_number
                ? 'linear-gradient(135deg, rgba(244,124,58,0.2), rgba(201,168,76,0.1))'
                : 'rgba(255,255,255,0.03)',
              color: activeDay === day.day_number ? '#f47c3a' : '#6a6a7a',
              fontWeight: activeDay === day.day_number ? 700 : 400,
              cursor: 'pointer', fontSize: '0.82rem',
              transition: 'all 0.2s',
            }}
          >
            Day {day.day_number}
          </button>
        ))}
      </div>

      {/* Active day detail */}
      {currentDay && (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', overflow: 'hidden',
        }}>
          {/* Day header */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(244,124,58,0.15), rgba(201,168,76,0.08))',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '20px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <div>
              <p style={{ color: '#f47c3a', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.1em' }}>
                DAY {currentDay.day_number}
              </p>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'white', fontSize: '1.3rem', fontWeight: 700,
              }}>
                {currentDay.title}
              </h3>
            </div>
            {currentDay.distance && (
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', padding: '8px 16px',
                textAlign: 'center',
              }}>
                <p style={{ color: '#6a6a7a', fontSize: '0.65rem', marginBottom: '2px' }}>DISTANCE</p>
                <p style={{ color: 'white', fontSize: '0.82rem', fontWeight: 600 }}>{currentDay.distance}</p>
              </div>
            )}
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Description */}
            <p style={{ color: '#9a9aaa', lineHeight: 1.8, fontSize: '0.92rem' }}>
              {currentDay.description}
            </p>

            {/* Info grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}>

              {/* Transport */}
              {currentDay.transport && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', padding: '14px',
                }}>
                  <p style={{ color: '#6a6a7a', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    🚗 Transport
                  </p>
                  <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.4 }}>
                    {transportIcons(currentDay.transport)} {currentDay.transport}
                  </p>
                </div>
              )}

              {/* Meals */}
              {currentDay.meals && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', padding: '14px',
                }}>
                  <p style={{ color: '#6a6a7a', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    🍽️ Meals
                  </p>
                  <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500 }}>
                    {mealIcons[currentDay.meals] || '🍽️'} {currentDay.meals}
                  </p>
                </div>
              )}

              {/* Hotel */}
              {currentDay.accommodation && currentDay.accommodation !== 'N/A - Departure Day' && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', padding: '14px',
                  gridColumn: 'span 2',
                }}>
                  <p style={{ color: '#6a6a7a', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    🏨 Hotel
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                      {currentDay.accommodation}
                    </p>
                    <StarRating rating={currentDay.hotel_rating} />
                  </div>
                </div>
              )}
            </div>

            {/* Places to visit */}
            {currentDay.places && currentDay.places.length > 0 && (
              <div>
                <p style={{ color: '#6a6a7a', fontSize: '0.75rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  📍 Places to Visit
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentDay.places.map((place, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(244,124,58,0.08)',
                      border: '1px solid rgba(244,124,58,0.15)',
                      borderRadius: '10px', padding: '6px 14px',
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: '#f47c3a', display: 'block', flexShrink: 0,
                      }} />
                      <span style={{ color: '#d4a574', fontSize: '0.82rem', fontWeight: 500 }}>
                        {place}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}