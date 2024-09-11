const express = require("express");
const db = require("./db");
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(4000, (req, res) => {
  console.log("server started");
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  console.log(req.body)
  // Simple validation
  if (!name || !email) {
      return res.status(400).send('Name and Email are required.');
  }

  // Example of more complex validation
  if (!/^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return res.status(400).send('Invalid email format.');
  }

  // Process the data (e.g., save to database)
  console.log('Form data received:', { name, email });
  res.send(`Received submission: Name: ${name}, Email: ${email}`);
});

app.get("/mobiles", (req, res) => {
  db.getMobiles()
    .then((persons) => {
      res.json(persons);
    })
    .catch(function (err) {
      res.send(err);
    });
});
app.get("/mobiles/:id", (req, res) => {
  db.getMobiles(req.params.id)
    .then((persons) => {
      res.json(persons);
    })
    .catch(function (err) {
      res.send(err);
    });
});

app.post("/mobiles", (req, res) => {
  db.addMobile(req.body.name, req.body.price, req.body.ram, req.body.storage)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/mobiles", (req, res) => {
  db.updateMobile(
    req.body.name,
    req.body.price,
    req.body.ram,
    req.body.storage,
    req.body.id
  )
    .then(() => {
      res.json(req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/mobiles", (req, res) => {
  db.deleteMobile(req.body.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});