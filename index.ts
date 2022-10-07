const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN
const webAppUrl = process.env.WEB_APP_URL

const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg: any) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start")
        await bot.sendMessage(chatId, 'Down shop btn wrote form', {
            reply_markup: {
                keyboard: [
                    [{text: 'Create order', web_app: {url: webAppUrl}}]
                ]
            }
        });

    if (text === "/start")
        await bot.sendMessage(chatId, 'Visit our web site and create order', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Create order', web_app: {url: webAppUrl}}]
                ]
            }
        });
});