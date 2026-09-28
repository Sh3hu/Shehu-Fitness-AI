export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response("Shehu Fitness AI backend is running.", {
        headers: { "Content-Type": "text/plain" }
      });
    }

    if (request.method === "POST" && url.pathname === "/coach") {
      try {
        const body = await request.json();

        return Response.json({
          success: true,
          message: "AI Coach connection is working.",
          received: body
        });
      } catch {
        return Response.json(
          { success: false, error: "Invalid request." },
          { status: 400 }
        );
      }
    }

    return new Response("Not found", { status: 404 });
  }
};
