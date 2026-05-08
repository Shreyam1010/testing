export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (!env.IMAGES) {
    return new Response("R2 not configured", { status: 400 });
  }

  const key = url.pathname.replace("/images/", "");
  const object = await env.IMAGES.get(key);

  if (!object) {
    return new Response("Image Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(object.body, { headers });
}
