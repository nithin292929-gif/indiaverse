import { useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { useNavigate } from 'react-router-dom'

// This is the GeoJSON data URL for India's state boundaries
const INDIA_TOPO = 'https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson'

// Region colors — each region gets its own color theme
const regionColors = {
  'Rajasthan':        { base: '#c9531a', hover: '#f47c3a' },
  'Gujarat':          { base: '#b5460f', hover: '#e85d1a' },
  'Maharashtra':      { base: '#9c3d0e', hover: '#d4541e' },
  'Goa':              { base: '#7a8c2e', hover: '#a3bc3d' },
  'Karnataka':        { base: '#6b7a28', hover: '#8fa334' },
  'Kerala':           { base: '#2d6e3e', hover: '#3d9954' },
  'Tamil Nadu':       { base: '#1a5c34', hover: '#27854b' },
  'Andhra Pradesh':   { base: '#1e5c6b', hover: '#2a8099' },
  'Telangana':        { base: '#1a4a5c', hover: '#246880' },
  'Odisha':           { base: '#4a2d6b', hover: '#6b3d99' },
  'West Bengal':      { base: '#3d2d6b', hover: '#5a3d99' },
  'Sikkim':           { base: '#2d3d6b', hover: '#3d5299' },
  'Assam':            { base: '#1a3d5c', hover: '#265780' },
  'Meghalaya':        { base: '#1a4a3d', hover: '#256657' },
  'Manipur':          { base: '#3d4a1a', hover: '#566624' },
  'Mizoram':          { base: '#4a3d1a', hover: '#665524' },
  'Nagaland':         { base: '#5c3d1a', hover: '#805524' },
  'Arunachal Pradesh':{ base: '#3d2d1a', hover: '#573d24' },
  'Tripura':          { base: '#4a1a3d', hover: '#662457' },
  'Jharkhand':        { base: '#6b4a1a', hover: '#996624' },
  'Bihar':            { base: '#6b5c1a', hover: '#998024' },
  'Uttar Pradesh':    { base: '#5c6b1a', hover: '#809924' },
  'Madhya Pradesh':   { base: '#4a6b1a', hover: '#669924' },
  'Chhattisgarh':     { base: '#3d5c1a', hover: '#578024' },
  'Uttarakhand':      { base: '#1a5c6b', hover: '#248099' },
  'Himachal Pradesh': { base: '#1a4a6b', hover: '#246699' },
  'Punjab':           { base: '#1a3d6b', hover: '#245799' },
  'Haryana':          { base: '#2d1a6b', hover: '#3d2499' },
  'Delhi':            { base: '#6b1a3d', hover: '#992457' },
  'Jammu and Kashmir':{ base: '#1a2d6b', hover: '#243d99' },
  'Ladakh':           { base: '#3d1a6b', hover: '#572499' },
  default:            { base: '#2a3a5c', hover: '#3d5280' },
}

export default function IndiaMap({ onStateSelect }) {
  const [hoveredState, setHoveredState] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  function handleStateClick(stateName) {
    if (onStateSelect) {
      onStateSelect(stateName)
    }
  }

  function getColor(stateName, isHovered) {
    const colors = regionColors[stateName] || regionColors.default
    return isHovered ? colors.hover : colors.base
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Tooltip */}
      {hoveredState && (
        <div style={{
          position: 'absolute',
          left: tooltipPos.x + 10,
          top: tooltipPos.y - 40,
          background: 'rgba(10,14,28,0.95)',
          border: '1px solid rgba(244,124,58,0.4)',
          borderRadius: '8px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '0.85rem',
          fontWeight: 600,
          pointerEvents: 'none',
          zIndex: 100,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 20px rgba(244,124,58,0.2)',
        }}>
          📍 {hoveredState}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [82, 22],
          scale: 1000,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
          <Geographies geography={INDIA_TOPO}>
            {({ geographies }) =>
              geographies.map(geo => {
                const stateName = geo.properties.NAME_1 || geo.properties.name || 'Unknown'
                const isHovered = hoveredState === stateName

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleStateClick(stateName)}
                    onMouseEnter={(e) => {
                      setHoveredState(stateName)
                      setTooltipPos({ x: e.clientX, y: e.clientY })
                    }}
                    onMouseMove={(e) => {
                      setTooltipPos({ x: e.clientX, y: e.clientY })
                    }}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      default: {
                        fill: getColor(stateName, false),
                        stroke: 'rgba(255,255,255,0.15)',
                        strokeWidth: 0.5,
                        outline: 'none',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      },
                      hover: {
                        fill: getColor(stateName, true),
                        stroke: '#f47c3a',
                        strokeWidth: 1.5,
                        outline: 'none',
                        filter: 'brightness(1.3)',
                        cursor: 'pointer',
                      },
                      pressed: {
                        fill: '#f47c3a',
                        stroke: '#f47c3a',
                        strokeWidth: 2,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}