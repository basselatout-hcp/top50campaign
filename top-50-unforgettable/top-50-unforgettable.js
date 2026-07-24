/* =========================================================
   TOP 50 UNFORGETTABLE — interactions (vanilla JS)
   ========================================================= */
(function () {
    'use strict';

    /* ---- Countdown ----
       Submissions close August 16, 2026. Adjust the target below if the
       official close time/timezone differs. Using local browser time. */
    var TARGET = new Date('2026-08-16T23:59:59');

    var el = {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]')
    };

    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function tick() {
        if (!el.days) return;
        var diff = TARGET.getTime() - Date.now();

        if (diff <= 0) {
            el.days.textContent = el.hours.textContent =
                el.minutes.textContent = el.seconds.textContent = '00';
            clearInterval(timer);
            return;
        }

        var s = Math.floor(diff / 1000);
        el.days.textContent = pad(Math.floor(s / 86400));
        el.hours.textContent = pad(Math.floor((s % 86400) / 3600));
        el.minutes.textContent = pad(Math.floor((s % 3600) / 60));
        el.seconds.textContent = pad(s % 60);
    }

    tick();
    var timer = setInterval(tick, 1000);
})();
