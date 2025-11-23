const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

const corsOptions = {
  origin: ["https://miha77777ua.github.io/Forecaster/"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/:user/:password", (req, res) => {
  fetch(`https://${process.env.KEY}.mockapi.io/users`)
    .then(res => res.json())
    .then(data => {
      const newData = data.find(el => (el.login === req.params.user || el.email === req.params.user) && el.password === req.params.password);

      if (newData) {
        res.json({ login: newData.login, email: newData.email });
      } else {
        res.json({ error: "Error" });
      }
    });
});

app.post("/api", async (req, res) => {
  const body = req.body;

  const data = await fetch(`https://${process.env.KEY}.mockapi.io/users`);
  const users = await data.json();

  if (!users.find(el => el.login === body.login || el.email === body.email)) {
    fetch(`https://${process.env.KEY}.mockapi.io/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: body.login,
        password: body.password,
        email: body.email,
        id: users.length > 0 ? users[users.length - 1].id : 0,
      }),
    });

    res.send("Success");
  } else {
    res.send("User with such username or email already exists!");
  }
});

app.listen(port, () => console.log("Listening"));
