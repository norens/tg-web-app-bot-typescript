const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config()

const token = process.env.TOKEN
const webAppUrl = process.env.WEB_APP_URL

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json())
app.use(cors())

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
                await bot.sendMessage(chatId, "You take all information in the chat")
            }, 3000)
        } catch (e) {
            console.log(e)
        }

});

app.post('/web-data', async (req, res) => {
    const {queryId, products, totalPrice} = req.body;

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: "Success order",
            input_message_content: {
                message_text: `Welcome you are take order on sum: ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000

app.listen(PORT, () => console.log('sever started on PORT:' + PORT))