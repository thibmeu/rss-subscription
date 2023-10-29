# RSS Subscribe

Subscribe to WordPress that don't have newsletters.

📰📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨📨

List the blogs you want to subscribe to, have one or more emails you want to get a newsletter to, deploy a Cloudflare Workers, and you are done.

This is a self-managed newsletter.

## Requirements

* Node 20+. I recommend using nvm for version management.
* [Cloudflare Workers account](https://workers.dev)
* [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/), make sure you have a sender domain, and verified recipient emails

## Deploy your newsletter

1. Copy the template configuration `cp example.wrangler.toml wrangler.toml`
2. Edit [`wrangler.toml`](./wrangler.toml) with your details
3. Deploy `npm run deploy`

## Testing

This newsletter is handled through a cron job that runs once every day. If you want to try it manually, you can hit `/trigger` endpoint.

## Development

This repository is in JavaScript, and linted with prettier default. You can apply lint with `npm run format`.