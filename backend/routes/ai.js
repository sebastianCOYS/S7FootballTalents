const express = require("express");
const Groq = require("groq-sdk");
const { createHttpError } = require("../utils/httpError");
const { parseComparisonResponse, parsePlayerAnalysisResponse } = require("../utils/aiResponseValidation");
const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function requirePlayer(value, parameter) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw createHttpError(400, "INVALID_REQUEST_BODY", `${parameter} must be a player object`, { parameter });
  }
}

router.post("/", async (req, res, next) => {
  try {
    requirePlayer(req.body?.player, "player");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `
You are a skeptical football scouting analyst.

Your job is not to praise the player. Your job is to extract useful scouting meaning from the statistical profile.

Return ONLY valid JSON.
Do not use markdown.
Do not include an introduction.
Do not include explanations outside the JSON.

CORE ANALYSIS RULES:
- Interpret all stats relative to the player's position, age, minutes, and matches played.
- Mentally account for playing time. A player with fewer minutes should not be judged only by raw totals.
- Do not overrate high raw totals if the player has played many minutes.
- Do not overrate small samples from low-minute players.
- Do not describe isolated stats unless they are unusually strong, unusually weak, or important for the player's position.
- Prioritize second-order insights created by relationships between stats.
- Use cautious language: "suggests", "points to", "profiles as", "may indicate", "is consistent with".
- Include caveats where a stat can have multiple explanations.
- Do not invent traits such as pace, mentality, leadership, strength, technique, injury history, tactical intelligence, or work rate.
- Do not use hype language or scouting clichés.
- Do not force positivity. If the profile is limited, say so clearly.
- Mathematical accuracy rule: Goals > xG indicates finishing overperformance/conversion above expectation. Goals < xG indicates finishing underperformance or expected conversion.

SECOND-ORDER INSIGHT EXAMPLES:
- Fouls drawn + progressive carries may suggest a player who wins territory through contact and creates set-piece opportunities.
- Fouls committed + few yellow/red cards may suggest controlled disruption or tactical fouling.
- Fouls committed + many yellow/red cards may suggest discipline risk.
- Recoveries + progressive passes may suggest a ball-winning progressor.
- Interceptions higher than tackles may suggest anticipation-based defending rather than constant dueling.
- High tackles but low tackles won may suggest defensive activity without strong efficiency.
- Progressive passes high but xA low may suggest a buildup progressor rather than a final-ball creator.
- xA high but assists low may suggest chance creation that teammates have not converted.
- Goals much higher than xG may suggest finishing overperformance and possible regression.
- xG higher than goals may suggest good chance-getting but poor finishing or variance.
- High clearances and blocks may suggest deep defensive workload, not automatically elite defending.
- High miscontrols or dispossessions may suggest possession-security risk.
- High recoveries but low progression may suggest ball-winning without much forward value.
- High progression but weak defensive numbers may suggest an attack-first profile.
- High fouls drawn but low progressive carries may suggest pressure relief rather than true ball-carrying threat.
- High progressive carries with high dispossessions may suggest a brave but risky carrier.
- High progressive passes with low assists/xA may suggest value in buildup rather than chance creation.
- High tackles, fouls, and cards together may suggest aggressive defending with disciplinary risk.
- High interceptions, blocks, and clearances may suggest a player who defends space and protects deeper areas.
- High goals with low assists/xA may suggest a finisher rather than a creator.
- High assists/xA with low goals/xG may suggest a creator rather than a scorer.

BANNED PHRASES:
"silky", "maestro", "magic", "ghosts between lines", "complete player", "natural talent", "world-class", "generational", "engine", "starboy", "dictates play", "rising star", "raw talent", "electric", "unstoppable".

OUTPUT JSON:
Return exactly this JSON object:
{
  "profileTag": string,
  "insights": [
    {
      "label": string,
      "evidence": string,
      "interpretation": string
    }
  ],
  "roleFit": string,
  "summary": string
}

PROFILE TAG:
- Short analytical label.
- Based on the statistical profile, not personality or hype.
- Examples of acceptable style: "Controlled Disruptor", "Contact Carrier", "Buildup Progressor", "Box-Risk Finisher", "Recovery Link", "Deep Workload Defender".

INSIGHTS:
- Provide 3 insights.
- Each insight must be based on evidence from the provided stats.
- At least one insight should be a second-order insight, not just a single-stat observation.
- Evidence should mention the actual relevant stat names and values.


ROLE FIT:
- Explain what type of tactical role the statistical profile appears suited for.
- Do not mention formations unless clearly supported.
- Keep it to one sentence.

SUMMARY:
- Write 60-80 words.
- Must include atleast one clear strength.
- Must include atleast two hidden or non-obvious insight.
- Must include atleast one limitation, risk, or uncertainty.
- Must reference at least two specific stats from the data.
- Do not simply say the player is good, talented, creative, dynamic, or promising.
- Explain what the numbers suggest about how he actually provides value.

PLAYER CONTEXT:
Name: ${req.body.player.Player}
Position: ${req.body.player.Pos}
Team: ${req.body.player.Squad}
Age: ${req.body.player.Age}
Minutes: ${req.body.player.Min}
Matches played: ${req.body.player.MP}

ATTACKING:
Goals: ${req.body.player.Gls}
Assists: ${req.body.player.Ast}
xG: ${req.body.player.xG}
non penalty xG: ${req.body.player.npxG}
xA: ${req.body.player.xA}

PROGRESSION:
Progressive passes: ${req.body.player.PrgP}
Progressive carries: ${req.body.player.PrgC}
Carries: ${req.body.player.Carries}
Progressive passes received: ${req.body.player.PrgR}

DEFENDING:
Recoveries: ${req.body.player.Recov}
Tackles attempted: ${req.body.player.Tkl}
Tackles won: ${req.body.player.TklW}
  Blocks: ${req.body.player.Blocks_stats_defense}
Interceptions: ${req.body.player.Int}
Clearances: ${req.body.player.Clr}
Errors: ${req.body.player.Err}

FOULS AND DISCIPLINE:
  Fouls drawn: ${req.body.player.Fld_stats_misc}
Fouls committed: ${req.body.player.Fls}
Yellow cards: ${req.body.player.CrdY}
Red cards: ${req.body.player.CrdR}

POSSESSION SECURITY:
Miscontrols: ${req.body.player.Mis}
Dispossessed: ${req.body.player.Dis}


Shots: ${req.body.player.Sh}
Shots on target: ${req.body.player.SoT}
Shot distance: ${req.body.player.Dist}
Key passes: ${req.body.player.KP}
Passes into penalty area: ${req.body.player.PPA}
Crosses into penalty area: ${req.body.player.CrsPA}
Crosses: ${req.body.player.Crs}
Touches: ${req.body.player.Touches}
Touches in attacking penalty area: ${req.body.player["Att Pen"]}
Carries into penalty area: ${req.body.player.CPA}
Aerial duels won: ${req.body.player.Won}
  Aerial duels lost: ${req.body.player.Lost_stats_misc}
`,
        },
      ],
    });

    try {
      const parsedAiResponse = parsePlayerAnalysisResponse(response.choices[0]?.message?.content);
      res.json({
        data: {
          ...parsedAiResponse,
          apiLimitReached: false,
        },
      });
    } catch {
      return next(createHttpError(502, "INVALID_AI_RESPONSE", "AI provider returned an invalid response"));
    }
  } catch (error) {
    next(error);
  }
});

