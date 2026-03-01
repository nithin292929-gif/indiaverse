import express from 'express'
import pool from '../db.js'

const router = express.Router()

// GET all tours
router.get('/', async (req, res) => {
  try {
    const { category, state, search } = req.query
    let query = 'SELECT * FROM tours WHERE 1=1'
    const values = []
    let count = 1

    if (category) {
      query += ` AND category = $${count}`
      values.push(category)
      count++
    }
    if (state) {
      query += ` AND state ILIKE $${count}`
      values.push(`%${state}%`)
      count++
    }
    if (search) {
      query += ` AND (title ILIKE $${count} OR location ILIKE $${count})`
      values.push(`%${search}%`)
      count++
    }

    query += ' ORDER BY created_at DESC'
    const result = await pool.query(query, values)
    res.json({ success: true, data: result.rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET single tour
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tours WHERE id = $1', [req.params.id])
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Tour not found' })
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST create tour
router.post('/', async (req, res) => {
  try {
    const { title, description, location, state, price, duration, image_url, category } = req.body
    const result = await pool.query(
      `INSERT INTO tours (title, description, location, state, price, duration, image_url, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [title, description, location, state, price, duration, image_url, category]
    )
    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT update tour
router.put('/:id', async (req, res) => {
  try {
    const { title, description, location, state, price, duration, image_url, category } = req.body
    const result = await pool.query(
      `UPDATE tours SET title=$1, description=$2, location=$3, state=$4,
       price=$5, duration=$6, image_url=$7, category=$8 WHERE id=$9 RETURNING *`,
      [title, description, location, state, price, duration, image_url, category, req.params.id]
    )
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// DELETE tour
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tours WHERE id = $1', [req.params.id])
    res.json({ success: true, message: 'Tour deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router