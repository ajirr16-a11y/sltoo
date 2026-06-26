document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // AMBIL SEMUA ELEMENT
    // ==========================
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const jackpotEl = document.getElementById("jackpot");
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const saldoEl = document.getElementById("saldo");

    // ==========================
    // SLIDER
    // ==========================
    let index = 0;
    let sliderInterval;

    function showSlide(i) {
        if (!slides.length) return;

        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[i].classList.add("active");
        if (dots[i]) dots[i].classList.add("active");
    }

    function startSlider() {
        sliderInterval = setInterval(() => {
            index = (index + 1) % slides.length;
            showSlide(index);
        }, 3000);
    }

    if (slides.length) {
        showSlide(index);
        startSlider();
    }

    // DOT CLICK
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showSlide(index);
        });
    });

    // ==========================
    // JACKPOT RUNNING
    // ==========================
    let jackpotValue = 49296928623;

    function formatRupiah(num) {
        return num.toLocaleString("id-ID");
    }

    function updateJackpot() {
        if (!jackpotEl) return;

        let random = Math.floor(Math.random() * 5000) + 1000;
        jackpotValue += random;

        jackpotEl.innerText = formatRupiah(jackpotValue);
    }

    setInterval(updateJackpot, 1500);

    // ==========================
    // SIDEBAR
    // ==========================
    if (menuBtn && sidebar && overlay) {

        menuBtn.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });

        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });

    }

    // ==========================
    // UPDATE SALDO
    // ==========================
    window.updateSaldo = function () {
        if (!saldoEl) return;

        let current = parseInt(saldoEl.innerText.replace(/\./g, ""));
        let random = Math.floor(Math.random() * 50000);

        current += random;
        saldoEl.innerText = current.toLocaleString("id-ID");
    };

});
