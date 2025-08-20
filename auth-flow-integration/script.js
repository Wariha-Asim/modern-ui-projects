// Authentication functions

// Check if user is authenticated
function checkAuth() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken && window.location.pathname.includes('welcome.html')) {
        window.location.href = 'login.html';
    }
}

// Show message function
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

// Move to next OTP input
function moveToNext(input, nextIndex) {
    if (input.value.length > 0) {
        if (nextIndex <= 6) {
            document.querySelectorAll('.otp-input')[nextIndex].focus();
        }
    }
}

// Navigation functions for reset password
function goToStep(step) {
    // Update steps
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update step indicator
    const steps = document.querySelectorAll('.step');
    const stepLines = document.querySelectorAll('.step-line');
    
    steps.forEach((s, i) => {
        if (i + 1 < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (i + 1 === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active', 'completed');
        }
    });
    
    stepLines.forEach((line, i) => {
        if (i + 1 < step - 1) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
            if (i + 1 < step) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        }
    });
}

function backToStep1() {
    goToStep(1);
}

function backToStep2() {
    goToStep(2);
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('new-password')?.value || document.getElementById('password')?.value;
    const meter = document.getElementById('password-strength-meter');
    const text = document.getElementById('password-strength-text');
    
    if (!password || password.length === 0) {
        if (meter) meter.style.width = '0%';
        if (text) text.textContent = '';
        return;
    }
    
    // Calculate strength (simple algorithm)
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (meter) meter.style.width = `${strength}%`;
    
    if (text) {
        if (strength < 50) {
            meter.style.background = 'var(--error)';
            text.textContent = 'Weak password';
            text.style.color = 'var(--error)';
        } else if (strength < 75) {
            meter.style.background = 'var(--warning)';
            text.textContent = 'Medium strength';
            text.style.color = 'var(--warning)';
        } else {
            meter.style.background = 'var(--success)';
            text.textContent = 'Strong password';
            text.style.color = 'var(--success)';
        }
    }
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});