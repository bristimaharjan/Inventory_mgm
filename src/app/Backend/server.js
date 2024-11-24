import express from 'express';
// Use the default import and destructure `json` from body-parser
import bodyParser from 'body-parser';
// Use import syntax for routes
import menuItemsRoutes from './routes/menuItem.js'; 
import cors from 'cors';



// Create an Express app
const app = express();
const PORT = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json()); // Use `json()` from bodyParser

// Use the routes
app.use('/api/menu-item', menuItemsRoutes);
 // This will handle all routes related to menu items
 app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
