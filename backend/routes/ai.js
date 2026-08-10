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

function show(value) {
  if (value === null || value === undefined || value === "") return "unavailable";
  return value;
}

function percentile(value) {
  const number = Number(value);
  if (value === null || value === undefined || !Number.isFinite(number)) return "unavailable";
  return Math.round(number);
}

function calculatePer90(player, value) {
  const number = Number(value);
  const minutes = Number(player.Min);

  if (value === null || value === undefined || !Number.isFinite(number) || !Number.isFinite(minutes) || minutes <= 0) return "unavailable";

  return (number * 90 / minutes).toFixed(2);
}

function calculatePer100Touches(player, value) {
  const number = Number(value);
  const touches = Number(player.Touches);

  if (value === null || value === undefined || !Number.isFinite(number) || !Number.isFinite(touches) || touches <= 0) return "unavailable";

  return (number * 100 / touches).toFixed(2);
}

function percentage(value, total) {
  const number = Number(value);
  const denominator = Number(total);

  if (value === null || value === undefined || total === null || total === undefined || !Number.isFinite(number) || !Number.isFinite(denominator) || denominator <= 0) return "unavailable";

  return ((number / denominator) * 100).toFixed(1);
}

router.post("/", async (req, res, next) => {
  try {
    requirePlayer(req.body?.player, "player");
    const player = req.body.player;
    const per90 = (value) => calculatePer90(player, value);
    const per100Touches = (value) => calculatePer100Touches(player, value);
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `
You are a skeptical, evidence-first football scouting analyst.

Use only the statistics provided in this prompt. Do not use the player's reputation, previous seasons, real-world knowledge or assumptions based on their club.

Return ONLY valid JSON.
Do not use markdown.
Do not include an introduction.
Do not include text outside the JSON.

SAMPLE-SIZE RULES:
- Percentiles are calculated using players with at least 900 FBref minutes.
- Players with fewer than 900 minutes are not ranked.
- Players with 900 to 1,499 minutes are ranked but have a limited sample.
- Players with at least 1,500 minutes have an established sample.
- If the player has fewer than 900 minutes, do not assign a tactical profile.
- For a player below 900 minutes:
  - Set profileTag to "Insufficient Sample".
  - Explain that the per-90 rates are unstable because of the limited minutes.
  - Do not describe any statistic as a reliable strength or weakness.
  - Do not infer possession security from zero miscontrols, dispossessions, errors or other rare events.
  - Set roleFit to one sentence explaining that a tactical role cannot be assigned reliably.
  - Still return exactly three insights, focused on the limited sample, unstable rates and absence of eligible percentiles.
- For a player with 900 to 1,499 minutes, provide a normal analysis but explicitly describe the conclusions as provisional in the summary.
- Do not call a 900-to-1,499-minute player an insufficient sample.

DATA PRIORITY:
1. Use position percentiles as the primary comparison because football statistics are role-dependent.
2. Use league and overall percentiles as secondary context.
3. Prefer per-90 rates, per-touch rates, percentages and percentiles over raw totals.
4. Raw totals may only provide sample context.
5. Do not describe an unbenchmarked rate as high, low, strong, weak, safe or risky.
6. An unbenchmarked rate may describe how frequently an action occurred, but not how the player ranks against peers.
7. Higher percentile means more of the measured action, not automatically better performance.
8. Round percentile references to whole numbers.
9. Never write decimal ordinals such as "74.2nd".

PERCENTILE ELIGIBILITY:
- Every supplied percentile except non-penalty xG per shot uses the 900-minute minimum.
- Non-penalty xG per shot percentiles additionally require at least 10 Understat shots.
- If the player has fewer than 10 Understat shots, ignore non-penalty xG per shot completely, even if its raw value is supplied.
- Ignore unavailable, null or undefined percentiles completely.
- Do not mention that a statistic or percentile is unavailable.

GENERAL ANALYSIS RULES:
- Interpret every statistic relative to the player's position, minutes, matches and likely statistical role.
- Ignore unavailable, null or undefined statistics completely.
- Prioritize relationships between related statistics over isolated observations.
- At least two insights must cite per-90 rates, percentiles, per-touch rates or percentages.
- At least one insight must combine two or more related metrics.
- At least one insight must identify the player's defining method of involvement, such as carrying, progression, creation, box threat, buildup or defending.
- Do not make all three insights variations of attacking output.
- Do not repeat the same conclusion across the insights and summary.
- Separate production from playing style. Recording more of an action does not automatically mean performing it efficiently.
- Use cautious language such as "suggests", "points to", "profiles as", "may indicate" and "is consistent with".
- Include alternative explanations when position, workload or team style could affect a statistic.
- Do not infer pace, strength, mentality, leadership, technique, tactical intelligence, work rate or injury history.
- Do not infer a team's tactical system unless the supplied statistics directly support it.
- Do not turn a statistical observation into coaching advice.
- Do not say a player "needs to improve" something.
- Do not invent causal explanations for statistical relationships.
- Do not call two statistical tendencies a trade-off unless the data establish that one comes at the expense of the other. Otherwise describe their relative emphasis.
- Do not describe a player as possession-secure or possession-risky from miscontrols or dispossessions unless a valid comparison supports that conclusion.
- Do not treat low defensive activity as a weakness without considering position.
- Do not treat high tackles, blocks, clearances or recoveries as automatic evidence of defensive quality. They may reflect workload.
- Base profileTag on the most distinctive combination of supported statistics, not automatically the single highest percentile.
- Do not create redundant profile tags. "Creative Chance Creator" is invalid because the words repeat the same idea.

OUTFIELD INTERPRETATION RULES:
- Non-penalty goals per 90 measures scoring output.
- Non-penalty xG per 90 measures the rate at which the player receives non-penalty scoring opportunities.
- Non-penalty xG per shot measures average chance quality, not finishing ability.
- Low non-penalty xG per shot may reflect shot location, shot selection, role or attacking environment. Do not call it poor finishing.
- High non-penalty xG per shot does not prove clinical finishing.
- Shots on target percentage measures how frequently shots hit the target, not whether the player finishes above expectation.
- Use the supplied non-penalty finishing difference when discussing conversion.
- A positive finishing difference means non-penalty goals exceeded non-penalty xG in this sample.
- A negative finishing difference means non-penalty goals were below non-penalty xG in this sample.
- Never claim goals exceeded expected goals when the finishing difference is negative.
- Never claim goals were below expected goals when the finishing difference is positive.
- Describe a finishing difference as "scored above expected" or "scored below expected" in this sample.
- Do not call a player an efficient finisher, clinical finisher or strong finisher based only on a positive finishing difference.
- Do not describe finishing overperformance as a permanent skill or guarantee regression.
- Avoid the profileTag "Clinical Finisher" unless scoring output is strong and multiple supplied finishing measures support it.
- High scoring output with a negative finishing difference is better described as high-volume chance-getting or box finishing.
- Expected assists per 90 measures the quality of chances created.
- Key passes per 90 measures chance-creation frequency.
- Assists per 90 can be affected by teammate conversion and variance.
- Progressive passes per 90 combined with expected assists may distinguish buildup progression from final-ball creation.
- Progressive carries, successful take-ons and fouls drawn may support a carrying profile.
- Progressive carries combined with per-touch losses may describe a direct carrying style, but do not call it risky without a benchmark.
- xGChain measures involvement in attacking possessions that generate expected goals.
- xGBuildup excludes the player's own shots and key passes and measures involvement before the final action.
- High xGChain does not prove individual creativity.
- High xGBuildup does not prove passing quality.
- Low xGBuildup for a forward is not automatically a weakness.
- Low xGBuildup does not prove that a player cannot create chances. Use expected assists and key passes for creation.
- Aerial win percentage describes duel outcomes. It does not prove strength or dominance without positional context.

GOALKEEPER INTERPRETATION RULES:
- If the first-listed position is GK, use only the goalkeeper data supplied below.
- Do not use outfield attacking, progression, possession or aerial-duel statistics to evaluate a goalkeeper.
- Do not use key passes, xGChain or xGBuildup to label a goalkeeper as a distribution specialist.
- Save percentage and goals against per 90 are affected by shot quality and the defensive environment.
- PSxG +/- estimates goals prevented or conceded relative to post-shot expected goals.
- A positive PSxG +/- indicates above-expectation shot stopping in this sample.
- A negative PSxG +/- indicates below-expectation shot stopping in this sample.
- PSxG per shot on target describes the average difficulty of shots faced, not goalkeeper quality.
- Launched-pass completion, launch percentage and average pass length describe distribution tendencies. They do not alone prove distribution quality.
- Cross-stop percentage measures intervention on crosses. Do not replace it with aerial-duel statistics.
- Defensive actions outside the penalty area per 90 and their average distance describe sweeping activity.
- Do not infer pace, bravery, decision-making or command of the area from goalkeeper statistics.
- Without goalkeeper percentiles, describe the values and their relationships without claiming they are elite, poor, high or low compared with other goalkeepers.
- For an eligible goalkeeper, prioritize shot stopping, distribution and either cross management or sweeping for the three insights.

USEFUL OUTFIELD RELATIONSHIPS:
- Non-penalty goals per 90 + non-penalty xG per 90 + finishing difference provides scoring and conversion context.
- Shots per 90 + non-penalty xG per shot separates shooting frequency from average chance quality.
- Expected assists per 90 + key passes per 90 separates chance quality from chance-creation frequency.
- Assists per 90 + expected assists per 90 provides teammate-conversion and variance context.
- xGChain per 90 + xGBuildup per 90 separates total attacking-sequence involvement from earlier buildup involvement.
- Progressive passes per 90 + expected assists per 90 may separate buildup progression from final-ball creation.
- Progressive carries per 90 + successful take-ons per 90 + fouls drawn per 90 may identify a carrying or pressure-relief role.
- Crosses per 90 + crosses into the penalty area per 90 may identify wide delivery involvement.
- Tackles + interceptions + blocks + recoveries should be interpreted together and relative to position.

BANNED PHRASES:
"silky", "maestro", "magic", "ghosts between lines", "complete player", "natural talent", "world-class", "generational", "engine", "starboy", "dictates play", "rising star", "raw talent", "electric", "unstoppable".

OUTPUT:
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
- Use a short analytical label of two to four words.
- Base it only on the supplied statistical evidence.
- Describe the player's statistical role rather than overall quality.
- Examples of acceptable style include "Creative Wide Carrier", "Buildup Progressor", "High-Volume Box Finisher", "Recovery Link", "Attacking Fullback", "Buildup Defender", "Active Sweeper" and "Shot-Stopping Goalkeeper".

INSIGHTS:
- Return exactly three insights.
- Give each insight a short and specific label.
- Evidence must mention the relevant contextual statistics and values.
- Prefer evidence such as "0.36 assists per 90, 92nd position percentile" rather than raw totals.
- Interpretation must explain what the relationship may mean for the player's statistical role.
- Do not use multiple paragraphs inside an evidence or interpretation string.

ROLE FIT:
- Write one concise sentence explaining the tactical role the statistical profile appears suited for.
- Do not mention formations unless directly supported.
- Do not infer the team's current tactical system.
- Do not describe unmeasured personality, intelligence or physical traits.

SUMMARY:
- Write 60 to 80 words.
- Include at least one supported strength.
- Include at least one limitation, relative weakness or meaningful uncertainty.
- Include at least one non-obvious relationship between statistics.
- Reference at least two contextual statistics.
- Do not simply restate the three insights.
- Do not present observed finishing overperformance or underperformance as a permanent trait.
- If the player has 900 to 1,499 minutes, explicitly state that the interpretation is provisional because of the limited sample.

PLAYER CONTEXT:
Name: ${show(player.Player)}
Position: ${show(player.Pos)}
Player type: ${String(player.Pos).split(",")[0].trim() === "GK" ? "GOALKEEPER" : "OUTFIELD"}
Team: ${show(player.Squad)}
Competition: ${show(player.Comp)}
Age: ${show(player.Age)}
Minutes: ${show(player.Min)}
Matches: ${show(player.MP)}
Sample classification: ${Number(player.Min) >= 1500 ? "ESTABLISHED SAMPLE — at least 1,500 minutes" : Number(player.Min) >= 900 ? "LIMITED SAMPLE — 900 to 1,499 minutes" : "INSUFFICIENT SAMPLE — fewer than 900 minutes"}

${String(player.Pos).split(",")[0].trim() === "GK" ? `
GOALKEEPER DATA:

SHOT STOPPING:
Goals against per 90: ${show(player.GA90)}
Save percentage: ${show(player["Save%"])}
Post-shot expected goals: ${show(player.PSxG)}
Post-shot expected goals per shot on target: ${show(player["PSxG/SoT"])}
PSxG +/-: ${show(player["PSxG+/-"])}
PSxG +/- per 90: ${show(player["/90"])}
Clean-sheet percentage: ${show(player["CS%"])}
Shots on target faced: ${show(player.SoTA)}
Saves: ${show(player.Saves)}

DISTRIBUTION:
Completed launched passes: ${show(player.Cmp_stats_keeper_adv)}
Attempted launched passes: ${show(player.Att_stats_keeper_adv)}
Launched-pass completion percentage: ${show(player["Cmp%_stats_keeper_adv"])}
Passes attempted excluding goal kicks: ${show(player["Att (GK)"])}
Throws attempted: ${show(player.Thr)}
Launch percentage: ${show(player["Launch%"])}
Average pass length: ${show(player.AvgLen)}

CROSS MANAGEMENT:
Crosses faced: ${show(player.Opp)}
Crosses stopped: ${show(player.Stp)}
Cross-stop percentage: ${show(player["Stp%"])}

SWEEPING:
Defensive actions outside the penalty area: ${show(player["#OPA"])}
Defensive actions outside the penalty area per 90: ${show(player["#OPA/90"])}
Average distance of defensive actions: ${show(player.AvgDist)}
` : `
OUTFIELD DATA:

CONTEXTUAL ATTACKING METRICS:

Non-penalty goals per 90: ${show(player.us_npg_per90)}
Percentiles: position ${percentile(player.us_npg_per90_percentile_position)}, league ${percentile(player.us_npg_per90_percentile_league)}, overall ${percentile(player.us_npg_per90_percentile_overall)}

Non-penalty xG per 90: ${show(player.us_npxG_per90)}
Percentiles: position ${percentile(player.us_npxG_per90_percentile_position)}, league ${percentile(player.us_npxG_per90_percentile_league)}, overall ${percentile(player.us_npxG_per90_percentile_overall)}

Non-penalty finishing difference per 90, calculated as non-penalty goals minus non-penalty xG: ${player.us_npg_per90 === null || player.us_npg_per90 === undefined || player.us_npxG_per90 === null || player.us_npxG_per90 === undefined || !Number.isFinite(Number(player.us_npg_per90)) || !Number.isFinite(Number(player.us_npxG_per90)) ? "unavailable" : (Number(player.us_npg_per90) - Number(player.us_npxG_per90)).toFixed(4)}

xG per 90: ${show(player.us_xG_per90)}
Percentiles: position ${percentile(player.us_xG_per90_percentile_position)}, league ${percentile(player.us_xG_per90_percentile_league)}, overall ${percentile(player.us_xG_per90_percentile_overall)}

Assists per 90: ${show(player.us_assists_per90)}
Percentiles: position ${percentile(player.us_assists_per90_percentile_position)}, league ${percentile(player.us_assists_per90_percentile_league)}, overall ${percentile(player.us_assists_per90_percentile_overall)}

Expected assists per 90: ${show(player.us_xA_per90)}
Percentiles: position ${percentile(player.us_xA_per90_percentile_position)}, league ${percentile(player.us_xA_per90_percentile_league)}, overall ${percentile(player.us_xA_per90_percentile_overall)}

Key passes per 90: ${show(player.us_key_passes_per90)}
Percentiles: position ${percentile(player.us_key_passes_per90_percentile_position)}, league ${percentile(player.us_key_passes_per90_percentile_league)}, overall ${percentile(player.us_key_passes_per90_percentile_overall)}

Shots per 90: ${show(player.us_shots_per90)}
Understat shots: ${show(player.us_shots)}
Percentiles: position ${percentile(player.us_shots_per90_percentile_position)}, league ${percentile(player.us_shots_per90_percentile_league)}, overall ${percentile(player.us_shots_per90_percentile_overall)}

Non-penalty xG per shot eligibility: ${Number(player.us_shots) >= 10 ? "ELIGIBLE — at least 10 Understat shots" : "INELIGIBLE — fewer than 10 Understat shots"}
Non-penalty xG per shot: ${show(player.us_npxG_per_shot)}
Percentiles: position ${percentile(player.us_npxG_per_shot_percentile_position)}, league ${percentile(player.us_npxG_per_shot_percentile_league)}, overall ${percentile(player.us_npxG_per_shot_percentile_overall)}

xGChain per 90: ${show(player.us_xGChain_per90)}
Percentiles: position ${percentile(player.us_xGChain_per90_percentile_position)}, league ${percentile(player.us_xGChain_per90_percentile_league)}, overall ${percentile(player.us_xGChain_per90_percentile_overall)}

xGBuildup per 90: ${show(player.us_xGBuildup_per90)}
Percentiles: position ${percentile(player.us_xGBuildup_per90_percentile_position)}, league ${percentile(player.us_xGBuildup_per90_percentile_league)}, overall ${percentile(player.us_xGBuildup_per90_percentile_overall)}

SEASON TOTALS FOR SAMPLE CONTEXT ONLY:
Non-penalty goals: ${show(player.us_npg)}
Assists: ${show(player.us_assists)}
Non-penalty xG: ${show(player.us_npxG)}
Expected assists: ${show(player.us_xA)}

PROGRESSION PER 90:
Progressive passes: ${show(player.prgp_per90)}
Progressive carries: ${show(player.prgc_per90)}
Progressive passes received: ${per90(player.PrgR)}
Passes into the penalty area: ${per90(player.PPA)}
Carries into the penalty area: ${per90(player.CPA)}

CARRYING AND TAKE-ONS:
Carries per 90: ${per90(player.Carries)}
Take-ons attempted per 90: ${per90(player.Att_stats_possession)}
Successful take-ons per 90: ${per90(player.Succ)}
Take-on success percentage: ${show(player["Succ%"])}
Fouls drawn per 90: ${per90(player.Fld_stats_misc)}

POSSESSION:
Touches per 90: ${per90(player.Touches)}
Miscontrols per 90: ${per90(player.Mis)}
Dispossessions per 90: ${per90(player.Dis)}
Miscontrols per 100 touches: ${per100Touches(player.Mis)}
Dispossessions per 100 touches: ${per100Touches(player.Dis)}

WIDE AND FINAL-THIRD INVOLVEMENT:
Crosses per 90: ${per90(player.Crs)}
Crosses into the penalty area per 90: ${per90(player.CrsPA)}
Touches in the attacking penalty area per 90: ${per90(player["Att Pen"])}
Shot-creating actions per 90: ${show(player.SCA90)}
Shots on target per 90: ${show(player["SoT/90"])}
Shot-on-target percentage: ${show(player["SoT%"])}
Average shot distance: ${show(player.Dist)}

DEFENDING PER 90:
Recoveries: ${per90(player.Recov)}
Tackles attempted: ${per90(player.Tkl)}
Tackles won: ${per90(player.TklW)}
Tackle-win percentage: ${percentage(player.TklW, player.Tkl)}
Blocks: ${per90(player.Blocks_stats_defense)}
Interceptions: ${per90(player.Int)}
Clearances: ${per90(player.Clr)}
Errors: ${per90(player.Err)}

DISCIPLINE PER 90:
Fouls committed: ${per90(player.Fls)}
Yellow cards: ${per90(player.CrdY)}
Red cards: ${per90(player.CrdR)}

AERIAL DUELS:
Aerial duels won per 90: ${per90(player.Won)}
Aerial duels lost per 90: ${per90(player.Lost_stats_misc)}
Aerial win percentage: ${percentage(player.Won, Number(player.Won) + Number(player.Lost_stats_misc))}
`}
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
You are a skeptical, evidence-first football scouting analyst.

Use only the statistics provided in this prompt. Do not use either player's reputation, previous seasons, real-world knowledge or assumptions based on their clubs.

Return ONLY valid JSON.
Do not use markdown.
Do not include an introduction.
Do not include text outside the JSON.

SAMPLE-SIZE RULES:

Percentiles are calculated using players with at least 900 FBref minutes.
Players with fewer than 900 minutes are not ranked.
Players with 900 to 1,499 minutes are ranked but have a limited sample.
Players with at least 1,500 minutes have an established sample.
Apply these rules independently to Player X and Player Y.
If a player has fewer than 900 minutes:
Treat that player's per-90 rates as unstable.
Do not describe any statistic as a reliable strength or weakness.
Do not use that player to make confident tactical-role conclusions.
Do not infer possession security from zero miscontrols, dispossessions, errors or other rare events.
Ignore percentiles for that player.
Explicitly mention the sample-size limitation in the summary.
If a player has 900 to 1,499 minutes, comparisons involving that player are allowed but must be described as provisional.
Do not call a 900-to-1,499-minute player an insufficient sample.
If both players have fewer than 900 minutes, make clear that the comparison is highly tentative rather than forcing conclusions.

DATA PRIORITY:

Use position percentiles as the primary benchmark because football statistics are role-dependent.
Use league and overall percentiles as secondary context.
Prefer per-90 rates, per-touch rates, percentages and percentiles over raw totals.
Raw totals may only provide sample context.
Do not describe an unbenchmarked rate as high, low, strong, weak, safe or risky.
An unbenchmarked rate may describe how frequently an action occurred, but not how the player ranks against peers.
Higher percentile means more of the measured action, not automatically better performance.
Round percentile references to whole numbers.
Never write decimal ordinals such as "74.2nd".
When the players have different positions, prioritize each player's position percentile rather than directly comparing raw rates as though their roles were identical.

PERCENTILE ELIGIBILITY:

Every supplied percentile except non-penalty xG per shot uses the 900-minute minimum.
Non-penalty xG per shot percentiles additionally require at least 10 Understat shots for that individual player.
If a player has fewer than 10 Understat shots, ignore that player's non-penalty xG per shot completely, even if its raw value is supplied.
Ignore unavailable, null or undefined percentiles completely.
Do not mention that a statistic or percentile is unavailable.

GENERAL COMPARISON RULES:

Compare Player X and Player Y directly rather than writing two separate scouting reports.
Interpret every statistic relative to each player's position, minutes, matches and likely statistical role.
Ignore unavailable, null or undefined statistics completely.
Mentally account for differences in playing time and sample size.
Do not overrate raw totals from the player with more minutes.
Do not overrate extreme per-90 rates from a small sample.
Prioritize relationships between related statistics over isolated observations.
Separate production from playing style. Recording more of an action does not automatically mean performing it efficiently.
Use cautious language such as "suggests", "points to", "profiles as", "may indicate" and "is consistent with".
Include alternative explanations when position, workload or team environment could affect a statistic.
Do not infer pace, strength, mentality, leadership, technique, tactical intelligence, work rate or injury history.
Do not infer either team's tactical system unless the supplied statistics directly support it.
Do not turn a statistical observation into coaching advice.
Do not say either player "needs to improve" something.
Do not invent causal explanations for statistical relationships.
Do not call two statistical tendencies a trade-off unless the data establish that one comes at the expense of the other. Otherwise describe their relative emphasis.
Do not describe a player as possession-secure or possession-risky from miscontrols or dispossessions unless a valid comparison supports that conclusion.
Do not treat low defensive activity as a weakness without considering position.
Do not treat high tackles, blocks, clearances or recoveries as automatic evidence of defensive quality. They may reflect workload.
Do not simply declare one player better because they lead more categories.
A clear advantage must be tied to a specific statistical dimension.
When positions differ materially, explain the role difference rather than forcing a like-for-like judgment.

OUTFIELD INTERPRETATION RULES:

Non-penalty goals per 90 measures scoring output.
Non-penalty xG per 90 measures the rate at which the player receives non-penalty scoring opportunities.
Non-penalty xG per shot measures average chance quality, not finishing ability.
Low non-penalty xG per shot may reflect shot location, shot selection, role or attacking environment. Do not call it poor finishing.
High non-penalty xG per shot does not prove clinical finishing.
Shots on target percentage measures how frequently shots hit the target, not whether the player finishes above expectation.
Use the supplied non-penalty finishing difference when discussing conversion.
A positive finishing difference means non-penalty goals exceeded non-penalty xG in this sample.
A negative finishing difference means non-penalty goals were below non-penalty xG in this sample.
Never claim goals exceeded expected goals when the finishing difference is negative.
Never claim goals were below expected goals when the finishing difference is positive.
Describe a finishing difference as "scored above expected" or "scored below expected" in this sample.
Do not call a player an efficient finisher, clinical finisher or strong finisher based only on a positive finishing difference.
Do not describe finishing overperformance as a permanent skill or guarantee regression.
High scoring output with a negative finishing difference is better described as high-volume chance-getting or box finishing.
Expected assists per 90 measures the quality of chances created.
Key passes per 90 measures chance-creation frequency.
Assists per 90 can be affected by teammate conversion and variance.
Progressive passes per 90 combined with expected assists may distinguish buildup progression from final-ball creation.
Progressive carries, successful take-ons and fouls drawn may support a carrying profile.
Progressive carries combined with per-touch losses may describe a direct carrying style, but do not call it risky without a benchmark.
xGChain measures involvement in attacking possessions that generate expected goals.
xGBuildup excludes the player's own shots and key passes and measures involvement before the final action.
High xGChain does not prove individual creativity.
High xGBuildup does not prove passing quality.
Low xGBuildup for a forward is not automatically a weakness.
Low xGBuildup does not prove that a player cannot create chances. Use expected assists and key passes for creation.
Aerial win percentage describes duel outcomes. It does not prove strength or dominance without positional context.

GOALKEEPER INTERPRETATION RULES:

If a player's first-listed position is GK, use only that player's goalkeeper data.
Do not use outfield attacking, progression, possession or aerial-duel statistics to evaluate a goalkeeper.
Do not use key passes, xGChain or xGBuildup to label a goalkeeper as a distribution specialist.
Save percentage and goals against per 90 are affected by shot quality and the defensive environment.
PSxG +/- estimates goals prevented or conceded relative to post-shot expected goals.
A positive PSxG +/- indicates above-expectation shot stopping in this sample.
A negative PSxG +/- indicates below-expectation shot stopping in this sample.
PSxG per shot on target describes the average difficulty of shots faced, not goalkeeper quality.
Launched-pass completion, launch percentage and average pass length describe distribution tendencies. They do not alone prove distribution quality.
Cross-stop percentage measures intervention on crosses.
Defensive actions outside the penalty area per 90 and their average distance describe sweeping activity.
Do not infer pace, bravery, decision-making or command of the area from goalkeeper statistics.
Without goalkeeper percentiles, describe goalkeeper values and their relationships without claiming they are elite, poor, high or low compared with other goalkeepers.
When comparing two goalkeepers, prioritize shot stopping, distribution, cross management and sweeping.
If one player is a goalkeeper and the other is an outfield player, do not force a direct quality comparison. Explain that their statistical roles are fundamentally different and compare only the nature of their respective involvement.

USEFUL OUTFIELD RELATIONSHIPS:

Non-penalty goals per 90 + non-penalty xG per 90 + finishing difference provides scoring and conversion context.
Shots per 90 + non-penalty xG per shot separates shooting frequency from average chance quality.
Expected assists per 90 + key passes per 90 separates chance quality from chance-creation frequency.
Assists per 90 + expected assists per 90 provides teammate-conversion and variance context.
xGChain per 90 + xGBuildup per 90 separates total attacking-sequence involvement from earlier buildup involvement.
Progressive passes per 90 + expected assists per 90 may separate buildup progression from final-ball creation.
Progressive carries per 90 + successful take-ons per 90 + fouls drawn per 90 may identify a carrying or pressure-relief role.
Crosses per 90 + crosses into the penalty area per 90 may identify wide delivery involvement.
Tackles + interceptions + blocks + recoveries should be interpreted together and relative to position.

BANNED PHRASES:

"silky", "maestro", "magic", "ghosts between lines", "complete player", "natural talent", "world-class", "generational", "engine", "starboy", "dictates play", "rising star", "raw talent", "electric", "unstoppable".

OUTPUT:

Return exactly this JSON object:
{
"summary": string
}

SUMMARY:

Write 80 to 100 words.
Compare Player X and Player Y directly, not as two separate scouting reports.
Include at least one clear statistical advantage for each player if supported by the data.
Include at least one hidden or non-obvious difference created by the relationship between two or more statistics.
Include at least one limitation, relative weakness, sample concern or meaningful uncertainty for one or both players.
Reference at least three contextual statistics across the two players.
Prefer per-90 rates, percentiles, per-touch rates and percentages in those references.
Do not simply say either player is better, talented, creative, dynamic or promising.
Explain how the numbers suggest the players provide value differently.
Avoid declaring a winner unless the statistical evidence shows a clear and relevant gap.
Mention how their statistical profiles appear suited to different tactical roles or environments when supported by the data.
Do not mention formations unless directly supported.
Do not infer either team's current tactical system.
If either player has 900 to 1,499 minutes, explicitly state that conclusions involving that player are provisional because of the limited sample.
If either player has fewer than 900 minutes, explicitly state that their per-90 rates are unstable and avoid presenting their apparent strengths or weaknesses as reliable.
Do not present observed finishing overperformance or underperformance as a permanent trait.

PLAYER X CONTEXT:

Name: ${show(req.body.playerX.Player)}
Position: ${show(req.body.playerX.Pos)}
Player type: ${String(req.body.playerX.Pos).split(",")[0].trim() === "GK" ? "GOALKEEPER" : "OUTFIELD"}
Team: ${show(req.body.playerX.Squad)}
Competition: ${show(req.body.playerX.Comp)}
Age: ${show(req.body.playerX.Age)}
Minutes: ${show(req.body.playerX.Min)}
Matches: ${show(req.body.playerX.MP)}
Sample classification: ${Number(req.body.playerX.Min) >= 1500 ? "ESTABLISHED SAMPLE — at least 1,500 minutes" : Number(req.body.playerX.Min) >= 900 ? "LIMITED SAMPLE — 900 to 1,499 minutes" : "INSUFFICIENT SAMPLE — fewer than 900 minutes"}

${String(req.body.playerX.Pos).split(",")[0].trim() === "GK" ? `
PLAYER X GOALKEEPER DATA:

SHOT STOPPING:
Goals against per 90: ${show(req.body.playerX.GA90)}
Save percentage: ${show(req.body.playerX["Save%"])}
Post-shot expected goals: ${show(req.body.playerX.PSxG)}
Post-shot expected goals per shot on target: ${show(req.body.playerX["PSxG/SoT"])}
PSxG +/-: ${show(req.body.playerX["PSxG+/-"])}
PSxG +/- per 90: ${show(req.body.playerX["/90"])}
Clean-sheet percentage: ${show(req.body.playerX["CS%"])}
Shots on target faced: ${show(req.body.playerX.SoTA)}
Saves: ${show(req.body.playerX.Saves)}

DISTRIBUTION:
Completed launched passes: ${show(req.body.playerX.Cmp_stats_keeper_adv)}
Attempted launched passes: ${show(req.body.playerX.Att_stats_keeper_adv)}
Launched-pass completion percentage: ${show(req.body.playerX["Cmp%_stats_keeper_adv"])}
Passes attempted excluding goal kicks: ${show(req.body.playerX["Att (GK)"])}
Throws attempted: ${show(req.body.playerX.Thr)}
Launch percentage: ${show(req.body.playerX["Launch%"])}
Average pass length: ${show(req.body.playerX.AvgLen)}

CROSS MANAGEMENT:
Crosses faced: ${show(req.body.playerX.Opp)}
Crosses stopped: ${show(req.body.playerX.Stp)}
Cross-stop percentage: ${show(req.body.playerX["Stp%"])}

SWEEPING:
Defensive actions outside the penalty area: ${show(req.body.playerX["#OPA"])}
Defensive actions outside the penalty area per 90: ${show(req.body.playerX["#OPA/90"])}
Average distance of defensive actions: ${show(req.body.playerX.AvgDist)}
` : `
PLAYER X OUTFIELD DATA:

CONTEXTUAL ATTACKING METRICS:

Non-penalty goals per 90: ${show(req.body.playerX.us_npg_per90)}
Percentiles: position ${percentile(req.body.playerX.us_npg_per90_percentile_position)}, league ${percentile(req.body.playerX.us_npg_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_npg_per90_percentile_overall)}

Non-penalty xG per 90: ${show(req.body.playerX.us_npxG_per90)}
Percentiles: position ${percentile(req.body.playerX.us_npxG_per90_percentile_position)}, league ${percentile(req.body.playerX.us_npxG_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_npxG_per90_percentile_overall)}

Non-penalty finishing difference per 90, calculated as non-penalty goals minus non-penalty xG: ${req.body.playerX.us_npg_per90 === null || req.body.playerX.us_npg_per90 === undefined || req.body.playerX.us_npxG_per90 === null || req.body.playerX.us_npxG_per90 === undefined || !Number.isFinite(Number(req.body.playerX.us_npg_per90)) || !Number.isFinite(Number(req.body.playerX.us_npxG_per90)) ? "unavailable" : (Number(req.body.playerX.us_npg_per90) - Number(req.body.playerX.us_npxG_per90)).toFixed(4)}

xG per 90: ${show(req.body.playerX.us_xG_per90)}
Percentiles: position ${percentile(req.body.playerX.us_xG_per90_percentile_position)}, league ${percentile(req.body.playerX.us_xG_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_xG_per90_percentile_overall)}

Assists per 90: ${show(req.body.playerX.us_assists_per90)}
Percentiles: position ${percentile(req.body.playerX.us_assists_per90_percentile_position)}, league ${percentile(req.body.playerX.us_assists_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_assists_per90_percentile_overall)}

Expected assists per 90: ${show(req.body.playerX.us_xA_per90)}
Percentiles: position ${percentile(req.body.playerX.us_xA_per90_percentile_position)}, league ${percentile(req.body.playerX.us_xA_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_xA_per90_percentile_overall)}

Key passes per 90: ${show(req.body.playerX.us_key_passes_per90)}
Percentiles: position ${percentile(req.body.playerX.us_key_passes_per90_percentile_position)}, league ${percentile(req.body.playerX.us_key_passes_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_key_passes_per90_percentile_overall)}

Shots per 90: ${show(req.body.playerX.us_shots_per90)}
Understat shots: ${show(req.body.playerX.us_shots)}
Percentiles: position ${percentile(req.body.playerX.us_shots_per90_percentile_position)}, league ${percentile(req.body.playerX.us_shots_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_shots_per90_percentile_overall)}

Non-penalty xG per shot eligibility: ${Number(req.body.playerX.us_shots) >= 10 ? "ELIGIBLE — at least 10 Understat shots" : "INELIGIBLE — fewer than 10 Understat shots"}
Non-penalty xG per shot: ${show(req.body.playerX.us_npxG_per_shot)}
Percentiles: position ${percentile(req.body.playerX.us_npxG_per_shot_percentile_position)}, league ${percentile(req.body.playerX.us_npxG_per_shot_percentile_league)}, overall ${percentile(req.body.playerX.us_npxG_per_shot_percentile_overall)}

xGChain per 90: ${show(req.body.playerX.us_xGChain_per90)}
Percentiles: position ${percentile(req.body.playerX.us_xGChain_per90_percentile_position)}, league ${percentile(req.body.playerX.us_xGChain_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_xGChain_per90_percentile_overall)}

xGBuildup per 90: ${show(req.body.playerX.us_xGBuildup_per90)}
Percentiles: position ${percentile(req.body.playerX.us_xGBuildup_per90_percentile_position)}, league ${percentile(req.body.playerX.us_xGBuildup_per90_percentile_league)}, overall ${percentile(req.body.playerX.us_xGBuildup_per90_percentile_overall)}

SEASON TOTALS FOR SAMPLE CONTEXT ONLY:
Non-penalty goals: ${show(req.body.playerX.us_npg)}
Assists: ${show(req.body.playerX.us_assists)}
Non-penalty xG: ${show(req.body.playerX.us_npxG)}
Expected assists: ${show(req.body.playerX.us_xA)}

PROGRESSION PER 90:
Progressive passes: ${show(req.body.playerX.prgp_per90)}
Progressive carries: ${show(req.body.playerX.prgc_per90)}
Progressive passes received: ${calculatePer90(req.body.playerX, req.body.playerX.PrgR)}
Passes into the penalty area: ${calculatePer90(req.body.playerX, req.body.playerX.PPA)}
Carries into the penalty area: ${calculatePer90(req.body.playerX, req.body.playerX.CPA)}

CARRYING AND TAKE-ONS:
Carries per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Carries)}
Take-ons attempted per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Att_stats_possession)}
Successful take-ons per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Succ)}
Take-on success percentage: ${show(req.body.playerX["Succ%"])}
Fouls drawn per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Fld_stats_misc)}

