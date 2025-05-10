class Profile {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.init();
    }

    init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="profile-page">
                <div class="profile-hero">
                    <div class="profile-header">
                        <img src="${this.user.profile_picture || 'https://via.placeholder.com/150'}" 
                             alt="Profile" class="profile-avatar">
                        <h1 class="profile-name">${this.user.name}</h1>
                        <p class="profile-title">Software Developer</p>
                    </div>
                </div>

                <div class="profile-content">
                    <button class="edit-profile-btn">Edit Profile</button>

                    <div class="profile-grid">
                        <div class="profile-sidebar">
                            <div class="profile-card">
                                <h2>Personal Information</h2>
                                <div class="info-list">
                                    <div class="info-item">
                                        <span class="info-icon">📧</span>
                                        <span>${this.user.email}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-icon">📱</span>
                                        <span>03160623655</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-icon">📍</span>
                                        <span>Bahawalpur</span>
                                    </div>
                                </div>
                            </div>

                            <div class="profile-card">
                                <h2>Skills</h2>
                                <div class="skills-grid">
                                    <span class="skill-tag">React</span>
                                    <span class="skill-tag">JavaScript</span>
                                    <span class="skill-tag">Node.js</span>
                                    <span class="skill-tag">TypeScript</span>
                                    <span class="skill-tag">HTML/CSS</span>
                                    <span class="skill-tag">Git</span>
                                </div>
                            </div>
                        </div>

                        <div class="profile-main">
                            <div class="profile-card">
                                <h2>Experience</h2>
                                <div class="experience-list">
                                    <div class="experience-item">
                                        <div class="experience-header">
                                            <span class="company-name">Tech Corp</span>
                                            <span class="date-range">2020 - Present</span>
                                        </div>
                                        <h3 class="job-title">Senior Frontend Developer</h3>
                                        <p class="experience-description">
                                            Led the development of multiple web applications using React
                                            and TypeScript. Implemented responsive designs and improved
                                            application performance.
                                        </p>
                                    </div>

                                    <div class="experience-item">
                                        <div class="experience-header">
                                            <span class="company-name">Digital Solutions Inc</span>
                                            <span class="date-range">2018 - 2020</span>
                                        </div>
                                        <h3 class="job-title">Frontend Developer</h3>
                                        <p class="experience-description">
                                            Developed and maintained client websites. Collaborated with
                                            designers to implement pixel-perfect UI components.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="profile-card">
                                <h2>Education</h2>
                                <div class="experience-item">
                                    <div class="experience-header">
                                        <span class="company-name">University of Technology</span>
                                        <span class="date-range">2014 - 2018</span>
                                    </div>
                                    <h3 class="job-title">Bachelor of Computer Science</h3>
                                    <p class="experience-description">
                                        Specialized in Software Engineering. Graduated with honors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onclick="profile.handleLogout()" class="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        `;
    }

    handleLogout() {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

// Make profile instance globally available
window.profile = null;
document.addEventListener('DOMContentLoaded', () => {
    window.profile = new Profile();
}); 