import { Chat } from 'chat'
import { createDiscordAdapter } from '@chat-adapter/discord'
import { createRedisState } from '@chat-adapter/state-redis'
import { setTimeout } from 'timers/promises'

export const bot = new Chat({
  userName: "mybot",
  adapters: {
    discord: createDiscordAdapter(),
  },
  state: createRedisState(),
})

// bot.onNewMention(async (thread, message) => {
//   await thread.post("Hello from Discord!");
// });

const discord = bot.getAdapter("discord");
await discord.listThreads('')
// console.log(threads)
await discord.postMessage('', 'hello');