POSSESSION:
Touches per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Touches)}
Miscontrols per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Mis)}
Dispossessions per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Dis)}
Miscontrols per 100 touches: ${calculatePer100Touches(req.body.playerX, req.body.playerX.Mis)}
Dispossessions per 100 touches: ${calculatePer100Touches(req.body.playerX, req.body.playerX.Dis)}

WIDE AND FINAL-THIRD INVOLVEMENT:
Crosses per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Crs)}
Crosses into the penalty area per 90: ${calculatePer90(req.body.playerX, req.body.playerX.CrsPA)}
Touches in the attacking penalty area per 90: ${calculatePer90(req.body.playerX, req.body.playerX["Att Pen"])}
Shot-creating actions per 90: ${show(req.body.playerX.SCA90)}
Shots on target per 90: ${show(req.body.playerX["SoT/90"])}
Shot-on-target percentage: ${show(req.body.playerX["SoT%"])}
Average shot distance: ${show(req.body.playerX.Dist)}

DEFENDING PER 90:
Recoveries: ${calculatePer90(req.body.playerX, req.body.playerX.Recov)}
Tackles attempted: ${calculatePer90(req.body.playerX, req.body.playerX.Tkl)}
Tackles won: ${calculatePer90(req.body.playerX, req.body.playerX.TklW)}
Tackle-win percentage: ${percentage(req.body.playerX.TklW, req.body.playerX.Tkl)}
Blocks: ${calculatePer90(req.body.playerX, req.body.playerX.Blocks_stats_defense)}
Interceptions: ${calculatePer90(req.body.playerX, req.body.playerX.Int)}
Clearances: ${calculatePer90(req.body.playerX, req.body.playerX.Clr)}
Errors: ${calculatePer90(req.body.playerX, req.body.playerX.Err)}

