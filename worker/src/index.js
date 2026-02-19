export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json"
    };

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    try {

      // GET all users
      if (url.pathname === "/api/users" && request.method === "GET") {
        const result = await env.DB.prepare(
          "SELECT * FROM users"
        ).all();

        return new Response(
          JSON.stringify(result.results),
          { headers: corsHeaders }
        );
      }

      // CREATE user
      if (url.pathname === "/api/users" && request.method === "POST") {
        const body = await request.json();

        await env.DB.prepare(
          "INSERT INTO users (name, department, position) VALUES (?, ?, ?)"
        )
          .bind(body.name, body.department, body.position)
          .run();

        return new Response(
          JSON.stringify({ success: true }),
          { headers: corsHeaders }
        );
      }

      // UPDATE user
      if (url.pathname.startsWith("/api/users/") && request.method === "PUT") {
        const id = url.pathname.split("/").pop();
        const body = await request.json();

        await env.DB.prepare(
          "UPDATE users SET name=?, department=?, position=? WHERE id=?"
        )
          .bind(body.name, body.department, body.position, id)
          .run();

        return new Response(
          JSON.stringify({ success: true }),
          { headers: corsHeaders }
        );
      }

      // DELETE user
      if (url.pathname.startsWith("/api/users/") && request.method === "DELETE") {
        const id = url.pathname.split("/").pop();

        await env.DB.prepare(
          "DELETE FROM users WHERE id=?"
        )
          .bind(id)
          .run();

        return new Response(
          JSON.stringify({ success: true }),
          { headers: corsHeaders }
        );
      }

      // 404 fallback (IMPORTANT for CORS)
      return new Response(
        JSON.stringify({ error: "Not Found" }),
        { status: 404, headers: corsHeaders }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
