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

        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-5.6-luna",
            input: [
              {
                role: "system",
                content:
                  "You are Shehu-Fitness AI Coach. Help users create personalized fitness plans based on their goals, timeframe, fitness level, available equipment, workout days, workout duration, and preferences. Give practical and safe fitness guidance. Do not promise exact physical results within a specific timeframe."
              },
              {
                role: "user",
                content: JSON.stringify(body)
              }
            ]
          })
        });

        const data = await response.json();

        if (!response.ok) {
          return Response.json(
            {
              success: false,
              error: data
            },
            { status: response.status }
          );
        }

        return Response.json({
          success: true,
          response: data
        });

      } catch (error) {
        return Response.json(
          {
            success: false,
            error: "Something went wrong.",
            details: error.message
          },
          { status: 500 }
        );
      }
    }

    return new Response("Not found", { status: 404 });
  }
};
