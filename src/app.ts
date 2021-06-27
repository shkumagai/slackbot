import "./utils/env"
import { App, LogLevel } from "@slack/bolt";
import { isGenericMessageEvent } from "./utils/helper";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

// health check
app.message('hello', async ({ message, say }) => {
  if (!isGenericMessageEvent(message)) return;

  // console.log(message);
  // await say(`Hey there <@${message.user}>`);
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click'
        }
      }
    ],
    text: `Hey there <@${message.user}>`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button :-)`);
});

// launch process
(async () => {
  await app.start(Number(process.env.PORT) || 3000);

  console.log("⚡ Bolt app is running!");
})();
