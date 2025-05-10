class Login {
    constructor() {
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="login-container">
                <div class="login-box">
                    <h2>Login</h2>
                    <div id="error-message" class="error-message" style="display: none;"></div>
                    <form id="login-form">
                        <div class="form-group">
                            <label>Username or Email</label>
                            <input type="text" name="username" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" name="password" required>
                        </div>
                        <button type="submit" class="login-button">Login</button>
                    </form>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch(`${BASE_URL}${ENDPOINTS.PROFILE}`);
            const users = await response.json();
            
            const user = users.find(
                user => (user.username === username || user.email === username) && 
                user.password === password
            );

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                this.showError('Invalid username or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            this.showError('An error occurred during login');
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
} 