router.post("/comparison", async (req, res, next) => {
  try {
    requirePlayer(req.body?.playerX, "playerX");
    requirePlayer(req.body?.playerY, "playerY");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `
You are a skeptical football scouting analyst.

Your job is not to praise the player. Your job is to extract useful scouting meaning from the statistical profile.

Return ONLY valid JSON.
Do not use markdown.
Do not include an introduction.
Do not include explanations outside the JSON.

CORE ANALYSIS RULES:
- Interpret all stats relative to the player's position, age, minutes, and matches played.
- Mentally account for playing time. A player with fewer minutes should not be judged only by raw totals.
- Do not overrate high raw totals if the player has played many minutes.
- Do not overrate small samples from low-minute players.
- Do not describe isolated stats unless they are unusually strong, unusually weak, or important for the player's position.
- Prioritize second-order insights created by relationships between stats.
- Use cautious language: "suggests", "points to", "profiles as", "may indicate", "is consistent with".
- Include caveats where a stat can have multiple explanations.
- Do not invent traits such as pace, mentality, leadership, strength, technique, injury history, tactical intelligence, or work rate.
- Do not use hype language or scouting clichés.
- Do not force positivity. If the profile is limited, say so clearly.

BANNED PHRASES:
"silky", "maestro", "magic", "ghosts between lines", "complete player", "natural talent", "world-class", "generational", "engine", "starboy", "dictates play", "rising star", "raw talent", "electric", "unstoppable".

OUTPUT JSON:
Return exactly this JSON object:
{
  "summary": string
}

SUMMARY:
- Write 80-100 words.
- Compare Player X and Player Y directly, not as two separate scouting reports.
- Must include at least one clear advantage for each player, if supported by the data.
- Must include at least one hidden or non-obvious difference between their profiles.
- Must include at least one limitation, risk, or uncertainty for one or both players.
- Must reference at least three specific stats from the data across both players.
- Do not simply say either player is better, talented, creative, dynamic, or promising.
- Explain what the numbers suggest about how each player provides value differently.
- If one player has fewer minutes or matches, mention sample-size caution.
- Avoid declaring a winner unless the statistical gap is clear.
- Mention how they differ in their ideal system fit.

PLAYER X CONTEXT:
Name: ${req.body.playerX.Player}
Position: ${req.body.playerX.Pos}
Team: ${req.body.playerX.Squad}
Age: ${req.body.playerX.Age}
Minutes: ${req.body.playerX.Min}
Matches played: ${req.body.playerX.MP}

ATTACKING of Player X:
Goals: ${req.body.playerX.Gls}
Assists: ${req.body.playerX.Ast}
xG: ${req.body.playerX.xG}
non penalty xG: ${req.body.playerX.npxG}
xA: ${req.body.playerX.xA}

PROGRESSION of Player X:
Progressive passes: ${req.body.playerX.PrgP}
Progressive carries: ${req.body.playerX.PrgC}
Carries: ${req.body.playerX.Carries}
Progressive passes received: ${req.body.playerX.PrgR}

DEFENDING of Player X:
Recoveries: ${req.body.playerX.Recov}
Tackles attempted: ${req.body.playerX.Tkl}
Tackles won: ${req.body.playerX.TklW}
  Blocks: ${req.body.playerX.Blocks_stats_defense}
Interceptions: ${req.body.playerX.Int}
Clearances: ${req.body.playerX.Clr}
Errors: ${req.body.playerX.Err}

FOULS AND DISCIPLINE of Player X:
  Fouls drawn: ${req.body.playerX.Fld_stats_misc}
Fouls committed: ${req.body.playerX.Fls}
Yellow cards: ${req.body.playerX.CrdY}
Red cards: ${req.body.playerX.CrdR}

POSSESSION SECURITY of Player X:
Miscontrols: ${req.body.playerX.Mis}
Dispossessed: ${req.body.playerX.Dis}

More statistics of Player X:
Shots: ${req.body.playerX.Sh}
Shots on target: ${req.body.playerX.SoT}
Shot distance: ${req.body.playerX.Dist}
Key passes: ${req.body.playerX.KP}
Passes into penalty area: ${req.body.playerX.PPA}
Crosses into penalty area: ${req.body.playerX.CrsPA}
Crosses: ${req.body.playerX.Crs}
Touches: ${req.body.playerX.Touches}
Touches in attacking penalty area: ${req.body.playerX["Att Pen"]}
Carries into penalty area: ${req.body.playerX.CPA}
Aerial duels won: ${req.body.playerX.Won}
  Aerial duels lost: ${req.body.playerX.Lost_stats_misc}

PLAYER Y CONTEXT:
Name: ${req.body.playerY.Player}
Position: ${req.body.playerY.Pos}
Team: ${req.body.playerY.Squad}
Age: ${req.body.playerY.Age}
Minutes: ${req.body.playerY.Min}
Matches played: ${req.body.playerY.MP}

ATTACKING of Player Y:
Goals: ${req.body.playerY.Gls}
Assists: ${req.body.playerY.Ast}
xG: ${req.body.playerY.xG}
non penalty xG: ${req.body.playerY.npxG}
xA: ${req.body.playerY.xA}

PROGRESSION of Player Y:
Progressive passes: ${req.body.playerY.PrgP}
Progressive carries: ${req.body.playerY.PrgC}
Carries: ${req.body.playerY.Carries}
Progressive passes received: ${req.body.playerY.PrgR}

DEFENDING of Player Y:
Recoveries: ${req.body.playerY.Recov}
Tackles attempted: ${req.body.playerY.Tkl}
Tackles won: ${req.body.playerY.TklW}
  Blocks: ${req.body.playerY.Blocks_stats_defense}
Interceptions: ${req.body.playerY.Int}
Clearances: ${req.body.playerY.Clr}
Errors: ${req.body.playerY.Err}

FOULS AND DISCIPLINE of Player Y:
  Fouls drawn: ${req.body.playerY.Fld_stats_misc}
Fouls committed: ${req.body.playerY.Fls}
Yellow cards: ${req.body.playerY.CrdY}
Red cards: ${req.body.playerY.CrdR}

POSSESSION SECURITY of Player Y:
Miscontrols: ${req.body.playerY.Mis}
Dispossessed: ${req.body.playerY.Dis}

More statistics of Player Y:
Shots: ${req.body.playerY.Sh}
Shots on target: ${req.body.playerY.SoT}
Shot distance: ${req.body.playerY.Dist}
Key passes: ${req.body.playerY.KP}
Passes into penalty area: ${req.body.playerY.PPA}
Crosses into penalty area: ${req.body.playerY.CrsPA}
Crosses: ${req.body.playerY.Crs}
Touches: ${req.body.playerY.Touches}
Touches in attacking penalty area: ${req.body.playerY["Att Pen"]}
Carries into penalty area: ${req.body.playerY.CPA}
Aerial duels won: ${req.body.playerY.Won}
  Aerial duels lost: ${req.body.playerY.Lost_stats_misc}
`,
        },
      ],
    });

    try {
      const parsedAiResponse = parseComparisonResponse(response.choices[0]?.message?.content);
      res.json({
        data: {
          ...parsedAiResponse,
          apiLimitReached: false,
        },
      });
    } catch {
      return next(createHttpError(502, "INVALID_AI_RESPONSE", "AI provider returned an invalid response"));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
