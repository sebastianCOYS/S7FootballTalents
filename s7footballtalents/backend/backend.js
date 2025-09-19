const express = require('express');
const { initDb } = require('./db');
const playerRoutes = require('./routes/players');
const customSearchRoutes = require('./routes/customSearch');
const cors = require('cors');
const app = express();


//because of cors allow origin problem
app.use(cors());
//root route
app.get('/', (req, res) => {
    res.status(200).json({
      message: "s7footballtalents api",
      version: 0.1,
      endpoints: {
        "/players/rk/:rk" : "GET player info by rk",
        "/players/name/:name" : "GET players by name search (partial names allowed)",
        "/search?age=20&mp=100&gls=10" : "Custom search with many parameters, all optional"
      }
    });
})

app.use('/players', playerRoutes);
app.use('/search', customSearchRoutes );
initDb().then(() => {
  app.listen(3000); 
})
