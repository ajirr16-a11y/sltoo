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
const depositIcon = document.getElementById("depositIcon");
const depositText = document.getElementById("depositText");
const sidebarMenu = document.getElementById("sidebarMenu");

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
// MENU LOGIN
// ==========================
function updateMenuLogin(){

    const isLogin = localStorage.getItem("isLogin") === "true";

    if(isLogin){

        depositIcon.className = "fas fa-credit-card";
        depositText.innerText = "Deposit";

        sidebarMenu.innerHTML = `
            <div class="item">🏠 Home</div>
            <div class="item">💳 Transaksi</div>
            <div class="item">👤 Akun Saya</div>
            <div class="item">🎁 Referral</div>
            <div class="item">🏷 Promosi</div>
            <div class="item" id="logoutBtn">🚪 Keluar</div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.onclick = () => {

            localStorage.removeItem("isLogin");

            updateMenuLogin();

            sidebar.classList.remove("active");
            overlay.classList.remove("active");

        };

    }else{

        depositIcon.className = "fab fa-android";
        depositText.innerText = "App";

        sidebarMenu.innerHTML = `
            <div class="item">🏠 Home</div>
            <div class="item">⬇ Download Aplikasi</div>
            <div class="item">🏷 Promosi</div>
            <div class="item">📞 Kontak Kami</div>
        `;

    }

}

updateMenuLogin();

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

function showPage(pageId){

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

}

const promoData = {
    1: {
        img: "assets/promo1.jpg",
        title: "VIP BONUS 1 JT | DEPOSIT 100 RIBU",
        desc: "Nikmati promo VIP Bonus 1 JT dengan minimal deposit 100 ribu. Promo berlaku untuk member yang memenuhi syarat dan ketentuan."
    },

    2: {
        img: "assets/promo2.jpg",
        title: "VIP BONUS 2 JT | DEPOSIT 200 RIBU",
        desc: "Promo VIP Bonus 2 JT berlaku untuk deposit mulai dari 200 ribu dengan kesempatan bonus lebih besar."
    }
};

function openPromoDetail(id){

    const promo = promoData[id];

    document.getElementById("detailImg").src = promo.img;
    document.getElementById("detailTitle").innerText = promo.title;
    document.getElementById("detailDesc").innerText = promo.desc;

    showPage("promoDetailPage");
}
