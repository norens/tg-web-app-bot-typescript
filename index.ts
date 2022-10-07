const TelegramBot = require('node-telegram-bot-api');

const dotenv = require('dotenv');
dotenv.config()

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
                    [{text: 'Create order', web_app: {url: webAppUrl + "/form"}}]
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

    if (msg?.web_app_data?.data)
        try {
            const data = JSON.parse(msg?.web_app_data?.data)

            await bot.sendMessage(chatId, 'Thank for data!')
            await bot.sendMessage(chatId, 'Your city:' + data?.city)
            await bot.sendMessage(chatId, 'Your city:' + data?.street)

            setTimeout(async () => {
                await bot.sendMessage(chatId,"You take all information in the chat")
            }, 3000)
        } catch (e) {
            console.log(e)
        }

});