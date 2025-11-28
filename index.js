const TelegramBot = require('node-telegram-bot-api');

// سيأتي التوكن من Environment Variables في Render
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// قائمة الأزرار الأساسية
function mainMenu() {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "⭐ إرسال تقييم", callback_data: "review" }
                ],
                [
                    { text: "🍽️ قائمة الطعام", callback_data: "menu" }
                ],
                [
                    { text: "📅 حجز طاولة", callback_data: "booking" }
                ],
                [
                    { text: "💬 واتساب", url: "https://wa.me/213550123456" }
                ],
                [
                    { text: "🌐 موقع المطعم", url: "https://YOUR-WEBSITE.com" }
                ]
            ]
        }
    };
}

bot.on("message", msg => {
    const id = msg.chat.id;
    bot.sendMessage(id, "مرحباً بك في *مطعم ندى* 🍽️✨\nاختر أحد الخيارات:", {
        ...mainMenu(),
        parse_mode: "Markdown"
    });
});

// استقبال الضغط على الأزرار
bot.on("callback_query", query => {
    const id = query.message.chat.id;

    if (query.data === "menu") {
        bot.sendMessage(id,
            "🍽️ *قائمة الطعام*\n\n" +
            "• بيتزا كبيرة — 300 دج\n" +
            "• شاورما دجاج — 250 دج\n" +
            "• برغر لحم — 280 دج\n" +
            "• كسكس — 200 دج\n",
            { parse_mode: "Markdown", ...mainMenu() }
        );
    }

    if (query.data === "booking") {
        bot.sendMessage(id,
            "📅 *حجز طاولة*\n\n" +
            "أرسل اسمك + وقت الحجز\nوسيقوم فريقنا بالرد عليك.",
            { parse_mode: "Markdown", ...mainMenu() }
        );
    }

    if (query.data === "review") {
        bot.sendMessage(id,
            "⭐ *إرسال تقييم*\n\n" +
            "أرسل تقييمك الآن (من 1 إلى 5 نجوم) مع تعليقك.",
            { parse_mode: "Markdown", ...mainMenu() }
        );
    }
    
    // تأكيد استلام الضغط
    bot.answerCallbackQuery(query.id);
});

console.log("✅ البوت يعمل بنجاح!");
