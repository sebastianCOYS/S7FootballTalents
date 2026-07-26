require("dotenv").config();

//incliding some neccesary files/modules
const express = require('express');
const playerRoutes = require('./routes/players');
const advancedSearchRoutes = require('./routes/AdvancedSearch');
const ai = require('./routes/ai');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { createHttpError } = require('./utils/httpError');
//initializing the express app
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

//to prevent 1 shared IP limit pool of all users going through the LiteSpeed server.
app.set("trust proxy", 1);
const API_BASE = process.env.API_BASE || "";
//extra security
app.use(helmet());
//For security reasons, none of my usecases require more than 32kb
app.use(express.json({ limit: "32kb" }));

const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method !== "POST",
  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        message: "You have reached your request limit, try again later.",
        details: {
          retryAfterSeconds: 60,
        }
      }
    });
  }
});
const playerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, limit: 200, standardHeaders: true, legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({ error: { code: "RATE_LIMIT_EXCEEDED", message: "You have reached your request limit, try again later.", details: { retryAfterSeconds: 60 } } });
  }
});
//because of cors allow origin problem (Adds headers: Access-Control-Allow-Origin: *)
app.use(cors({ origin: process.env.FRONTEND_URL }));
//root route (tells us what shows up in the root of the site)
//just some info about the API
app.get(API_BASE + '/', (req, res) => {
  res.status(200).json({
    data: {
      name: "S7ANALYZE API",
      version: 0.2,
      endpoints: {
        "GET /players": "List, filter, sort, and paginate players",
        "GET /players/:rk": "Retrieve one player by rank ID",
        "POST /ai": "Generate a player analysis",
        "POST /ai/comparison": "Generate a player comparison",
      }
    }
  });
});

//player collection and detail routes
app.use(API_BASE + '/players', playerLimiter);
app.use(API_BASE + '/players', advancedSearchRoutes);
app.use(API_BASE + '/players', playerRoutes);
app.use(API_BASE + '/ai', aiLimiter);
app.use(API_BASE + '/ai', ai);

app.use((req, res, next) => {
  next(createHttpError(404, "ROUTE_NOT_FOUND", `Route ${req.method} ${req.path} was not found`));
});

//middleware to handle errors
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
//for testing purposes, without unnecesary server startups. just convenience...
if (require.main === module) {
  app.listen(PORT);
}

module.exports = app;
