document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- REGISTRATION LOGIC ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;

            let users = JSON.parse(localStorage.getItem('flowMartUsers')) || [];

            if (users.find(u => u.email === email)) {
                alert("Email already exists! Try logging in.");
                window.location.href = 'index.html';
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('flowMartUsers', JSON.stringify(users));
            alert("Registration Successful!");
            window.location.href = 'index.html';
        });
    }

    // --- LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('flowMartUsers')) || [];
            const user = users.find(u => u.email === email);

            if (!user) {
                alert("User not found! Redirecting to Register page.");
                window.location.href = 'Register.html';
            } else if (user.password !== password) {
                alert("Wrong password!");
            } else {
                // Login Success
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', user.name);
                window.location.href = 'Homepage.html';
            }
        });
    }
});