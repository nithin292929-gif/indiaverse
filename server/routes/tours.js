import express from 'express'
import pool from '../db.js'

const router = express.Router()

// Get all tours
router.get('/', async (req, res) => {
  try {
    let query = 'SELECT * FROM tours WHERE 1=1'
    const params = []

    if (req.query.search) {
      params.push(`%${req.query.search}%`)
      query += ` AND (title ILIKE $${params.length} OR location ILIKE $${params.length} OR state ILIKE $${params.length})`
    }
    if (req.query.category) {
      params.push(req.query.category)
      query += ` AND category = $${params.length}`
    }
    if (req.query.state) {
      params.push(`%${req.query.state}%`)
      query += ` AND state ILIKE $${params.length}`
    }

    query += ' ORDER BY created_at DESC'
    const result = await pool.query(query, params)
    res.json({ success: true, data: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Get single tour
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tours WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Tour not found' })
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Get itinerary for a tour
router.get('/:id/itinerary', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM itineraries WHERE tour_id = $1 ORDER BY day_number ASC',
      [req.params.id]
    )
    res.json({ success: true, data: result.rows })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Create tour
router.post('/', async (req, res) => {
  try {
    const { title, description, location, state, price, duration, category, image_url } = req.body
    const result = await pool.query(
      `INSERT INTO tours (title, description, location, state, price, duration, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, location, state, price, duration, category, image_url]
    )
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Update tour
router.put('/:id', async (req, res) => {
  try {
    const { title, description, location, state, price, duration, category, image_url } = req.body
    const result = await pool.query(
      `UPDATE tours SET title=$1, description=$2, location=$3, state=$4, price=$5, duration=$6, category=$7, image_url=$8 WHERE id=$9 RETURNING *`,
      [title, description, location, state, price, duration, category, image_url, req.params.id]
    )
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Delete tour
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tours WHERE id = $1', [req.params.id])
    res.json({ success: true, message: 'Tour deleted' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

export default router