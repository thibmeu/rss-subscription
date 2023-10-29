import { EmailMessage } from "cloudflare:email";

const handle = async (env) => {
  for (const [name, blog] of Object.entries(env.BLOGS)) {
    const url = `${blog}/wp-json/wp/v2/posts`;
    const feed = await fetch(url).then((r) => r.json());
    const lastBlog = feed[0];

    const body = `Date: ${new Date().toUTCString()}
From: "${name}" <${env.SENDER_EMAIL}>
To: ${env.RECIPIENT_EMAILS.map((r) => `"${r}" <${r}>`).join(", ")}
Subject: ${lastBlog.title.rendered}
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8

<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${lastBlog.content.rendered}
</body>
</html>
`;

    const lastDate = new Date(lastBlog.date_gmt);
    // if blog published in the last day
    if (Date.now() - lastDate < 86400 * 1000) {
      for (const recipient of env.RECIPIENT_EMAILS) {
        const email = new EmailMessage(env.SENDER_EMAIL, recipient, body);
        await env.EMAIL.send(email);
      }
    }
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== "/trigger") {
      return new Response("Not found", { status: 404 });
    }
    await handle(env);
    return new Response("OK");
  },

  async scheduled(controller, env, ctx) {
    await handle(env);
  },
};
