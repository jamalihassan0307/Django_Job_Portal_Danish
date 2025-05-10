class Home {
    constructor() {
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="home-page">
                <div class="hero-section">
                    <div class="hero-content">
                        <h1>Find Your Dream Job Today</h1>
                        <p>Discover thousands of job opportunities with all the information you need.</p>
                        <button class="cta-button" onclick="window.location.href='jobs.html'">Explore Jobs</button>
                    </div>
                </div>

                <div class="featured-jobs">
                    <div class="container">
                        <h2>Featured Job Categories</h2>
                        <div class="category-grid">
                            <div class="category-card">
                                <h3>Technology</h3>
                                <p>Software, Data, IT & More</p>
                            </div>
                            <div class="category-card">
                                <h3>Business</h3>
                                <p>Marketing, Sales & Finance</p>
                            </div>
                            <div class="category-card">
                                <h3>Healthcare</h3>
                                <p>Medical, Nursing & Pharma</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="features-section">
                    <div class="container">
                        <h2>Why Choose Us</h2>
                        <div class="features-grid">
                            <div class="feature-card">
                                <span class="feature-icon">🎯</span>
                                <h3>Perfect Match</h3>
                                <p>Smart job matching system to find your ideal position</p>
                            </div>
                            <div class="feature-card">
                                <span class="feature-icon">🌍</span>
                                <h3>Remote Work</h3>
                                <p>Access global opportunities and work from anywhere</p>
                            </div>
                            <div class="feature-card">
                                <span class="feature-icon">💼</span>
                                <h3>Top Companies</h3>
                                <p>Connect with leading companies worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cta-section">
                    <div class="container">
                        <h2>Ready to Start Your Career Journey?</h2>
                        <p>Join thousands of professionals who've found their dream jobs</p>
                        <button class="cta-button" onclick="window.location.href='jobs.html'">Search Jobs Now</button>
                    </div>
                </div>
            </div>
        `;
    }
} 