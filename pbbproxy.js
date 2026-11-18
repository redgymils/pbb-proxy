export default {
  async fetch(request) {
    // 1. Handle CORS preflight checks
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        }
      });
    }

    // 2. Rewrite the URL to target the actual stream server
    const url = new URL(request.url);
    url.hostname = "pbbcollab.com";

    // 3. Fetch the video segments
    const response = await fetch(url.toString(), request);

    // 4. Attach the CORS bypass headers to the video segments
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    
    return newResponse;
  }
};
