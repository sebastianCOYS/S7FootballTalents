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
      summary: "You have reached your request limit, try again later.",
      apiLimitReached: true,
    }
  }
})
//because of cors allow origin problem (Adds headers: Access-Control-Allow-Origin: *)
app.use(cors({origin: process.env.FRONTEND_URL}));
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

const API_BASE = process.env.API_BASE || "";
//defininng new 
app.use(API_BASE+'/players', playerRoutes);
app.use(API_BASE+'/search', customSearchRoutes );
app.use(API_BASE+'/ai', AiLimiter );
app.use(API_BASE+'/ai', ai );
//middleware to handle errors
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT); 