DISCIPLINE PER 90:
Fouls committed: ${calculatePer90(req.body.playerX, req.body.playerX.Fls)}
Yellow cards: ${calculatePer90(req.body.playerX, req.body.playerX.CrdY)}
Red cards: ${calculatePer90(req.body.playerX, req.body.playerX.CrdR)}

AERIAL DUELS:
Aerial duels won per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Won)}
Aerial duels lost per 90: ${calculatePer90(req.body.playerX, req.body.playerX.Lost_stats_misc)}
Aerial win percentage: ${percentage(req.body.playerX.Won, Number(req.body.playerX.Won) + Number(req.body.playerX.Lost_stats_misc))}
`}

PLAYER Y CONTEXT:

Name: ${show(req.body.playerY.Player)}
Position: ${show(req.body.playerY.Pos)}
Player type: ${String(req.body.playerY.Pos).split(",")[0].trim() === "GK" ? "GOALKEEPER" : "OUTFIELD"}
Team: ${show(req.body.playerY.Squad)}
Competition: ${show(req.body.playerY.Comp)}
Age: ${show(req.body.playerY.Age)}
Minutes: ${show(req.body.playerY.Min)}
Matches: ${show(req.body.playerY.MP)}
Sample classification: ${Number(req.body.playerY.Min) >= 1500 ? "ESTABLISHED SAMPLE — at least 1,500 minutes" : Number(req.body.playerY.Min) >= 900 ? "LIMITED SAMPLE — 900 to 1,499 minutes" : "INSUFFICIENT SAMPLE — fewer than 900 minutes"}

${String(req.body.playerY.Pos).split(",")[0].trim() === "GK" ? `
PLAYER Y GOALKEEPER DATA:

