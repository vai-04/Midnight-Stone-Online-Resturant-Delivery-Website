const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./midnight.db');

//Reset all order counts to 0
db.serialize(() => {
  db.run("UPDATE menu SET orderCount = 0");
  console.log("✨ Data has been reset to zero! You are ready to demo.");
});

db.close();
