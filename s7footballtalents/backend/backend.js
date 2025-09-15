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
    res.sendStatus(200);
})

app.use('/players', playerRoutes);
app.use('/search', customSearchRoutes );
initDb().then(() => {
  app.listen(3000); 
})