SHOT STOPPING:
Goals against per 90: ${show(req.body.playerY.GA90)}
Save percentage: ${show(req.body.playerY["Save%"])}
Post-shot expected goals: ${show(req.body.playerY.PSxG)}
Post-shot expected goals per shot on target: ${show(req.body.playerY["PSxG/SoT"])}
PSxG +/-: ${show(req.body.playerY["PSxG+/-"])}
PSxG +/- per 90: ${show(req.body.playerY["/90"])}
Clean-sheet percentage: ${show(req.body.playerY["CS%"])}
Shots on target faced: ${show(req.body.playerY.SoTA)}
Saves: ${show(req.body.playerY.Saves)}

DISTRIBUTION:
Completed launched passes: ${show(req.body.playerY.Cmp_stats_keeper_adv)}
Attempted launched passes: ${show(req.body.playerY.Att_stats_keeper_adv)}
Launched-pass completion percentage: ${show(req.body.playerY["Cmp%_stats_keeper_adv"])}
Passes attempted excluding goal kicks: ${show(req.body.playerY["Att (GK)"])}
Throws attempted: ${show(req.body.playerY.Thr)}
Launch percentage: ${show(req.body.playerY["Launch%"])}
Average pass length: ${show(req.body.playerY.AvgLen)}

CROSS MANAGEMENT:
Crosses faced: ${show(req.body.playerY.Opp)}
Crosses stopped: ${show(req.body.playerY.Stp)}
Cross-stop percentage: ${show(req.body.playerY["Stp%"])}

