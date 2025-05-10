class JobDetail {
    constructor() {
        this.jobId = new URLSearchParams(window.location.search).get('id');
        this.init();
    }

    async init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="job-detail-page">
                <div class="job-detail-hero">
                    <div class="job-detail-hero-content">
                        <div class="loading-container">
                            <div class="loading-spinner"></div>
                            <p>Loading job details...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        await this.fetchJobDetail();
    }

    async fetchJobDetail() {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINTS.JOBS}`);
            const jobs = await response.json();
            const job = jobs.find(job => job.id === parseInt(this.jobId));

            if (!job) {
                window.location.href = 'jobs.html';
                return;
            }

            this.renderJobDetail(job);
        } catch (error) {
            console.error('Error fetching job details:', error);
            this.showError('Failed to load job details');
        }
    }

    renderJobDetail(job) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="job-detail-page">
                <div class="job-detail-hero">
                    <div class="job-detail-hero-content">
                        <h1>${job.job_title}</h1>
                        <div class="company-info">
                            <span class="company-name">${job.company}</span>
                            <span class="location">📍 ${job.location}</span>
                        </div>
                        <span class="job-type ${job.job_type.toLowerCase()}">${job.job_type}</span>
                    </div>
                </div>

                <div class="job-detail-content">
                    <div class="job-main-info">
                        <div class="info-section">
                            <h2>Job Description</h2>
                            <p>${job.description || 'No description provided.'}</p>
                        </div>

                        ${job.requirements ? `
                            <div class="info-section">
                                <h2>Requirements</h2>
                                <ul>
                                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        ${job.benefits ? `
                            <div class="info-section">
                                <h2>Benefits</h2>
                                <ul>
                                    ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>

                    <div class="job-side-info">
                        <div class="info-card">
                            <h3>Salary</h3>
                            <p class="salary">💰 ${job.salary}</p>
                        </div>

                        ${job.contact_details ? `
                            <div class="info-card">
                                <h3>Contact Information</h3>
                                <p>📧 ${job.contact_details.email}</p>
                                <p>📞 ${job.contact_details.phone}</p>
                            </div>
                        ` : ''}

                        <div class="action-buttons">
                            ${job.company_url ? `
                                <a href="${job.company_url}" target="_blank" rel="noopener noreferrer" 
                                   class="action-button primary">
                                    Visit Company Website
                                </a>
                            ` : ''}
                            <button onclick="window.location.href='jobs.html'" 
                                    class="action-button secondary">
                                Back to Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showError(message) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="job-detail-page">
                <div class="job-detail-hero">
                    <div class="job-detail-hero-content">
                        <div class="error-message">
                            <p>${message}</p>
                            <button onclick="window.location.href='jobs.html'" 
                                    class="action-button secondary">
                                Back to Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
} 