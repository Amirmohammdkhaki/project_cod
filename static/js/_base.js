// ===== BASE JAVASCRIPT =====

$(document).ready(function() {
    console.log("Base JS loaded successfully!");
    
    // ===== NAVBAR SCROLL EFFECT =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.custom-navbar').addClass('navbar-scrolled');
        } else {
            $('.custom-navbar').removeClass('navbar-scrolled');
        }
    });

    // ===== DROPDOWN ANIMATION =====
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });

    // ===== SEBAR SEARCH ANIMATION =====
    $('.search-input').focus(function() {
        $(this).parent().addClass('search-focused');
    }).blur(function() {
        $(this).parent().removeClass('search-focused');
    });

    // ===== NOTIFICATION BELL ANIMATION =====
    $('.notification-icon').click(function(e) {
        e.preventDefault();
        $(this).find('.fa-bell').addClass('bell-ring');
        
        // شبیه‌سازی باز شدن اعلان
        setTimeout(() => {
            $(this).find('.fa-bell').removeClass('bell-ring');
            alert('صفحه اعلان‌ها به زودی اضافه خواهد شد!');
        }, 500);
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    $('a[href^="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // ===== FORM VALIDATION STYLING =====
    $('form').on('submit', function() {
        const inputs = $(this).find('input, textarea, select');
        let isValid = true;
        
        inputs.each(function() {
            if ($(this).prop('required') && !$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        return isValid;
    });

    // ===== TOOLTIP INITIALIZATION =====
    $('[data-toggle="tooltip"]').tooltip();

    // ===== GO TO TOP BUTTON =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#goTopBtn').fadeIn();
        } else {
            $('#goTopBtn').fadeOut();
        }
    });

    // ایجاد دکمه برگشت به بالا
    if ($('#goTopBtn').length === 0) {
        $('body').append(`
            <button id="goTopBtn" title="برگشت به بالا">
                <i class="fas fa-arrow-up"></i>
            </button>
        `);
        
        $('#goTopBtn').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
        });
    }

    // ===== ADD SOME CSS VIA JS =====
    $('head').append(`
        <style>
            .navbar-scrolled {
                padding: 8px 0 !important;
                background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%) !important;
            }
            
            .bell-ring {
                animation: bellShake 0.5s ease-in-out;
            }
            
            @keyframes bellShake {
                0%, 100% { transform: rotate(0); }
                25% { transform: rotate(15deg); }
                75% { transform: rotate(-15deg); }
            }
            
            .search-focused {
                transform: scale(1.02);
                transition: transform 0.3s ease;
            }
            
            #goTopBtn {
                position: fixed;
                bottom: 30px;
                left: 30px;
                z-index: 1000;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                border: none;
                box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
                display: none;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s ease;
            }
            
            #goTopBtn:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(106, 17, 203, 0.6);
            }
            
            .is-invalid {
                border-color: #dc3545 !important;
                box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
            }
        </style>
    `);
});

// ===== UTILITY FUNCTIONS =====
function showToast(message, type = 'success') {
    // ایجاد یک toast ساده
    const toast = $(`
        <div class="base-toast toast-${type}">
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        </div>
    `);
    
    $('body').append(toast);
    
    // نمایش toast با انیمیشن
    setTimeout(() => toast.addClass('show'), 100);
    
    // بستن خودکار بعد از 5 ثانیه
    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // بستن دستی
    toast.find('.toast-close').click(function() {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// اضافه کردن استایل toast
$(document).ready(function() {
    $('head').append(`
        <style>
            .base-toast {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 9999;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                transform: translateX(-150%);
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            }
            
            .base-toast.show {
                transform: translateX(0);
            }
            
            .toast-success {
                border-right: 4px solid #28a745;
            }
            
            .toast-error {
                border-right: 4px solid #dc3545;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #333;
            }
            
            .toast-content i {
                font-size: 1.5rem;
            }
            
            .toast-success .toast-content i {
                color: #28a745;
            }
            
            .toast-error .toast-content i {
                color: #dc3545;
            }
            
            .toast-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #999;
                cursor: pointer;
                padding: 0;
                margin: 0;
            }
            
            .toast-close:hover {
                color: #666;
            }
        </style>
    `);
});