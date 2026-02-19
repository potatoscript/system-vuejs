export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // =============================
    // Handle CORS Preflight
    // =============================
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {

      // ============================================
      // GET ALL USERS
      // ============================================
      if (url.pathname === "/api/users" && request.method === "GET") {

        const result = await env.DB
          .prepare("SELECT * FROM users ORDER BY id DESC")
          .all();

        return Response.json(result.results, { headers: corsHeaders });
      }


      // ============================================
      // CREATE USER
      // ============================================
      if (url.pathname === "/api/users" && request.method === "POST") {

        const body = await request.json();

        if (!body.name) {
          return Response.json(
            { error: "Name is required" },
            { status: 400, headers: corsHeaders }
          );
        }

        await env.DB.prepare(
          "INSERT INTO users (name, department, position) VALUES (?, ?, ?)"
        )
        .bind(
          body.name,
          body.department || "",
          body.position || ""
        )
        .run();

        return Response.json(
          { success: true },
          { headers: corsHeaders }
        );
      }


      // ============================================
      // UPDATE USER
      // ============================================
      if (url.pathname.startsWith("/api/users/") && request.method === "PUT") {

        const id = parseInt(url.pathname.split("/").pop());

        const body = await request.json();

        await env.DB.prepare(
          "UPDATE users SET name=?, department=?, position=? WHERE id=?"
        )
        .bind(
          body.name,
          body.department || "",
          body.position || "",
          id
        )
        .run();

        return Response.json(
          { success: true },
          { headers: corsHeaders }
        );
      }


      // ============================================
      // DELETE USER
      // ============================================
      if (url.pathname.startsWith("/api/users/") && request.method === "DELETE") {

        const id = parseInt(url.pathname.split("/").pop());

        await env.DB.prepare(
          "DELETE FROM users WHERE id=?"
        )
        .bind(id)
        .run();

        return Response.json(
          { success: true },
          { headers: corsHeaders }
        );
      }


      return new Response("Not found", { status: 404 });

    } catch (err) {
      return Response.json(
        { error: err.message },
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
