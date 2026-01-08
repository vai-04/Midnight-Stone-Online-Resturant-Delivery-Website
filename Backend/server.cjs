//server.cjs
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(express.json());

//--- DATABASE SETUP ---
const db = new sqlite3.Database('./midnight.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    price INTEGER,
    category TEXT,
    orderCount INTEGER DEFAULT 0
  )`);

  db.get("SELECT count(*) as count FROM menu", (err, row) => {
    if (row.count === 0) {
      console.log("Seeding initial data...");
      const stmt = db.prepare("INSERT INTO menu (name, desc, price, category, orderCount) VALUES (?, ?, ?, ?, ?)");
      
      const INITIAL_MENU = [
        ["Truffle Mushroom Risotto", "Creamy arborio rice, wild mushrooms, black truffle oil", 840, "Main Course", 0],
        ["Charcoal Grilled Paneer", "Smoked cottage cheese, pistachio glaze", 720, "Main Course", 0],
        ["Japanese Miso Ramen", "Silky broth, noodles, soft egg", 840, "Main Course", 0],
        ["Classic Tiramisu", "Espresso-soaked ladyfingers, mascarpone", 520, "Dessert", 0],
        ["Truffle Arancini", "Crispy risotto balls, parmesan, truffle aioli", 560, "Appetizer", 0],
        ["Korean Gochujang Wings", "Sticky-spicy glaze, sesame, scallions", 640, "Appetizer", 0],
        ["Crispy Halloumi Fries", "Golden fried cheese, honey chili drizzle", 580, "Appetizer", 0],
        ["Japanese Veg Gyoza", "Pan-seared dumplings, soy dipping sauce", 520, "Appetizer", 0],
        ["Midnight Herb Pasta", "Fresh herbs, olive oil, roasted garlic", 680, "Main Course", 0],
        ["Thai Green Curry Bowl", "Coconut curry, jasmine rice", 780, "Main Course", 0],
        ["Belgian Dark Chocolate Mousse", "72% cocoa, whipped cream", 500, "Dessert", 0],
        ["Iced Matcha Latte", "Ceremonial grade matcha, oat milk", 440, "Drink", 0]
      ];

      INITIAL_MENU.forEach(item => stmt.run(item));
      stmt.finalize();
    }
  });
});

//--- API ENDPOINTS ---

//GET ALL MENU ITEMS (Used for Menu Page & Owner Trends)
app.get('/api/menu', (req, res) => {
  db.all("SELECT * FROM menu", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//ADD NEW ITEM (Owner)
app.post('/api/menu', (req, res) => {
  const { name, desc, price, category } = req.body;
  const sql = "INSERT INTO menu (name, desc, price, category, orderCount) VALUES (?, ?, ?, ?, 0)";
  
  db.run(sql, [name, desc, price, category], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, desc, price, category, orderCount: 0 });
  });
});

//REMOVE ITEM (Owner)
app.delete('/api/menu/:name', (req, res) => {
  const sql = "DELETE FROM menu WHERE lower(name) = lower(?)";
  db.run(sql, [req.params.name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Deleted", changes: this.changes });
  });
});

//PLACE ORDER (Updates Counts)
app.post('/api/order', (req, res) => {
  const items = req.body.items;
  
  //Update counts for each item
  const stmt = db.prepare("UPDATE menu SET orderCount = orderCount + ? WHERE id = ?");
  
  items.forEach(item => {
    stmt.run(item.qty, item.id);
  });
  stmt.finalize();

  res.json({ message: "Order processed, counts updated" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
