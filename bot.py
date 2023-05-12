import telebot
import requests
import random

# Указываем токен, выданный ботом BotFather
bot = telebot.TeleBot("5616726218:AAERTLFsPKOPEnZQmm_BHStGpZlFtk_aD6Q")

# Функция для получения случайного варианта перевода слова
def get_random_translation(translations):
    random.shuffle(translations)
    return translations

# Обработка команды /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Привет! Введите слово на английском языке для викторины.")

# Обработка текстовых сообщений
@bot.message_handler(func=lambda message: True)
def echo_message(message):
    # Получаем слово для перевода
    word = message.text.lower()
    # Отправляем запрос на API переводчика и получаем ответ в формате JSON
    response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en_US/{word}").json()
    try:
        # Получаем список вариантов перевода слова
        translations = [meaning['definitions'][0]['definition'] for meaning in response[0]['meanings']]
        # Получаем случайный вариант перевода и создаем список из трех вариантов ответа
        answer_options = get_random_translation(translations)[:3]
        # Добавляем правильный вариант ответа в список и снова перемешиваем его
        answer_options.append(translations[0])
        random.shuffle(answer_options)
        # Создаем строку с вариантами ответа
        answer_text = '\n'.join([f"{i+1}) {answer_options[i]}" for i in range(len(answer_options))])
        # Отправляем пользователю вопрос с вариантами ответа
        bot.reply_to(message, f"Выберите правильный вариант перевода слова '{word}':\n\n{answer_text}")
    except:
        # Если слово не найдено, отправляем сообщение об ошибке
        bot.reply_to(message, f"К сожалению, слово '{word}' не найдено.")

# Запускаем бота
bot.polling()
