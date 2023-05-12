import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';

const bot = new Telegraf('5616726218:AAERTLFsPKOPEnZQmm_BHStGpZlFtk_aD6Q');

bot.start((ctx) => ctx.reply('Hello, I am your English learning bot!'));

bot.on('text', async (ctx) => {
  const text = ctx.message.text;
  const translations = await getTranslations(text);
  const quizOptions = {
    question: `${text} - как переводится на английский?`,
    options: translations,
    correct_option_id: 0,
    explanation: `Перевод слова "${text}" на английский язык: ${translations[0]}`,
  };
  ctx.replyWithQuiz(quizOptions);
});

async function getTranslations(text) {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=ru|en`);
  const json = await response.json();
  const translations = [];

  if (json.responseData && json.responseData.translatedText) {
    translations.push(json.responseData.translatedText);
  }

  return translations;
}
