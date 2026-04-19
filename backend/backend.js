//incliding some neccesary files/modules
const express = require('express');
const playerRoutes = require('./routes/players');
const customSearchRoutes = require('./routes/customSearch');
const ai = require('./routes/ai');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');  
//initializing the express app
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();
//extra security
app.use(helmet());
app.use(express.json());

const AiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    data: {
      nickname: "unknown",
      rating: "unknown",
      summary: "you have reached your per/minute request limit, try again later.",
      apiLimitReached: true,
    }
  }
})
//because of cors allow origin problem (Adds headers: Access-Control-Allow-Origin: *)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
//root route (tells us what shows up in the root of the site)
//just some info about the API
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

//middleware to handle errors
app.use(errorHandler);
//limiters
app.use('/s7api/ai', AiLimiter );
//defininng new 
app.use('/s7api/players', playerRoutes);
app.use('/s7api/search', customSearchRoutes );
app.use('/s7api/ai', ai );

// Get port from environment or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`S7 Football Talents API running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
}); 
