const Telegraf = require('telegraf')
import fetch from 'node-fetch';

const bot = new Telegraf('<5616726218:AAERTLFsPKOPEnZQmm_BHStGpZlFtk_aD6Q>')

bot.start((ctx) => ctx.reply('Welcome!'))

bot.on('text', async (ctx) => {
  const text = ctx.message.text
  const translations = await getTranslations(text)
  ctx.replyWithQuiz(`${text} - как переводится на английский?`, translations)
})

async function getTranslations(text) {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=ru|en`)
  const json = await response.json()
  const translations = []
  if (json.responseData && json.responseData.translatedText) {
    translations.push(json.responseData.translatedText)
  }
  for (let i = 0; i < 3; i++) {
    const randText = Math.random().toString(36).substring(2)
    translations.push(randText)
  }
  return translations
}

bot.launch()
