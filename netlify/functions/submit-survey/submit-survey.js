export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  try {
    const connectionString = process.env.NETLIFY_DATABASE_URL;
    const dbUrl = new URL(connectionString);
    const neonHost = dbUrl.hostname;

    const res = await fetch(`https://${neonHost}/sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Neon-Connection-String": connectionString,
      },
      body: JSON.stringify({
        query: `INSERT INTO survey_responses (persona, response_data) VALUES ($1, $2)`,
        params: [body.persona || null, JSON.stringify(body)],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Neon error:", err);
      return { statusCode: 500, body: JSON.stringify({ error: err }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
