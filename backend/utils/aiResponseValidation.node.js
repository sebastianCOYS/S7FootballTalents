const test = require("node:test");
const assert = require("node:assert/strict");
const {
  parseComparisonResponse,
  parsePlayerAnalysisResponse,
} = require("./aiResponseValidation");

const validAnalysis = {
  profileTag: "Buildup Progressor",
  insights: [
    { label: "Progression", evidence: "42 progressive passes", interpretation: "Suggests buildup value." },
    { label: "Creation", evidence: "7 key passes", interpretation: "Points to some chance creation." },
    { label: "Defending", evidence: "12 recoveries", interpretation: "Shows some defensive activity." },
  ],
  roleFit: "Fits a possession-oriented buildup role.",
  summary: "The statistical profile suggests useful progression with some defensive activity and limited final-third output.",
};

test("accepts and trims a valid player analysis", () => {
  const input = { ...validAnalysis, profileTag: "  Buildup Progressor  " };
  const result = parsePlayerAnalysisResponse(JSON.stringify(input));

  assert.equal(result.profileTag, "Buildup Progressor");
  assert.equal(result.insights.length, 3);
});

test("rejects malformed JSON and non-object JSON", () => {
  assert.throws(() => parsePlayerAnalysisResponse("not JSON"));
  assert.throws(() => parsePlayerAnalysisResponse("[]"));
});

test("rejects incorrect field types and insight counts", () => {
  assert.throws(() => parsePlayerAnalysisResponse(JSON.stringify({ ...validAnalysis, summary: {} })));
  assert.throws(() => parsePlayerAnalysisResponse(JSON.stringify({ ...validAnalysis, insights: [] })));
});

test("rejects missing, additional, empty, and oversized fields", () => {
  const { roleFit, ...missingField } = validAnalysis;
  void roleFit;

  assert.throws(() => parsePlayerAnalysisResponse(JSON.stringify(missingField)));
  assert.throws(() => parsePlayerAnalysisResponse(JSON.stringify({ ...validAnalysis, extra: "unexpected" })));
  assert.throws(() => parsePlayerAnalysisResponse(JSON.stringify({ ...validAnalysis, summary: "   " })));
  assert.throws(() => parsePlayerAnalysisResponse(JSON.stringify({ ...validAnalysis, profileTag: "x".repeat(101) })));
});

test("validates comparison responses", () => {
  assert.deepEqual(parseComparisonResponse('{"summary":" Direct comparison. "}'), {
    summary: "Direct comparison.",
  });
  assert.throws(() => parseComparisonResponse('{"summary":[]}'));
  assert.throws(() => parseComparisonResponse('{"summary":"Valid","extra":true}'));
});

test("AI route returns 502 instead of forwarding an invalid provider shape", async () => {
  let providerContent = JSON.stringify({
    profileTag: {},
    insights: "not an array",
    roleFit: [],
    summary: {},
  });

  class FakeGroq {
    constructor() {
      this.chat = {
        completions: {
          create: async () => ({
            choices: [{ message: { content: providerContent } }],
          }),
        },
      };
    }
  }

  const groqModulePath = require.resolve("groq-sdk");
  const originalGroqModule = require.cache[groqModulePath];
  require.cache[groqModulePath] = {
    id: groqModulePath,
    filename: groqModulePath,
    loaded: true,
    exports: FakeGroq,
    children: [],
    paths: [],
  };

  const routePath = require.resolve("../routes/ai");
  delete require.cache[routePath];

  const express = require("express");
  const errorHandler = require("../middleware/errorHandler");
  const app = express();
  app.use(express.json());
  app.use("/ai", require("../routes/ai"));
  app.use(errorHandler);

  const server = await new Promise((resolve) => {
    const listeningServer = app.listen(0, "127.0.0.1", () => resolve(listeningServer));
  });

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/ai`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ player: {} }),
    });
    const body = await response.json();

    assert.equal(response.status, 502);
    assert.equal(body.error.code, "INVALID_AI_RESPONSE");

    providerContent = JSON.stringify(validAnalysis);
    const validResponse = await fetch(`http://127.0.0.1:${address.port}/ai`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ player: {} }),
    });
    const validBody = await validResponse.json();

    assert.equal(validResponse.status, 200);
    assert.deepEqual(validBody.data.insights, validAnalysis.insights);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });

    delete require.cache[routePath];
    if (originalGroqModule) {
      require.cache[groqModulePath] = originalGroqModule;
    } else {
      delete require.cache[groqModulePath];
    }
  }
});
