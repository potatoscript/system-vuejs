export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {

      // =====================================================
      // ================= EMPLOYEE API ======================
      // =====================================================

      // GET all employees
      if (url.pathname === "/api/users" && request.method === "GET") {
        const result = await env.DB.prepare(
          "SELECT * FROM users ORDER BY id DESC"
        ).all();

        return Response.json(result.results, { headers: corsHeaders });
      }

      // CREATE employee
      if (url.pathname === "/api/users" && request.method === "POST") {
        const body = await request.json();

        await env.DB.prepare(
          "INSERT INTO users (name, department, position) VALUES (?, ?, ?)"
        )
          .bind(body.name, body.department, body.position)
          .run();

        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // UPDATE employee
      if (url.pathname.startsWith("/api/users/") && request.method === "PUT") {
        const id = url.pathname.split("/").pop();
        const body = await request.json();

        await env.DB.prepare(
          "UPDATE users SET name=?, department=?, position=? WHERE id=?"
        )
          .bind(body.name, body.department, body.position, id)
          .run();

        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // DELETE employee
      if (url.pathname.startsWith("/api/users/") && request.method === "DELETE") {
        const id = url.pathname.split("/").pop();

        await env.DB.prepare(
          "DELETE FROM users WHERE id=?"
        )
          .bind(id)
          .run();

        return Response.json({ success: true }, { headers: corsHeaders });
      }


      // =====================================================
      // ===================== JOB API =======================
      // =====================================================

      // CREATE job
      if (url.pathname === "/api/Job/create-job" && request.method === "POST") {
        const body = await request.json();

        await env.DB.prepare(`
          INSERT INTO jobs
          (employeeName, employeeDepartment, jobContent, dueDate, status)
          VALUES (?, ?, ?, ?, ?)
        `)
          .bind(
            body.EmployeeName,
            body.EmployeeDepartment,
            body.JobContent,
            body.DueDate,
            body.Status
          )
          .run();

        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // UPDATE job
			if (
				url.pathname.startsWith("/api/Job/update-job-by-id/") &&
				request.method === "PUT"
			) {
				const id = url.pathname.split("/").pop();
				const body = await request.json();

				await env.DB.prepare(`
					UPDATE jobs
					SET employeeName=?,
							employeeDepartment=?,
							jobContent=?,
							dueDate=?,
							status=?
					WHERE jobId=?
				`)
					.bind(
						body.EmployeeName,
						body.EmployeeDepartment,
						body.JobContent,
						body.DueDate,
						body.Status,
						id   // ✅ use ID from URL
					)
					.run();

				return Response.json({ success: true }, { headers: corsHeaders });
			}

      // DELETE job
      if (url.pathname.startsWith("/api/Job/delete-job-by-id/") && request.method === "DELETE") {
        const id = url.pathname.split("/").pop();

        await env.DB.prepare(
          "DELETE FROM jobs WHERE jobId=?"
        )
          .bind(id)
          .run();

        return Response.json({ success: true }, { headers: corsHeaders });
      }

      // GET total jobs per employee (for chart)
      if (url.pathname === "/api/Job/read-total-jobs-employee" && request.method === "GET") {
        const result = await env.DB.prepare(`
          SELECT employeeName,
                 employeeDepartment,
                 COUNT(*) as jobContent
          FROM jobs
          GROUP BY employeeName, employeeDepartment
        `).all();

        return Response.json(result.results, { headers: corsHeaders });
      }

      // GET all jobs for specific employee
      if (url.pathname.startsWith("/api/Job/read-all-employee-jobs/") && request.method === "GET") {
        const employeeName = decodeURIComponent(url.pathname.split("/").pop());

        const result = await env.DB.prepare(`
          SELECT * FROM jobs
          WHERE employeeName=?
          ORDER BY jobId DESC
        `)
          .bind(employeeName)
          .all();

        return Response.json(result.results, { headers: corsHeaders });
      }

			// ==========================
			// SIGN UP
			// ==========================
			if (url.pathname === "/api/auth/signup" && request.method === "POST") {
				const body = await request.json();

				// check existing email
				const existing = await env.DB.prepare(
					"SELECT * FROM auth_users WHERE email=?"
				)
					.bind(body.email)
					.first();

				if (existing) {
					return Response.json(
						{ error: "Email already exists" },
						{ status: 400, headers: corsHeaders }
					);
				}

				await env.DB.prepare(
					"INSERT INTO auth_users (name, email, password) VALUES (?, ?, ?)"
				)
					.bind(body.name, body.email, body.password)
					.run();

				return Response.json(
					{ success: true, name: body.name, email: body.email },
					{ headers: corsHeaders }
				);
			}

      // =====================================================

      return new Response(
        JSON.stringify({ error: "Not Found" }),
        { status: 404, headers: corsHeaders }
      );

    } catch (err) {
      return Response.json(
        { error: err.message },
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
