export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ---- CORS ----
    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {

      // =========================
      // GET /api/users
      // =========================
      if (url.pathname === "/api/users" && request.method === "GET") {
        const result = await env.DB
          .prepare("SELECT * FROM users")
          .all();

        return new Response(
          JSON.stringify(result.results),
          { headers: corsHeaders }
        );
      }

      // =========================
      // POST /api/users
      // =========================
      if (url.pathname === "/api/users" && request.method === "POST") {
        const body = await request.json();

        if (!body.name || !body.email) {
          return new Response(
            JSON.stringify({ error: "Missing fields" }),
            { status: 400, headers: corsHeaders }
          );
        }

        const res = await env.DB
          .prepare("INSERT INTO users (name,email) VALUES (?,?)")
          .bind(body.name, body.email)
          .run();

        return new Response(
          JSON.stringify({
            success: true,
            id: res.meta.last_row_id
          }),
          { headers: corsHeaders }
        );
      }

      // =========================
      // Default 404
      // =========================
      return new Response(
        JSON.stringify({ error: "Not Found" }),
        { status: 404, headers: corsHeaders }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({
          error: err.message
        }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
