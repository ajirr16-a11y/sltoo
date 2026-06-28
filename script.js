document.addEventListener("DOMContentLoaded", () => {

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

    let index = 0;

    function showSlide(i){
        if(!slides.length) return;

        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[i].classList.add("active");

        if(dots[i]){
            dots[i].classList.add("active");
        }
    }

    if(slides.length){
        showSlide(index);

        setInterval(() => {
            index = (index + 1) % slides.length;
            showSlide(index);
        }, 3000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showSlide(index);
        });
    });

    function closeSidebar(){
        if(sidebar) sidebar.classList.remove("active");
        if(overlay) overlay.classList.remove("active");
    }

    if(menuBtn && sidebar && overlay){
        menuBtn.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });

        overlay.addEventListener("click", closeSidebar);
    }

    function setActiveNav(menu){

        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        const navHome = document.getElementById("navHome");
        const navPromo = document.getElementById("navPromo");
        const navGame = document.getElementById("navGame");
        const navApp = document.getElementById("navApp");
        const navChat = document.getElementById("navChat");

        if(navGame) navGame.classList.remove("active");
        if(navApp) navApp.classList.remove("active");
        if(navChat) navChat.classList.remove("active");

        if(menu === "home" && navHome) navHome.classList.add("active");
        if(menu === "promo" && navPromo) navPromo.classList.add("active");
        if(menu === "game" && navGame) navGame.classList.add("active");
        if(menu === "app" && navApp) navApp.classList.add("active");
        if(menu === "chat" && navChat) navChat.classList.add("active");
    }

    window.showPage = function(pageId, menu = null){

        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });

        const page = document.getElementById(pageId);

        if(page){
            page.classList.add("active");
        }

        if(menu){
            setActiveNav(menu);
        }

        closeSidebar();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    };

    window.goToGames = function(){

        window.showPage("homePage", "game");

        setTimeout(() => {
            const section = document.querySelector(".section");

            if(section){
                section.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });
            }
        }, 150);
    };

  window.handleAppDeposit = function(){

    const isLogin = localStorage.getItem("isLogin") === "true";

    if(isLogin){
        showPage("depositPage","app");
    }else{
        showPage("appPage","app");
    }

};

    const promoData = {
        1: {
            img: "assets/promo1.jpg",
            title: "VIP BONUS 1JT | DEPOSIT 100RB - 599RB",
            desc: "Nikmati promo VIP Bonus 1JT dengan deposit mulai dari 100RB sampai 599RB. Promo berlaku untuk semua member dengan syarat dan ketentuan berlaku."
        },
        2: {
            img: "assets/promo2.jpg",
            title: "VIP BONUS 1,5JT | DEPOSIT 600RB - 999RB",
            desc: "Nikmati promo VIP Bonus 1,5JT dengan deposit mulai dari 600RB sampai 999RB. Promo berlaku untuk semua member dengan syarat dan ketentuan berlaku."
        },
        3: {
            img: "assets/promo3.jpg",
            title: "VIP BONUS 2JT | DEPOSIT 1JT - 1,9JT",
            desc: "Nikmati promo VIP Bonus 2JT dengan deposit mulai dari 1JT sampai 1,9JT. Promo berlaku untuk semua member dengan syarat dan ketentuan berlaku."
        },
        4: {
            img: "assets/promo4.jpg",
            title: "VIP BONUS 3JT | DEPOSIT 2JT - 3JT",
            desc: "Nikmati promo VIP Bonus 3JT dengan deposit mulai dari 2JT sampai 3JT. Promo berlaku untuk semua member dengan syarat dan ketentuan berlaku."
        }
    };

    window.openPromoDetail = function(id){

        const promo = promoData[id];
        if(!promo) return;

        document.getElementById("detailImg").src = promo.img;
        document.getElementById("detailTitle").innerText = promo.title;
        document.getElementById("detailDesc").innerText = promo.desc;

        window.showPage("promoDetailPage", "promo");
    };

    function updateLoginUI(){

        const isLogin = localStorage.getItem("isLogin") === "true";
      const sidebarWelcomeText = document.getElementById("sidebarWelcomeText");
    const forgotPassword = document.getElementById("forgotPassword");
        const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

        const headerDaftarBtn = document.getElementById("headerDaftarBtn");
        const sidebarLoginBtn = document.getElementById("sidebarLoginBtn");
        const sidebarDaftarBtn = document.getElementById("sidebarDaftarBtn");

        if(isLogin){

          if(sidebarWelcomeText){
        sidebarWelcomeText.style.display = "none";
    }

    if(forgotPassword){
        forgotPassword.style.display = "none";
    }
            if(headerDaftarBtn) headerDaftarBtn.classList.add("hidden");
            if(sidebarLoginBtn) sidebarLoginBtn.classList.add("hidden");
            if(sidebarDaftarBtn) sidebarDaftarBtn.classList.add("hidden");

            if(savedUser && saldoEl){
                saldoEl.innerText = Number(savedUser.saldo || 0).toLocaleString("id-ID");
            }

        }else{

          if(sidebarWelcomeText){
        sidebarWelcomeText.style.display = "block";
    }

    if(forgotPassword){
        forgotPassword.style.display = "block";
    }
            if(headerDaftarBtn) headerDaftarBtn.classList.remove("hidden");
            if(sidebarLoginBtn) sidebarLoginBtn.classList.remove("hidden");
            if(sidebarDaftarBtn) sidebarDaftarBtn.classList.remove("hidden");

            if(saldoEl){
                saldoEl.innerText = "0";
            }
        }
    }

    function updateMenuLogin(){

        const isLogin = localStorage.getItem("isLogin") === "true";

        if(!depositIcon || !depositText || !sidebarMenu) return;

        if(isLogin){

            depositIcon.className = "fas fa-credit-card";
            depositText.innerText = "Deposit";

            sidebarMenu.innerHTML = `
                <div class="item" onclick="showPage('homePage','home')">🏠 Home</div>
                <div class="item">💳 Transaksi</div>
                <div class="item">👤 Akun Saya</div>
                <div class="item">🎁 Referral</div>
                <div class="item" onclick="showPage('promoPage','promo')">🏷 Promosi</div>
                <div class="item" id="logoutBtn">🚪 Keluar</div>
            `;

            const logoutBtn = document.getElementById("logoutBtn");

            if(logoutBtn){
                logoutBtn.onclick = () => {
                    localStorage.removeItem("isLogin");
                    localStorage.removeItem("currentUser");

                    updateMenuLogin();
                    updateLoginUI();

                    closeSidebar();
                    showPage("homePage","home");
                };
            }

        }else{

            depositIcon.className = "fab fa-android";
            depositText.innerText = "App";

            sidebarMenu.innerHTML = `
                <div class="item" onclick="showPage('homePage','home')">🏠 Home</div>
                <div class="item" onclick="showPage('appPage','app')">⬇ Download Aplikasi</div>
                <div class="item" onclick="showPage('promoPage','promo')">🏷 Promosi</div>
                <div class="item">📞 Kontak Kami</div>
            `;
        }
    }

    window.updateSaldo = function(){
        if(!saldoEl) return;

        const savedUser = JSON.parse(localStorage.getItem("registeredUser")) || {};
        saldoEl.innerText = Number(savedUser.saldo || 0).toLocaleString("id-ID");
    };

    const serverList = {
        thailand: { name:"🇹🇭 Thailand Server", min:18, max:35 },
        malaysia: { name:"🇲🇾 Malaysia Server", min:20, max:38 },
        singapore: { name:"🇸🇬 Singapore Server", min:12, max:25 },
        laos: { name:"🇱🇦 Laos Server", min:25, max:45 },
        indonesia: { name:"🇮🇩 Indonesia Server", min:15, max:30 },
        asia: { name:"🌏 Asia Global Server", min:22, max:50 }
    };

    function randomPing(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.openServer = function(){
        document.getElementById("serverSheet").classList.add("show");
    };

    window.closeServer = function(){
        document.getElementById("serverSheet").classList.remove("show");
    };

    window.changeServer = function(key){

        const server = serverList[key];
        if(!server) return;

        window.closeServer();

        const popup = document.getElementById("loadingServer");
        const bar = document.getElementById("loadingProgress");
        const title = document.getElementById("loadingTitle");
        const text = document.getElementById("loadingText");

        popup.classList.add("show");

        bar.style.width = "0%";
        title.innerHTML = "Menghubungkan...";
        text.innerHTML = "Memeriksa server...";

        let progress = 0;

        const loading = setInterval(() => {

            progress += 5;
            bar.style.width = progress + "%";

            if(progress < 30){
                text.innerHTML = "Memeriksa server...";
            }else if(progress < 60){
                text.innerHTML = "Sinkronisasi data...";
            }else if(progress < 90){
                text.innerHTML = "Mengoptimalkan koneksi...";
            }else{
                text.innerHTML = "Menyelesaikan koneksi...";
            }

            if(progress >= 100){

                clearInterval(loading);

                const ping = randomPing(server.min, server.max);

                document.getElementById("serverName").innerHTML = server.name;
                document.getElementById("serverPing").innerHTML = ping + " ms";

                if(navigator.vibrate){
                    navigator.vibrate(40);
                }

                title.innerHTML = "Berhasil Terhubung";
                text.innerHTML = server.name + " • " + ping + " ms";

                setTimeout(() => {
                    popup.classList.remove("show");
                }, 700);
            }

        }, 90);
    };

    const bankList = [
        "BCA","BRI","MANDIRI","BNI","BSI","BTN",
        "CIMB","PERMATA","PANIN","OCBC"
    ];

    const ewalletList = [
        "DANA","OVO","GoPay","ShopeePay","LinkAja","AstraPay"
    ];

    let currentMethod = "bank";
    let captchaValue = "";

    window.showToast = function(title, text, type = "warning"){

        const toast = document.getElementById("toast");
        const icon = document.getElementById("toastIcon");
        const toastTitle = document.getElementById("toastTitle");
        const toastText = document.getElementById("toastText");

        if(!toast) return;

        toastTitle.innerHTML = title;
        toastText.innerHTML = text;

        if(type === "success"){
            icon.innerHTML = '<i class="fas fa-circle-check"></i>';
            icon.style.background = "linear-gradient(180deg,#45d95d,#1f8f35)";
        }else if(type === "error"){
            icon.innerHTML = '<i class="fas fa-circle-xmark"></i>';
            icon.style.background = "linear-gradient(180deg,#ff5d5d,#c11717)";
        }else{
            icon.innerHTML = '<i class="fas fa-circle-exclamation"></i>';
            icon.style.background = "linear-gradient(180deg,#ffd96d,#d4892b)";
        }

        toast.classList.add("show");

        if(navigator.vibrate){
            navigator.vibrate(60);
        }

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    };

    window.setMethod = function(method, btn = null){

        currentMethod = method;

        document.querySelectorAll(".method-tabs button").forEach(button => {
            button.classList.remove("active");
        });

        if(btn){
            btn.classList.add("active");
        }else if(event && event.target){
            event.target.classList.add("active");
        }

        document.getElementById("methodLabel").innerText =
            method === "bank" ? "Pilih Bank" : "Pilih E-Wallet";

        document.getElementById("paymentText").innerText =
            method === "bank" ? "-- Pilih Bank --" : "-- Pilih E-Wallet --";

        renderPaymentList();
    };

    window.togglePaymentList = function(){

        const list = document.getElementById("paymentList");
        if(!list) return;

        renderPaymentList();
        list.classList.toggle("show");
    };

    function renderPaymentList(){

        const list = currentMethod === "bank" ? bankList : ewalletList;
        const box = document.getElementById("paymentList");

        if(!box) return;

        box.innerHTML = list.map(item => `
            <div onclick="selectPayment('${item}')">
                <span>${item}</span>
                <i class="fas fa-check"></i>
            </div>
        `).join("");
    }

    window.selectPayment = function(item){

        document.getElementById("paymentText").innerText = item;
        document.getElementById("paymentList").classList.remove("show");

        showToast(
            "Metode Dipilih",
            item + " berhasil dipilih.",
            "success"
        );
    };

    document.addEventListener("input", function(e){

        if(e.target.id === "phoneInput"){

            let value = e.target.value.replace(/\D/g,"");

            if(value.startsWith("0")){
                value = value.substring(1);
            }

            if(value.length > 0 && value[0] !== "8"){

                e.target.classList.add("shake");

                showToast(
                    "Nomor Tidak Valid",
                    "Nomor ponsel harus diawali angka 0 atau 8.",
                    "error"
                );

                if(navigator.vibrate){
                    navigator.vibrate(80);
                }

                setTimeout(() => {
                    e.target.classList.remove("shake");
                }, 350);

                value = "";
            }

            e.target.value = value.slice(0,13);
        }

    });

    window.generateCaptcha = function(){

        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        captchaValue = "";

        for(let i = 0; i < 6; i++){
            captchaValue += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );
        }

        const captchaCode = document.getElementById("captchaCode");

        if(captchaCode){
            captchaCode.innerText = captchaValue;
        }
    };

    window.submitRegister = function(){

        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const confirm = document.getElementById("regConfirm").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const phone = document.getElementById("phoneInput").value.trim();
        const owner = document.getElementById("regOwner").value.trim();
        const rekening = document.getElementById("regRekening").value.trim();
        const payment = document.getElementById("paymentText").innerText.trim();
        const captchaInput = document.getElementById("captchaInput").value.trim().toUpperCase();

        if(!username || !password || !confirm || !email || !phone || !owner || !rekening || !captchaInput){
            showToast("Form Belum Lengkap","Silakan isi seluruh data terlebih dahulu.","warning");
            return;
        }

        if(username.length < 6 || username.length > 15){
            showToast("Username Tidak Valid","Nama pengguna harus 6 sampai 15 karakter.","error");
            return;
        }

        if(password.length < 8){
            showToast("Password Terlalu Pendek","Kata sandi minimal 8 karakter.","error");
            return;
        }

        if(password !== confirm){
            showToast("Password Tidak Sama","Konfirmasi kata sandi tidak sesuai.","error");
            return;
        }

        if(!email.includes("@") || !email.includes(".")){
            showToast("Email Tidak Valid","Masukkan alamat email yang benar.","error");
            return;
        }

        if(phone[0] !== "8" || phone.length < 9){
            showToast("Nomor Tidak Valid","Nomor ponsel harus diawali 0 atau 8.","error");
            return;
        }

        if(payment.includes("Pilih")){
            showToast("Metode Belum Dipilih","Silakan pilih Bank atau E-Wallet terlebih dahulu.","warning");
            return;
        }

        if(captchaInput !== captchaValue){
            showToast("Captcha Salah","Kode captcha tidak sesuai. Silakan coba lagi.","error");
            window.generateCaptcha();
            return;
        }

        const newUser = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            owner: owner,
            rekening: rekening,
            payment: payment,
            saldo: 0
        };

        localStorage.setItem("registeredUser", JSON.stringify(newUser));

        showToast(
            "Pendaftaran Berhasil",
            "Akun berhasil dibuat. Silakan login.",
            "success"
        );

        setTimeout(() => {
            showPage("loginPage","login");
        }, 1200);
    };

    window.togglePassword = function(inputId, icon){

        const input = document.getElementById(inputId);

        if(input.type === "password"){
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }else{
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    };

    window.toggleLoginPassword = function(){
        const input = document.getElementById("loginPassword");
        const icon = document.querySelector("#loginPage .toggle-pass");

        if(input.type === "password"){
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }else{
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    };

    window.submitLogin = function(){

        const user = document.getElementById("loginUser").value.trim();
        const pass = document.getElementById("loginPassword").value.trim();

        const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

        if(!user || !pass){
            showToast("Login Gagal","Silakan isi username atau nomor HP dan kata sandi.","warning");
            return;
        }

        if(!savedUser){
            showToast("Akun Belum Terdaftar","Silakan daftar terlebih dahulu sebelum login.","error");
            return;
        }

        const validUser =
            user === savedUser.username ||
            user === savedUser.phone ||
            user === "0" + savedUser.phone;

        if(!validUser || pass !== savedUser.password){
            showToast("Login Gagal","Username, nomor HP, atau kata sandi salah.","error");
            return;
        }

        localStorage.setItem("isLogin","true");
        localStorage.setItem("currentUser", savedUser.username);

        showToast(
            "Login Berhasil",
            "Selamat datang kembali, " + savedUser.username + ".",
            "success"
        );

        setTimeout(() => {
            updateMenuLogin();
            updateLoginUI();
            showPage("homePage","home");
        }, 1000);
    };


  const bankAccounts = {
    BCA: {
        bank: "BCA",
        rekening: "1234567890",
        nama: "PG4G OFFICIAL"
    },
    BRI: {
        bank: "BRI",
        rekening: "9876543210",
        nama: "PG4G OFFICIAL"
    },
    MANDIRI: {
        bank: "MANDIRI",
        rekening: "1122334455",
        nama: "PG4G OFFICIAL"
    },
    BNI: {
        bank: "BNI",
        rekening: "5566778899",
        nama: "PG4G OFFICIAL"
    }
};

window.goDepositProcess = function(){

    const amountRaw =
        document.getElementById("depositNominal").value.replace(/[^0-9]/g,"");

    const amount = Number(amountRaw);
    const bank = selectedDepBank;
    const bonus = selectedDepBonus;

    if(!amount || amount < 50000){
        showToast("Nominal Tidak Valid","Minimal deposit Rp 50.000.","warning");
        return;
    }

    if(!bank){
        showToast("Bank Belum Dipilih","Silakan pilih bank terlebih dahulu.","warning");
        return;
    }

    document.getElementById("processAmount").innerText =
        "IDR " + amount.toLocaleString("id-ID");

    const bankDetail = document.getElementById("bankDetail");
    const qrisArea = document.getElementById("qrisArea");

    if(bank === "QRIS"){
        bankDetail.innerHTML = `
            <b>Metode:</b> QRIS<br>
            <b>Nominal:</b> IDR ${amount.toLocaleString("id-ID")}<br>
            <b>Bonus:</b> ${bonus}
        `;

        qrisArea.style.display = "block";
    }else{
        const data = bankAccounts[bank];

        bankDetail.innerHTML = `
            <b>Bank:</b> ${data.bank}<br>
            <b>No Rekening:</b> ${data.rekening}<br>
            <b>Atas Nama:</b> ${data.nama}<br>
            <b>Nominal:</b> IDR ${amount.toLocaleString("id-ID")}<br>
            <b>Bonus:</b> ${bonus}
        `;

        qrisArea.style.display = "none";
    }

    showPage("depositProcessPage","app");
};

  let selectedDepBank = "";
let selectedDepBonus = "Tanpa Bonus";

window.toggleDepList = function(id){
    document.querySelectorAll(".dep-list").forEach(list => {
        if(list.id !== id){
            list.classList.remove("show");
        }
    });

    document.getElementById(id).classList.toggle("show");
};

window.selectDepBank = function(value, label){
    selectedDepBank = value;
    document.getElementById("depBankText").innerText = label;
    document.getElementById("bankListBox").classList.remove("show");
};

window.selectDepBonus = function(value, label){
    selectedDepBonus = value;
    document.getElementById("depBonusText").innerText = label;
    document.getElementById("bonusListBox").classList.remove("show");
};

const nominal = document.getElementById("depositNominal");

if(nominal){
    nominal.addEventListener("input", function(){
        let angka = this.value.replace(/[^0-9]/g,"");

        if(angka === ""){
            this.value = "";
            return;
        }

        this.value = "Rp " + Number(angka).toLocaleString("id-ID");
    });
}

  window.openWithdrawPage = function(){

    const savedUser =
        JSON.parse(localStorage.getItem("registeredUser"));

    if(!savedUser){
        showToast(
            "Data Tidak Ditemukan",
            "Silakan login atau daftar terlebih dahulu.",
            "warning"
        );
        return;
    }

    const saldo = Number(savedUser.saldo || 0);

    document.getElementById("withdrawSaldo").innerText =
        saldo.toLocaleString("id-ID");

    document.getElementById("withdrawBankInfo").innerHTML = `
        <b>Metode Terdaftar:</b> ${savedUser.payment || "-"}<br>
        <b>Nama Pemilik:</b> ${savedUser.owner || "-"}<br>
        <b>No Rekening / E-Wallet:</b> ${savedUser.rekening || "-"}
    `;

    showPage("withdrawPage","app");
};

const withdrawNominal =
    document.getElementById("withdrawNominal");

if(withdrawNominal){

    withdrawNominal.addEventListener("input", function(){

        let angka = this.value.replace(/[^0-9]/g,"");

        if(angka === ""){
            this.value = "";
            return;
        }

        this.value =
            "Rp " + Number(angka).toLocaleString("id-ID");

    });

}

window.submitWithdraw = function(){

    const savedUser =
        JSON.parse(localStorage.getItem("registeredUser"));

    const amountRaw =
        document.getElementById("withdrawNominal")
        .value
        .replace(/[^0-9]/g,"");

    const amount = Number(amountRaw);
    const saldo = Number(savedUser?.saldo || 0);

    if(!amount || amount < 10000){
        showToast(
            "Nominal Tidak Valid",
            "Minimal tarik dana Rp 10.000.",
            "warning"
        );
        return;
    }

    if(amount > saldo){
        showToast(
            "Saldo Tidak Cukup",
            "Nominal penarikan melebihi saldo utama.",
            "error"
        );
        return;
    }

    savedUser.saldo = saldo - amount;

    localStorage.setItem(
        "registeredUser",
        JSON.stringify(savedUser)
    );

    showToast(
        "Penarikan Diproses",
        "Permintaan tarik dana berhasil dikirim.",
        "success"
    );

    updateLoginUI();
    window.updateSaldo();

    setTimeout(() => {
        showPage("homePage","home");
    }, 1000);
};

  window.submitDepositProof = function(){

    const proof = document.getElementById("depProof").files[0];

    if(!proof){
        showToast(
            "Bukti Belum Ada",
            "Silakan upload bukti pembayaran terlebih dahulu.",
            "warning"
        );
        return;
    }

    const amountRaw =
        document.getElementById("processAmount")
        .innerText
        .replace(/[^0-9]/g,"");

    const amount = Number(amountRaw);

    const savedUser =
        JSON.parse(localStorage.getItem("registeredUser")) || {};

    savedUser.saldo =
        Number(savedUser.saldo || 0) + amount;

    localStorage.setItem(
        "registeredUser",
        JSON.stringify(savedUser)
    );

    showToast(
        "Deposit Berhasil",
        "Saldo berhasil masuk ke akun Anda.",
        "success"
    );

    updateLoginUI();
    window.updateSaldo();

    setTimeout(() => {
        showPage("homePage","home");
    }, 1000);
};

window.openGameMenu = function(type){

    const isLogin =
        localStorage.getItem("isLogin") === "true";

    if(!isLogin){
        showToast(
            "Akses Ditolak",
            "Kamu belum login atau belum memiliki akun.",
            "warning"
        );
        return;
    }

    if(type === "slot"){
        showPage("slotPage","game");
        return;
    }

    showToast(
        "Maintenance",
        "Provider ini sedang maintenance.",
        "warning"
    );
};

window.showMaintenance = function(){
    showToast(
        "Maintenance",
        "Provider ini sedang maintenance.",
        "warning"
    );
};

window.playSlotGame = function(){

    const user =
        JSON.parse(localStorage.getItem("registeredUser")) || {};

    const saldo = Number(user.saldo || 0);

    if(saldo <= 0){
        showToast(
            "Saldo Tidak Cukup",
            "Anda tidak memiliki saldo untuk bermain.",
            "warning"
        );
        return;
    }

    window.location.href = "https://wd189vvip.my.id/mobile/index.php?page=slot_pragmatic";
};

    window.generateCaptcha();
    renderPaymentList();
    updateMenuLogin();
    updateLoginUI();
    window.updateSaldo();
});
