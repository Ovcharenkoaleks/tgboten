const { Telegraf } = require('telegraf')

const bot = new Telegraf('5616726218:AAERTLFsPKOPEnZQmm_BHStGpZlFtk_aD6Q')

bot.start((ctx) => ctx.reply('Hello, I am your English learning bot!'))

bot.launch()
