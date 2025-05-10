class Jobs {
    constructor() {
        this.jobs = [];
        this.filteredJobs = [];
        this.activeJobType = 'All';
        this.init();
    }

    async init() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="jobs-page">
                <div class="jobs-hero">
                    <div class="jobs-hero-content">
                        <h1>Find Your Dream Job</h1>
                        <p>Discover opportunities that match your skills and aspirations</p>
                    </div>
                </div>

                <div id="admin-controls" class="admin-controls" style="display: none;">
                    <button class="add-job-btn" onclick="window.location.href='add-job.html'">Add New Job</button>
                </div>

                <div class="jobs-filters">
                    <div class="filter-container">
                        <div class="filter-section">
                            <h3>Job Type</h3>
                            <div class="filter-tags" id="job-type-filters">
                                ${JOB_TYPES.map(type => `
                                    <span class="filter-tag ${type === 'All' ? 'active' : ''}" 
                                          data-type="${type}">${type}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="jobs-main">
                    <div class="jobs-grid" id="jobs-grid">
                        <div class="loading-container">
                            <div class="loading-spinner"></div>
                            <p>Loading jobs...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
        await this.fetchJobs();
        this.checkUserRole();
    }

    attachEventListeners() {
        const filterTags = document.getElementById('job-type-filters');
        filterTags.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                this.handleFilterClick(e.target);
            }
        });

        window.addEventListener('searchJobs', (e) => {
            this.applyFilters(this.activeJobType, e.detail);
        });
    }

    handleFilterClick(target) {
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => tag.classList.remove('active'));
        target.classList.add('active');
        
        const jobType = target.dataset.type;
        this.activeJobType = jobType;
        this.applyFilters(jobType);
    }

    async fetchJobs() {
        try {
            const response = await fetch(`${BASE_URL}${ENDPOINTS.JOBS}`);
            this.jobs = await response.json();
            this.filteredJobs = [...this.jobs];
            this.renderJobs();
        } catch (error) {
            console.error('Error fetching jobs:', error);
            this.showError('Failed to load jobs');
        }
    }

    applyFilters(jobType, searchTerm = '') {
        let filtered = [...this.jobs];

        if (searchTerm) {
            filtered = filtered.filter(
                job => job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (jobType !== 'All') {
            filtered = filtered.filter(job => job.job_type === jobType);
        }

        this.filteredJobs = filtered;
        this.renderJobs();
    }

    renderJobs() {
        const jobsGrid = document.getElementById('jobs-grid');
        if (this.filteredJobs.length === 0) {
            jobsGrid.innerHTML = `
                <div class="no-jobs-message">
                    <p>No jobs found matching your criteria</p>
                </div>
            `;
            return;
        }

        jobsGrid.innerHTML = this.filteredJobs.map(job => `
            <div class="job-card-wrapper">
                <div class="job-card">
                    <div class="job-card-header">
                        <h3>${job.job_title}</h3>
                        <span class="job-type ${job.job_type.toLowerCase()}">${job.job_type}</span>
                    </div>
                    <div class="job-card-company">
                        <span class="company-name">${job.company}</span>
                        <span class="location">📍 ${job.location}</span>
                    </div>
                    <div class="job-card-salary">
                        <span>💰 ${job.salary}</span>
                    </div>
                    <div class="job-card-actions">
                        <button class="company-site-btn" onclick="window.open('${job.company_url}', '_blank')">
                            Visit Company
                        </button>
                        <button class="view-details-btn" onclick="window.location.href='job-detail.html?id=${job.id}'">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    
    checkUserRole() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const adminControls = document.getElementById('admin-controls');
        if (user.role === 1) {
            adminControls.style.display = 'block';
        }
    }

    showError(message) {
        const jobsGrid = document.getElementById('jobs-grid');
        jobsGrid.innerHTML = `
            <div class="no-jobs-message">
                <p>${message}</p>
            </div>
        `;
    }
}

// Make jobs instance globally available
window.jobs = null;
document.addEventListener('DOMContentLoaded', () => {
    window.jobs = new Jobs();
}); 