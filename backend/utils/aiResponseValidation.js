const PLAYER_ANALYSIS_KEYS = ["profileTag", "insights", "roleFit", "summary"];
const INSIGHT_KEYS = ["label", "evidence", "interpretation"];
const COMPARISON_KEYS = ["summary"];

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasExactKeys(value, expectedKeys) {
  if (!isPlainObject(value)) {
    return false;
  }

  const actualKeys = Object.keys(value).sort();
  const sortedExpectedKeys = [...expectedKeys].sort();
  return actualKeys.length === sortedExpectedKeys.length
    && actualKeys.every((key, index) => key === sortedExpectedKeys[index]);
}

function requireString(value, field, maxLength) {
  if (typeof value !== "string") {
    throw new Error(`${field} must be a string`);
  }

  const trimmedValue = value.trim();
  if (trimmedValue.length === 0 || trimmedValue.length > maxLength) {
    throw new Error(`${field} must contain between 1 and ${maxLength} characters`);
  }

  return trimmedValue;
}

function parseJsonObject(content) {
  if (typeof content !== "string" || content.trim().length === 0) {
    throw new Error("AI response content must be a non-empty string");
  }

  const parsed = JSON.parse(content);
  if (!isPlainObject(parsed)) {
    throw new Error("AI response must be a JSON object");
  }

  return parsed;
}

function parsePlayerAnalysisResponse(content) {
  const parsed = parseJsonObject(content);
  if (!hasExactKeys(parsed, PLAYER_ANALYSIS_KEYS)) {
    throw new Error("AI player analysis has an unexpected structure");
  }

  if (!Array.isArray(parsed.insights) || parsed.insights.length !== 3) {
    throw new Error("AI player analysis must contain exactly three insights");
  }

  const insights = parsed.insights.map((insight, index) => {
    if (!hasExactKeys(insight, INSIGHT_KEYS)) {
      throw new Error(`AI insight ${index + 1} has an unexpected structure`);
    }

    return {
      label: requireString(insight.label, `insights[${index}].label`, 100),
      evidence: requireString(insight.evidence, `insights[${index}].evidence`, 500),
      interpretation: requireString(insight.interpretation, `insights[${index}].interpretation`, 800),
    };
  });

  return {
    profileTag: requireString(parsed.profileTag, "profileTag", 100),
    insights,
    roleFit: requireString(parsed.roleFit, "roleFit", 500),
    summary: requireString(parsed.summary, "summary", 1200),
  };
}

function parseComparisonResponse(content) {
  const parsed = parseJsonObject(content);
  if (!hasExactKeys(parsed, COMPARISON_KEYS)) {
    throw new Error("AI comparison has an unexpected structure");
  }

  return {
    summary: requireString(parsed.summary, "summary", 1600),
  };
}

module.exports = {
  parseComparisonResponse,
  parsePlayerAnalysisResponse,
};
