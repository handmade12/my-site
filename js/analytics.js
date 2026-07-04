/* ============================================
   Analytics — Telegram-уведомления о визитах
   ============================================ */
'use strict';

const BOT_TOKEN = '8899359683:AAE7opxV56Ep9b5NvK_6M71ti6NpOrwTI_o';
const CHAT_ID = '720411560';

(function() {
  // Один раз за сессию
  if (sessionStorage.getItem('analytics_sent')) return;
  sessionStorage.setItem('analytics_sent', '1');

  const page = window.location.pathname.replace(/\/$/, '') || '/';
  const now = new Date();
  const timeStr = now.toLocaleString('ru-RU', { 
    hour: '2-digit', minute: '2-digit',
    day: 'numeric', month: 'short'
  });
  const ua = navigator.userAgent;

  // Браузер
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  // ОС
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone')) os = 'iOS';

  // Тип устройства
  let device = '💻 Desktop';
  if (ua.includes('Mobile')) device = '📱 Mobile';
  else if (ua.includes('Tablet')) device = '📟 Tablet';

  // Размер экрана
  const screenSize = `${screen.width}x${screen.height}`;

  // Откуда пришёл
  const referrer = document.referrer || '—';

  const msg = `🖥 <b>Новый посетитель</b>
📄 Страница: ${page}
🕐 Время: ${timeStr}
🌐 Язык: ${navigator.language}
🧩 Браузер: ${browser} · ${os}
${device} · ${screenSize}
🔗 Откуда: ${referrer}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: 'HTML',
      disable_notification: true
    })
  }).catch(() => {});

  // Через 15 секунд — сколько времени на странице
  setTimeout(() => {
    const t = Math.round((Date.now() - now.getTime()) / 1000);
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `⏱ <b>Провёл ${t} сек</b> на ${page}`,
        parse_mode: 'HTML',
        disable_notification: true
      })
    }).catch(() => {});
  }, 15000);
})();
