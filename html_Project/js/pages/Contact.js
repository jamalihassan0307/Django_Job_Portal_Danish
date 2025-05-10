class Contact {
    constructor() {
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="contact-page">
                <div class="contact-hero">
                    <div class="contact-hero-content">
                        <h1>Get in Touch</h1>
                        <p>We'd love to hear from you</p>
                    </div>
                </div>

                <div class="contact-content">
                    <div class="contact-info">
                        <div class="info-card">
                            <span class="info-icon">📍</span>
                            <h3>Our Location</h3>
                            <p>
                                123 Business Avenue<br>
                                bahawalpur
                            </p>
                        </div>
                        <div class="info-card">
                            <span class="info-icon">📧</span>
                            <h3>Email Us</h3>
                            <p>
                                danish@gmail.com<br>
                                danish@gmail.com
                            </p>
                        </div>
                        <div class="info-card">
                            <span class="info-icon">📞</span>
                            <h3>Call Us</h3>
                            <p>
                                +92 3160623655<br>
                                Mon - Fri, 9am - 6pm
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
} 