SWEEPING:
Defensive actions outside the penalty area: ${show(req.body.playerY["#OPA"])}
Defensive actions outside the penalty area per 90: ${show(req.body.playerY["#OPA/90"])}
Average distance of defensive actions: ${show(req.body.playerY.AvgDist)}
` : `
PLAYER Y OUTFIELD DATA:

CONTEXTUAL ATTACKING METRICS:

Non-penalty goals per 90: ${show(req.body.playerY.us_npg_per90)}
Percentiles: position ${percentile(req.body.playerY.us_npg_per90_percentile_position)}, league ${percentile(req.body.playerY.us_npg_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_npg_per90_percentile_overall)}

Non-penalty xG per 90: ${show(req.body.playerY.us_npxG_per90)}
Percentiles: position ${percentile(req.body.playerY.us_npxG_per90_percentile_position)}, league ${percentile(req.body.playerY.us_npxG_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_npxG_per90_percentile_overall)}

Non-penalty finishing difference per 90, calculated as non-penalty goals minus non-penalty xG: ${req.body.playerY.us_npg_per90 === null || req.body.playerY.us_npg_per90 === undefined || req.body.playerY.us_npxG_per90 === null || req.body.playerY.us_npxG_per90 === undefined || !Number.isFinite(Number(req.body.playerY.us_npg_per90)) || !Number.isFinite(Number(req.body.playerY.us_npxG_per90)) ? "unavailable" : (Number(req.body.playerY.us_npg_per90) - Number(req.body.playerY.us_npxG_per90)).toFixed(4)}

