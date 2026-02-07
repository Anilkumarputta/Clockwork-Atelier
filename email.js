// EmailJS integration for contact form
// Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS credentials

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const honeypot = form.querySelector('.hp-field input');
    const humanCheck = form.querySelector('#contact-human');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitBtnText = submitBtn ? submitBtn.textContent : '';
    const rateLimitMs = 30000;
    const lastSubmitKey = 'clockworkContactLastSubmit';

    // Create custom success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'contact-success-message';
    successMsg.innerHTML = '<span>Thank you for reaching out!<br>Your message was sent successfully.<br><small>Wishing you a wonderful day!</small></span>';
    document.body.appendChild(successMsg);
    successMsg.style.display = 'none';

    const errorMsg = document.createElement('div');
    errorMsg.className = 'contact-error-message';
    errorMsg.innerHTML = '<span></span>';
    document.body.appendChild(errorMsg);
    errorMsg.style.display = 'none';

    function showSuccessMessage() {
        successMsg.style.display = 'flex';
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 10);
        // Hide after 3.5s
        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => { successMsg.style.display = 'none'; }, 400);
        }, 3500);
    }

    function showErrorMessage(text) {
        const span = errorMsg.querySelector('span');
        if (span) {
            span.textContent = text;
        }
        errorMsg.style.display = 'flex';
        setTimeout(() => {
            errorMsg.classList.add('show');
        }, 10);
        setTimeout(() => {
            errorMsg.classList.remove('show');
            setTimeout(() => { errorMsg.style.display = 'none'; }, 400);
        }, 2800);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (honeypot && honeypot.value.trim() !== '') {
            return;
        }
        if (humanCheck && !humanCheck.checked) {
            showErrorMessage('Please confirm you are not a bot.');
            return;
        }
        const lastSubmitRaw = localStorage.getItem(lastSubmitKey);
        const lastSubmit = lastSubmitRaw ? Number(lastSubmitRaw) : 0;
        const now = Date.now();
        if (lastSubmit && now - lastSubmit < rateLimitMs) {
            const waitSeconds = Math.ceil((rateLimitMs - (now - lastSubmit)) / 1000);
            showErrorMessage(`Please wait ${waitSeconds}s before sending again.`);
            return;
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        emailjs.sendForm('service_ilga7yp', 'template_dy0u7yh', form, '_dkHQucs13j32kCb7')
            .then(function () {
                localStorage.setItem(lastSubmitKey, String(Date.now()));
                showSuccessMessage();
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtnText;
                }
            }, function (error) {
                showErrorMessage('Failed to send message. Please try again later.');
                console.error(error);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtnText;
                }
            });
    });
});
