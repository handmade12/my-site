/* ============================================
   i18n — Русский / English
   ============================================ */
'use strict';

const i18n = {
  ru: {
    /* Nav */
    nav_about: 'Обо мне',
    nav_projects: 'Проекты',
    nav_arduino: 'Arduino',
    nav_ideas: 'Идеи',
    nav_contact: 'Контакты',
    lang_btn: 'EN',

    /* Hero */
    hero_badge: 'Россия · 19 лет · Студент',
    hero_title: 'Привет! Я <span class="highlight">Кирилл</span><br />Разбираю IT на практике',
    hero_desc: 'Arduino, BadUSB, Telegram-боты — учусь через собственные проекты. Люблю железо, игры и когда всё работает.',
    hero_btn_projects: 'Мои проекты →',
    hero_btn_about: 'Обо мне',

    /* About */
    about_label: 'Обо мне',
    about_title: 'Кто я и чем живу',
    about_p1: 'Мне 19 лет, я живу в России. Постоянно пробую новые активности, ищу интересные направления и стараюсь найти своё дело, чтобы уже не отпускать его.',
    about_p2: 'Мой дядя программист, он и научил основам. Пробовал HTML/CSS/JS, Python — не особо заходило. А недавно купил Arduino и подорвался: Pro Micro, BadUSB, эксперименты с PowerShell и ASCII-артом. А до этого написал Telegram-бота <strong>MRX TRAINING BOT</strong>. Пока это просто хобби, но идей — вагон.',
    about_p3: 'Ещё я музыкальный — 9 лет музыкальной школы: фортепиано и вокал, получил красный диплом.',
    about_p4: 'Со спортом я тоже дружу. В детстве успел перепробовать кучу всего: бокс, самбо, футбол, паркур. Сейчас стараюсь поддерживать форму в тренажёрном зале, иногда выбираюсь на скалолазание, а недавно начал учиться стрельбе из классического лука Samick Polaris.',

    /* Projects section */
    projects_label: 'Проекты',
    projects_title: 'Мои проекты',
    projects_subtitle: 'Пока что негусто, но без первого шага не бывает второго.',

    /* Project card: MRX bot */
    project_bot_tag1: 'Python',
    project_bot_tag2: 'Telegram API',
    project_bot_tag3: 'Бот',
    project_bot_title: 'MRX TRAINING BOT',
    project_bot_desc: 'Telegram-бот для тренировок: логирование подходов, статистика, напоминалки. Написан на Python. Сейчас дорабатывается — хочу добавить графики прогресса и автопланы.',
    project_bot_btn: 'Открыть в Telegram →',

    /* Arduino section */
    arduino_label: 'На Arduino',
    arduino_title: 'Эксперименты с микроконтроллерами',
    arduino_subtitle: 'Недавно увлёкся, но уже есть пара занятных штук.',

    /* BadUSB card */
    arduino_badusb_tag1: 'Pro Micro',
    arduino_badusb_tag2: 'BadUSB',
    arduino_badusb_tag3: 'HID',
    arduino_badusb_title: 'BadUSB на Pro Micro',
    arduino_badusb_desc: 'Arduino Pro Micro притворяется USB-клавиатурой. Открывает PowerShell, выводит ASCII-анимацию Never Gonna Give You Up, показывает сообщения в txt, запускает ссылки.',
    code_lang_badusb: 'C++ (Arduino Pro Micro)',

    /* Buzzer card */
    arduino_buzzer_tag1: 'Arduino',
    arduino_buzzer_tag2: 'Звук',
    arduino_buzzer_title: 'Кузнечик — мелодия на пищалке',
    arduino_buzzer_desc: 'Первый проект после покупки набора. Пьезопищалка (buzzer) играет мелодию «В траве сидел кузнечик» по нажатию кнопки. База, но с неё всё началось.',
    code_lang_buzzer: 'C++ (Arduino)',

    /* Ideas section */
    ideas_label: 'В планах',
    ideas_title: 'Что хочу сделать',
    ideas_subtitle: 'Идей куча, руки дойдут — реализую.',

    ideas_card_tag1: 'Arduino',
    ideas_card_tag2: 'Электроника',
    ideas_card_tag3: 'ПО',
    ideas_card_title: 'Ближайшие планы',
    ideas_card_desc: 'Проекты, которые хочу запилить в ближайшее время:',
    ideas_item1: '🔊 Отвлекающее устройство — Bluetooth-модуль, удалённый запуск звука',
    ideas_item2: '🚗 Джампер — машинка с управлением через ПК или телефон',
    ideas_item3: '💡 Умный свет — управление освещением в комнате с голосом/кнопкой',
    ideas_item4: '🎤 Смена голоса — через ПК, обработать микрофон в реальном времени',
    ideas_item5: '⚡ BadUSB: перезагрузка ПК, перехват камеры, неуязвимые видео',

    /* Footer */
    footer_text: '© 2026 Кирилл Сорокин. Сделано с ❤️',

    /* Shared buttons */
    btn_show_code: 'Показать код',
    btn_hide_code: 'Скрыть код',
    btn_copy: '📋 Копировать',
    btn_copied: '✓ Скопировано!',
  },

  en: {
    /* Nav */
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_arduino: 'Arduino',
    nav_ideas: 'Ideas',
    nav_contact: 'Contact',
    lang_btn: 'RU',

    /* Hero */
    hero_badge: 'Russia · 19 · Student',
    hero_title: 'Hi! I\'m <span class="highlight">Kirill</span><br />Learning IT by doing',
    hero_desc: 'Arduino, BadUSB, Telegram bots — learning through hands-on projects. I love hardware, games, and things that just work.',
    hero_btn_projects: 'My Projects →',
    hero_btn_about: 'About Me',

    /* About */
    about_label: 'About Me',
    about_title: 'Who I Am',
    about_p1: 'I\'m 19, living in Russia. I constantly try new activities, look for interesting directions, and try to find my thing — something I won\'t want to let go of.',
    about_p2: 'My uncle is a programmer, he taught me the basics. Tried HTML/CSS/JS, Python — didn\'t really click. But recently I bought an Arduino and got hooked: Pro Micro, BadUSB, PowerShell experiments, ASCII art. Before that I built a Telegram bot <strong>MRX TRAINING BOT</strong>. It\'s just a hobby for now, but I have tons of ideas.',
    about_p3: 'I\'m also musical — 9 years of music school: piano and vocals, graduated with honors.',
    about_p4: 'I\'m into sports too. Tried a bunch as a kid: boxing, sambo, football, parkour. Now I hit the gym, climb sometimes, and recently started learning traditional bow archery with my uncle\'s Samick Polaris.',

    /* Projects section */
    projects_label: 'Projects',
    projects_title: 'My Projects',
    projects_subtitle: 'Not much yet, but every journey starts with a single step.',

    /* Project card: MRX bot */
    project_bot_tag1: 'Python',
    project_bot_tag2: 'Telegram API',
    project_bot_tag3: 'Bot',
    project_bot_title: 'MRX TRAINING BOT',
    project_bot_desc: 'A Telegram bot for workouts: log sets, stats, reminders. Written in Python. Currently working on adding progress charts and auto-plans.',
    project_bot_btn: 'Open in Telegram →',

    /* Arduino section */
    arduino_label: 'Arduino',
    arduino_title: 'Microcontroller Experiments',
    arduino_subtitle: 'Just started, but already have a few fun things going.',

    /* BadUSB card */
    arduino_badusb_tag1: 'Pro Micro',
    arduino_badusb_tag2: 'BadUSB',
    arduino_badusb_tag3: 'HID',
    arduino_badusb_title: 'BadUSB on Pro Micro',
    arduino_badusb_desc: 'Arduino Pro Micro posing as a USB keyboard. Opens PowerShell, prints ASCII animation of Never Gonna Give You Up, drops txt messages, opens links.',
    code_lang_badusb: 'C++ (Arduino Pro Micro)',

    /* Buzzer card */
    arduino_buzzer_tag1: 'Arduino',
    arduino_buzzer_tag2: 'Sound',
    arduino_buzzer_title: 'Grasshopper — buzzer melody',
    arduino_buzzer_desc: 'First project after getting the starter kit. Piezo buzzer plays "Grasshopper" melody on button press. Simple, but that\'s where it all began.',
    code_lang_buzzer: 'C++ (Arduino)',

    /* Ideas section */
    ideas_label: 'Plans',
    ideas_title: 'What I Want to Build',
    ideas_subtitle: 'Plenty of ideas, just need the time.',

    ideas_card_tag1: 'Arduino',
    ideas_card_tag2: 'Hardware',
    ideas_card_tag3: 'Software',
    ideas_card_title: 'Upcoming Plans',
    ideas_card_desc: 'Projects I want to build soon:',
    ideas_item1: '🔊 Distraction device — Bluetooth module, remote sound trigger',
    ideas_item2: '🚗 Jumper — RC car controlled via PC or phone',
    ideas_item3: '💡 Smart light — voice/button controlled room lighting',
    ideas_item4: '🎤 Voice changer — real-time microphone processing on PC',
    ideas_item5: '⚡ BadUSB: PC reboot, camera hijack, unclosable videos',

    /* Footer */
    footer_text: '© 2026 Kirill Sorokin. Made with ❤️',

    /* Shared buttons */
    btn_show_code: 'Show Code',
    btn_hide_code: 'Hide Code',
    btn_copy: '📋 Copy',
    btn_copied: '✓ Copied!',
  }
};