xG per 90: ${show(req.body.playerY.us_xG_per90)}
Percentiles: position ${percentile(req.body.playerY.us_xG_per90_percentile_position)}, league ${percentile(req.body.playerY.us_xG_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_xG_per90_percentile_overall)}

Assists per 90: ${show(req.body.playerY.us_assists_per90)}
Percentiles: position ${percentile(req.body.playerY.us_assists_per90_percentile_position)}, league ${percentile(req.body.playerY.us_assists_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_assists_per90_percentile_overall)}

Expected assists per 90: ${show(req.body.playerY.us_xA_per90)}
Percentiles: position ${percentile(req.body.playerY.us_xA_per90_percentile_position)}, league ${percentile(req.body.playerY.us_xA_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_xA_per90_percentile_overall)}

Key passes per 90: ${show(req.body.playerY.us_key_passes_per90)}
Percentiles: position ${percentile(req.body.playerY.us_key_passes_per90_percentile_position)}, league ${percentile(req.body.playerY.us_key_passes_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_key_passes_per90_percentile_overall)}

Shots per 90: ${show(req.body.playerY.us_shots_per90)}
Understat shots: ${show(req.body.playerY.us_shots)}
Percentiles: position ${percentile(req.body.playerY.us_shots_per90_percentile_position)}, league ${percentile(req.body.playerY.us_shots_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_shots_per90_percentile_overall)}

