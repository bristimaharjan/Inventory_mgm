import { Router } from 'express';
const router = Router();
import db from '../db.js'; // Import the db connection directly
// GET endpoint to fetch all menu items
router.get('/', (req, res) => {
  const query = 'SELECT * FROM menu_item';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
    res.status(200).json(results);
  });
});


// POST endpoint to add a menu item (Create)
router.post('/', (req, res) => {
  const { itemName, itemCategory, itemPrice } = req.body;

  // Validate incoming data
  if (!itemName || !itemCategory || !itemPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO menu_item (item_name, item_category, item_price) VALUES (?, ?, ?)';
  db.query(query, [itemName, itemCategory, itemPrice], (err, result) => {
    if (err) {
      console.error('Error during POST operation:', err); // Log the actual error
      return res.status(500).json({ error: 'Failed to add menu item', details: err.message });
    }
    res.status(201).json({ message: 'Menu item added successfully', itemId: result.insertId });
  });
});


// PUT endpoint to update a menu item (Update)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { itemName, itemCategory, itemPrice } = req.body;

  // Validate incoming data
  if (!itemName || !itemCategory || !itemPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'UPDATE menu_item SET item_name = ?, item_category = ?, item_price = ? WHERE item_id = ?';
  db.query(query, [itemName, itemCategory, itemPrice, id], (err, result) => {
    if (err) {
      console.error('Error during PUT operation:', err); // Log the actual error
      return res.status(500).json({ error: 'Failed to update menu item', details: err.message });
    }
    res.status(200).json({ message: 'Menu item updated successfully' });
  });
});


// DELETE endpoint to delete a menu item (Delete)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM menu_item  WHERE item_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete menu item' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  });
});

export default router;
