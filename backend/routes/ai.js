  const express = require("express");
  const { GoogleGenAI } = require("@google/genai");
  const router = express.Router();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  router.post("/", async (req, res, next) => {
    
    try {
      const response = await ai.models.generateContent({
        model: "gemma-3-27b-it",
        contents:
          `You are a strict data generator. RULES: Do NOT include introductions. Do NOT say "here is", "here\'s", "sure", "of course", or similar phrases, Tasks: 1. Give him a fitting nickname. 2. Give him an overall rating out of 99. 3. Write a 40 to 50 word scouting summary. Be precise, include nuanced observations, based on the given statistics. CRITICAL FORMATTING INSTRUCTION: Respond ONLY with a valid JSON object containing exactly these keys: 'nickname', 'rating', 'transferValue', 'summary'. Return the JSON as a raw string. Do NOT wrap the output in markdown code blocks, backticks, or the word 'json'. footballer: ${req.body.player.Player} , position:  ${req.body.player.Pos}, Team:  ${req.body.player.Squad}, Age:  ${req.body.player.Age}, Goals:  ${req.body.player.Gls}, Assists:  ${req.body.player.Ast}, Minutes played:  ${req.body.player.Min}, Matches played: ${req.body.player.MP},   expected Goals(xG):  ${req.body.player.xG}, expected assists(xA):  ${req.body.player.xA}, Errors leading to a goals: ${req.body.player.Err}, ball recoveries: ${req.body.player.Recov} Tackles attempted:  ${req.body.player.Tkl}, successful Tackles:  ${req.body.player.TklW}, Blocks:  ${req.body.player.Blocks}, Interceptions:  ${req.body.player.Int}, Clearances:  ${req.body.player.Clr}, Progressive passes: ${req.body.player.PrgP}, Progressive Dribbles: ${req.body.player.PrgC}, Yellow Cards: ${req.body.player.CrdY}, Red Cards: ${req.body.player.CrdR}  `,
      });

      try {
        const parsedAiResponse = JSON.parse(response.text.replace(/```json|```/g, "").trim());
          res.json({ 
        success: true,
        data: {
        nickname: parsedAiResponse.nickname || "unknown",
        rating: parsedAiResponse.rating || "unknown",
        summary: parsedAiResponse.summary || "unknown",
        apiLimitReached: false,
        }
        
      });
      } catch {
          res.json({ 
        success: true,
        data: {
        nickname: "unknown",
        rating: "unknown",
        summary: "unknown",
        apiLimitReached: false,
        }
       
      });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post("/comparison", async(req, res, next) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemma-3-27b-it",
        contents:
          `You are a strict data generator. RULES: Do NOT include introductions. Do NOT say "here is", "here\'s", "sure", "of course", or similar phrases. 3.  Compare these 2 footballers, footballerX and footballerY. Tasks: 1. Give them a creative, fitting nickname. 2. Give them each an overall rating out of 99. 3. Write a 40 to 50 word scouting summary of how they stack up to each other. CRITICAL FORMATTING INSTRUCTION: Respond ONLY with a valid JSON object containing exactly these keys: 'nicknameX', 'ratingX', 'nicknameY', 'ratingY' and 'summary'. X represents the first player, Y represents the other player.  Return the JSON as a raw string. footballerX: ${req.body.playerX.Player} , position:  ${req.body.playerX.Pos}, Team:  ${req.body.playerX.Squad}, Age:  ${req.body.playerX.Age}, Goals:  ${req.body.playerX.Gls}, Assists:  ${req.body.playerX.Ast}, Minutes played:  ${req.body.playerX.Min}, Matches played: ${req.body.playerX.MP},   expected Goals(xG):  ${req.body.playerX.xG}, expected assists(xA):  ${req.body.playerX.xA}, Errors leading to a goals: ${req.body.playerX.Err}, ball recoveries: ${req.body.playerX.Recov} Tackles attempted:  ${req.body.playerX.Tkl}, successful Tackles:  ${req.body.playerX.TklW}, Blocks:  ${req.body.playerX.Blocks}, Interceptions:  ${req.body.playerX.Int}, Clearances:  ${req.body.playerX.Clr}, Progressive passes: ${req.body.playerX.PrgP}, Progressive Dribbles: ${req.body.playerX.PrgC}, Yellow Cards: ${req.body.playerX.CrdY}, Red Cards: ${req.body.playerX.CrdR}, footballerY: ${req.body.playerY.Player} , position:  ${req.body.playerY.Pos}, Team:  ${req.body.playerY.Squad}, Age:  ${req.body.playerY.Age}, Goals:  ${req.body.playerY.Gls}, Assists:  ${req.body.playerY.Ast}, Minutes played:  ${req.body.playerY.Min}, Matches played: ${req.body.playerY.MP},   expected Goals(xG):  ${req.body.playerY.xG}, expected assists(xA):  ${req.body.playerY.xA}, Errors leading to a goals: ${req.body.playerY.Err}, ball recoveries: ${req.body.playerY.Recov} Tackles attempted:  ${req.body.playerY.Tkl}, successful Tackles:  ${req.body.playerY.TklW}, Blocks:  ${req.body.playerY.Blocks}, Interceptions:  ${req.body.playerY.Int}, Clearances:  ${req.body.playerY.Clr}, Progressive passes: ${req.body.playerY.PrgP}, Progressive Dribbles: ${req.body.playerY.PrgC}, Yellow Cards: ${req.body.playerY.CrdY}, Red Cards: ${req.body.playerY.CrdR}  `,
      });
      try {
        const parsedAiResponse = JSON.parse(response.text.replace(/```json|```/g, "").trim());
          res.json({ 
        success: true,
        data: {
        summary: parsedAiResponse.summary || "unknown",
        nicknameX: parsedAiResponse.nicknameX || "unknown",
        ratingX: parsedAiResponse.ratingX || "unknown",
        nicknameY: parsedAiResponse.nicknameY || "unknown",
        ratingY: parsedAiResponse.ratingY || "unknown",

        apiLimitReached: false,
        }
        
      })} catch {
        next(error);
      }
    } catch(error) {
      next(error);
    }
  });

  module.exports = router;