Non-penalty xG per shot eligibility: ${Number(req.body.playerY.us_shots) >= 10 ? "ELIGIBLE — at least 10 Understat shots" : "INELIGIBLE — fewer than 10 Understat shots"}
Non-penalty xG per shot: ${show(req.body.playerY.us_npxG_per_shot)}
Percentiles: position ${percentile(req.body.playerY.us_npxG_per_shot_percentile_position)}, league ${percentile(req.body.playerY.us_npxG_per_shot_percentile_league)}, overall ${percentile(req.body.playerY.us_npxG_per_shot_percentile_overall)}

xGChain per 90: ${show(req.body.playerY.us_xGChain_per90)}
Percentiles: position ${percentile(req.body.playerY.us_xGChain_per90_percentile_position)}, league ${percentile(req.body.playerY.us_xGChain_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_xGChain_per90_percentile_overall)}

xGBuildup per 90: ${show(req.body.playerY.us_xGBuildup_per90)}
Percentiles: position ${percentile(req.body.playerY.us_xGBuildup_per90_percentile_position)}, league ${percentile(req.body.playerY.us_xGBuildup_per90_percentile_league)}, overall ${percentile(req.body.playerY.us_xGBuildup_per90_percentile_overall)}

SEASON TOTALS FOR SAMPLE CONTEXT ONLY:
Non-penalty goals: ${show(req.body.playerY.us_npg)}
Assists: ${show(req.body.playerY.us_assists)}
Non-penalty xG: ${show(req.body.playerY.us_npxG)}
Expected assists: ${show(req.body.playerY.us_xA)}

