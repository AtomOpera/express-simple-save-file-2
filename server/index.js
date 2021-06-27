// server/index.js

const express = require("express");
// diskdb connection
const db = require('diskdb');
db.connect('./server/data', ['movies']);

// placeholder data from data.js
let data = require('./data');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/items", (req, res) => {
  res.json(data);
});

app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const item = data.find(_item => _item.id === itemId);

  if (item) {
     res.json(item);
  } else {
     res.json({ message: `item ${itemId} doesn't exist`})
  }
});

app.post("/items", (req, res) => {
  const item = req.body;
  console.log('Adding new item: ', item);

  // add new item to array
  data.push(item)

  // return updated list
  res.json(data);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from API server!" });
});

app.get("/web", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});