// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'arthmohan',
  database: 'kai'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

let latestResults = [];

app.post('/data', (req, res) => {
  let { skinTypeResults, skinConcernsResults, priceRangeResults } = req.body;

  // Replace empty arrays with an array that contains a value that doesn't match any records
  skinTypeResults = skinTypeResults.length ? skinTypeResults : ['no_match'];
  skinConcernsResults = skinConcernsResults.length ? skinConcernsResults : ['no_match'];
  priceRangeResults = priceRangeResults.length ? priceRangeResults : ['no_match'];

  let skinTypePlaceholders = skinTypeResults.map(() => '?').join(',');
  let skinConcernsPlaceholders = skinConcernsResults.map(() => '?').join(',');
  let priceRangePlaceholders = priceRangeResults.map(() => '?').join(',');

  let sql = `SELECT p.Image_Link, p.name AS product_name, p.category, p.price_range, p.mrp, GROUP_CONCAT(DISTINCT st.skin_type_name ORDER BY st.skin_type_name ASC SEPARATOR ', ') AS skin_types, GROUP_CONCAT(DISTINCT sc.skin_concern_name ORDER BY sc.skin_concern_name ASC SEPARATOR ', ') AS skin_concerns, p.Purchase_Link FROM Products p INNER JOIN Product_Skin_Types pst ON p.product_id = pst.product_id INNER JOIN Skin_Types st ON pst.skin_type_id = st.skin_type_id LEFT JOIN Product_Skin_Concerns psc ON p.product_id = psc.product_id LEFT JOIN Skin_Concerns sc ON psc.skin_concern_id = sc.skin_concern_id WHERE st.skin_type_name IN (${skinTypePlaceholders}) AND sc.skin_concern_name IN (${skinConcernsPlaceholders}) AND p.price_range IN (${priceRangePlaceholders}) GROUP BY p.product_id;`;

  db.query(sql, [...skinTypeResults, ...skinConcernsResults, ...priceRangeResults], (err, results) => {
    if (err) throw err;
    latestResults = results;
    res.json(results);
  });
});

app.get('/data', (req, res) => {
  res.json(latestResults);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