PROGRESSION PER 90:
Progressive passes: ${show(req.body.playerY.prgp_per90)}
Progressive carries: ${show(req.body.playerY.prgc_per90)}
Progressive passes received: ${calculatePer90(req.body.playerY, req.body.playerY.PrgR)}
Passes into the penalty area: ${calculatePer90(req.body.playerY, req.body.playerY.PPA)}
Carries into the penalty area: ${calculatePer90(req.body.playerY, req.body.playerY.CPA)}

CARRYING AND TAKE-ONS:
Carries per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Carries)}
Take-ons attempted per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Att_stats_possession)}
Successful take-ons per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Succ)}
Take-on success percentage: ${show(req.body.playerY["Succ%"])}
Fouls drawn per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Fld_stats_misc)}

POSSESSION:
Touches per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Touches)}
Miscontrols per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Mis)}
Dispossessions per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Dis)}
Miscontrols per 100 touches: ${calculatePer100Touches(req.body.playerY, req.body.playerY.Mis)}
Dispossessions per 100 touches: ${calculatePer100Touches(req.body.playerY, req.body.playerY.Dis)}

WIDE AND FINAL-THIRD INVOLVEMENT:
Crosses per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Crs)}
Crosses into the penalty area per 90: ${calculatePer90(req.body.playerY, req.body.playerY.CrsPA)}
Touches in the attacking penalty area per 90: ${calculatePer90(req.body.playerY, req.body.playerY["Att Pen"])}
Shot-creating actions per 90: ${show(req.body.playerY.SCA90)}
Shots on target per 90: ${show(req.body.playerY["SoT/90"])}
Shot-on-target percentage: ${show(req.body.playerY["SoT%"])}
Average shot distance: ${show(req.body.playerY.Dist)}

DEFENDING PER 90:
Recoveries: ${calculatePer90(req.body.playerY, req.body.playerY.Recov)}
Tackles attempted: ${calculatePer90(req.body.playerY, req.body.playerY.Tkl)}
Tackles won: ${calculatePer90(req.body.playerY, req.body.playerY.TklW)}
Tackle-win percentage: ${percentage(req.body.playerY.TklW, req.body.playerY.Tkl)}
Blocks: ${calculatePer90(req.body.playerY, req.body.playerY.Blocks_stats_defense)}
Interceptions: ${calculatePer90(req.body.playerY, req.body.playerY.Int)}
Clearances: ${calculatePer90(req.body.playerY, req.body.playerY.Clr)}
Errors: ${calculatePer90(req.body.playerY, req.body.playerY.Err)}

DISCIPLINE PER 90:
Fouls committed: ${calculatePer90(req.body.playerY, req.body.playerY.Fls)}
Yellow cards: ${calculatePer90(req.body.playerY, req.body.playerY.CrdY)}
Red cards: ${calculatePer90(req.body.playerY, req.body.playerY.CrdR)}

AERIAL DUELS:
Aerial duels won per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Won)}
Aerial duels lost per 90: ${calculatePer90(req.body.playerY, req.body.playerY.Lost_stats_misc)}
Aerial win percentage: ${percentage(req.body.playerY.Won, Number(req.body.playerY.Won) + Number(req.body.playerY.Lost_stats_misc))}
`}
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
