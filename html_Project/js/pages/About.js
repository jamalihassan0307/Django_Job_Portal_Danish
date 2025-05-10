class About {
    constructor() {
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="about-page">
                <div class="about-hero">
                    <div class="about-hero-content">
                        <h1>About JobPortal</h1>
                        <p>Connecting talent with opportunity</p>
                    </div>
                </div>

                <div class="about-content">
                    <div class="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            At JobPortal, we're dedicated to transforming the way people find
                            their dream careers. We believe everyone deserves a job they love,
                            and we're here to make that happen.
                        </p>
                    </div>

                    <div class="stats-section">
                        <div class="stat-card">
                            <span class="stat-number">10K+</span>
                            <span class="stat-label">Active Jobs</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">5K+</span>
                            <span class="stat-label">Companies</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-number">1M+</span>
                            <span class="stat-label">Job Seekers</span>
                        </div>
                    </div>

                    <div class="team-section">
                        <h2>Our Values</h2>
                        <div class="values-grid">
                            <div class="value-card">
                                <span class="value-icon">🎯</span>
                                <h3>Excellence</h3>
                                <p>We strive for excellence in everything we do</p>
                            </div>
                            <div class="value-card">
                                <span class="value-icon">🤝</span>
                                <h3>Trust</h3>
                                <p>Building trust through transparency</p>
                            </div>
                            <div class="value-card">
                                <span class="value-icon">💡</span>
                                <h3>Innovation</h3>
                                <p>Constantly improving our platform</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
} 