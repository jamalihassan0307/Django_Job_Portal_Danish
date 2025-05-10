class App {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        // Check authentication
        this.checkAuth();
        
        // Initialize navigation
        this.initNavigation();
        
        // Load current page
        this.loadPage();
    }

    checkAuth() {
        const user = localStorage.getItem('user');
        const protectedPages = ['jobs.html', 'profile.html', 'add-job.html'];
        
        if (!user && protectedPages.includes(this.currentPage)) {
            window.location.href = 'login.html';
        }
    }

    initNavigation() {
        // Handle mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Handle search
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (this.currentPage === 'jobs.html') {
                    window.dispatchEvent(new CustomEvent('searchJobs', { 
                        detail: e.target.value 
                    }));
                }
            });
        }
    }

    loadPage() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        switch (this.currentPage) {
            case 'index.html':
                new Home();
                break;
            case 'jobs.html':
                new Jobs();
                break;
            case 'job-detail.html':
                new JobDetail();
                break;
            case 'profile.html':
                new Profile();
                break;
            case 'login.html':
                new Login();
                break;
            case 'about.html':
                new About();
                break;
            case 'contact.html':
                new Contact();
                break;
            case 'add-job.html':
                new AddJob();
                break;
            default:
                new Home();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 