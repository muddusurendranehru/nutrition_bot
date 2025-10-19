// HOMA FOODS Frontend - Simple Authentication & Dashboard
class HomaFoodsApp {
    constructor() {
        this.apiUrl = 'http://localhost:3031/api';
        this.token = localStorage.getItem('homa_token');
        this.user = null;
        
        this.init();
    }

    init() {
        console.log('🔍 HOMA FOODS App initializing...');
        try {
            this.setupEventListeners();
            this.checkAuthStatus();
            this.loadStats();
            this.setupFloatingBot();
            console.log('✅ HOMA FOODS App initialized successfully');
        } catch (error) {
            console.error('❌ HOMA FOODS App initialization failed:', error);
        }
    }

    setupEventListeners() {
        console.log('🔍 Setting up event listeners...');
        
        try {
            // Navigation buttons
            const signupBtn = document.getElementById('signup-btn');
            const loginBtn = document.getElementById('login-btn');
            const logoutBtn = document.getElementById('logout-btn');
            
            if (signupBtn) {
                signupBtn.addEventListener('click', () => this.showSignup());
                console.log('✅ Signup button listener added');
            } else {
                console.warn('⚠️ Signup button not found');
            }
            
            if (loginBtn) {
                loginBtn.addEventListener('click', () => this.showLogin());
                console.log('✅ Login button listener added');
            } else {
                console.warn('⚠️ Login button not found');
            }
            
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => this.logout());
                console.log('✅ Logout button listener added');
            } else {
                console.warn('⚠️ Logout button not found');
            }
            
            // Welcome page buttons
            const welcomeSignup = document.getElementById('welcome-signup');
            const welcomeLogin = document.getElementById('welcome-login');
            
            if (welcomeSignup) {
                welcomeSignup.addEventListener('click', () => this.showSignup());
                console.log('✅ Welcome signup button listener added');
            } else {
                console.warn('⚠️ Welcome signup button not found');
            }
            
            if (welcomeLogin) {
                welcomeLogin.addEventListener('click', () => this.showLogin());
                console.log('✅ Welcome login button listener added');
            } else {
                console.warn('⚠️ Welcome login button not found');
            }
            
            // Modal close buttons
            const closeSignup = document.getElementById('close-signup');
            const closeLogin = document.getElementById('close-login');
            
            if (closeSignup) {
                closeSignup.addEventListener('click', () => this.hideSignup());
                console.log('✅ Close signup button listener added');
            } else {
                console.warn('⚠️ Close signup button not found');
            }
            
            if (closeLogin) {
                closeLogin.addEventListener('click', () => this.hideLogin());
                console.log('✅ Close login button listener added');
            } else {
                console.warn('⚠️ Close login button not found');
            }
            
            // Forms
            const signupForm = document.getElementById('signup-form');
            const loginForm = document.getElementById('login-form');
            
            if (signupForm) {
                signupForm.addEventListener('submit', (e) => {
                    console.log('🔍 Signup form submitted!');
                    this.handleSignup(e);
                });
                console.log('✅ Signup form listener added');
            } else {
                console.warn('⚠️ Signup form not found');
            }
            
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => this.handleLogin(e));
                console.log('✅ Login form listener added');
            } else {
                console.warn('⚠️ Login form not found');
            }
            
            // Search
            const searchBtn = document.getElementById('search-btn');
            const foodSearch = document.getElementById('food-search');
            
            if (searchBtn) {
                searchBtn.addEventListener('click', () => this.searchFoods());
                console.log('✅ Search button listener added');
            } else {
                console.warn('⚠️ Search button not found');
            }
            
            if (foodSearch) {
                foodSearch.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.searchFoods();
                });
                console.log('✅ Food search listener added');
            } else {
                console.warn('⚠️ Food search input not found');
            }
            
            console.log('✅ Event listeners setup complete');
        } catch (error) {
            console.error('❌ Error setting up event listeners:', error);
        }
    }

    checkAuthStatus() {
        if (this.token) {
            this.showDashboard();
            this.loadUserProfile();
        } else {
            this.showWelcome();
        }
    }

    async loadUserProfile() {
        try {
            const response = await fetch(`${this.apiUrl}/user/profile`, {
                headers: { 'Authorization': `Bearer ${this.token}` }
            });
            
            if (response.ok) {
                const data = await response.json();
                this.user = data.user;
                this.updateNavButtons(true);
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Profile load error:', error);
            this.logout();
        }
    }

    updateNavButtons(isLoggedIn) {
        const signupBtn = document.getElementById('signup-btn');
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (isLoggedIn) {
            signupBtn.classList.add('hidden');
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
        } else {
            signupBtn.classList.remove('hidden');
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
        }
    }

    showWelcome() {
        document.getElementById('welcome').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('welcome').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    }

    showSignup() {
        console.log('🔍 Show signup called');
        const modal = document.getElementById('signup-modal');
        if (modal) {
            modal.classList.remove('hidden');
            console.log('✅ Signup modal shown');
        } else {
            console.error('❌ Signup modal not found');
        }
    }

    hideSignup() {
        document.getElementById('signup-modal').classList.add('hidden');
        document.getElementById('signup-form').reset();
    }

    showLogin() {
        document.getElementById('login-modal').classList.remove('hidden');
    }

    hideLogin() {
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('login-form').reset();
    }

    async handleSignup(e) {
        console.log('🔍 Handle signup called - form submitted!');
        e.preventDefault();
        
        try {
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;
            const name = document.getElementById('signup-name').value || '';
            const phone = document.getElementById('signup-phone').value || '';
            
            console.log('🔍 Signup data:', { email, password, confirmPassword, name, phone });
            
            // Simple validation
            if (password !== confirmPassword) {
                this.showToast('Passwords do not match!', 'error');
                return;
            }
            
            if (password.length < 3) {
                this.showToast('Password must be at least 3 characters!', 'error');
                return;
            }

            this.showLoading(true);
            console.log('🔍 Making signup request to:', `${this.apiUrl}/auth/signup`);
            
            const response = await fetch(`${this.apiUrl}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, confirmPassword, name, phone })
            });
            
            console.log('🔍 Signup response status:', response.status);
            const data = await response.json();
            console.log('🔍 Signup response data:', data);
            
            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('homa_token', this.token);
                this.hideSignup();
                this.showDashboard();
                this.updateNavButtons(true);
                this.showToast('Sign up successful! Welcome to HOMA FOODS!');
            } else {
                this.showToast(data.error || 'Sign up failed!', 'error');
            }
        } catch (error) {
            console.error('❌ Signup error:', error);
            this.showToast('Network error!', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        this.showLoading(true);
        
        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('homa_token', this.token);
                this.hideLogin();
                this.showDashboard();
                this.updateNavButtons(true);
                this.showToast('Login successful! Welcome back!');
            } else {
                this.showToast(data.error || 'Login failed!', 'error');
            }
        } catch (error) {
            this.showToast('Network error!', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('homa_token');
        this.showWelcome();
        this.updateNavButtons(false);
        this.showToast('Logged out successfully!');
    }

    async searchFoods() {
        const searchTerm = document.getElementById('food-search').value.trim();
        if (!searchTerm) return;
        
        this.showLoading(true);
        
        try {
            const response = await fetch(`${this.apiUrl}/data?search=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            
            this.displaySearchResults(data.foods);
        } catch (error) {
            this.showToast('Search failed!', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    displaySearchResults(foods) {
        const container = document.getElementById('search-results');
        
        if (foods.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center text-white py-8"><i class="fas fa-search text-4xl mb-4"></i><p>No foods found. Try a different search term.</p></div>';
            return;
        }
        
        container.innerHTML = foods.map(food => `
            <div class="glass rounded-2xl p-6 card-hover">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-white">${food.food_name}</h3>
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${
                        food.diabetic_rating === 'green' ? 'bg-green-500/80 text-white' :
                        food.diabetic_rating === 'yellow' ? 'bg-yellow-500/80 text-white' :
                        'bg-red-500/80 text-white'
                    }">
                        ${food.diabetic_rating.toUpperCase()}
                    </span>
                </div>
                
                ${food.regional_names && food.regional_names.length > 0 ? `
                    <div class="mb-3">
                        <p class="text-sm text-blue-200">Regional Names:</p>
                        <p class="text-sm font-medium text-white">${food.regional_names.join(', ')}</p>
                    </div>
                ` : ''}
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-300">${food.calories}</div>
                        <div class="text-sm text-blue-200">Calories</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-300">${food.protein_g}g</div>
                        <div class="text-sm text-green-200">Protein</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-orange-300">${food.fat_g}g</div>
                        <div class="text-sm text-orange-200">Fat</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-purple-300">${food.carbs_g}g</div>
                        <div class="text-sm text-purple-200">Carbs</div>
                    </div>
                </div>
                
                <div class="speedometer">
                    <div class="speedometer-bg">
                        <div class="speedometer-needle" style="transform: rotate(${this.getNeedleAngle(food.health_score)}deg)"></div>
                        <div class="speedometer-center"></div>
                    </div>
                    <div class="text-center mt-2">
                        <div class="text-lg font-bold text-white">${food.health_score}/100</div>
                        <div class="text-sm text-blue-200">Health Score</div>
                    </div>
                </div>
                
                <div class="mt-4 text-sm text-blue-200">
                    <p><strong class="text-white">Country:</strong> ${food.country}</p>
                    <p><strong class="text-white">Cuisine:</strong> ${food.cuisine_type}</p>
                    ${food.data_source ? `<p><strong class="text-white">Source:</strong> ${food.data_source}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    getNeedleAngle(healthScore) {
        // Convert health score (0-100) to needle angle (0-180 degrees)
        return (healthScore / 100) * 180;
    }

    async loadStats() {
        try {
            const response = await fetch(`${this.apiUrl}/data/stats`);
            const data = await response.json();
            
            document.getElementById('stats-content').innerHTML = `
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-300">${data.totalFoods}</div>
                    <div class="text-sm text-blue-200">Total Foods</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-green-300">${data.continents.length}</div>
                    <div class="text-sm text-green-200">Continents</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-yellow-300">${data.diabeticRating.length}</div>
                    <div class="text-sm text-yellow-200">Rating Levels</div>
                </div>
            `;
        } catch (error) {
            console.error('Stats load error:', error);
        }
    }

    showLoading(show) {
        document.getElementById('loading').classList.toggle('hidden', !show);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`;
        
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    setupFloatingBot() {
        const floatingBot = document.querySelector('.floating-bot');
        const botButton = document.querySelector('.bot-button');
        
        if (floatingBot && botButton) {
            botButton.addEventListener('click', () => {
                this.showToast('Dr. Nehru is ready to help! Click search to get started.', 'success');
                // Focus on search input if dashboard is visible
                const dashboard = document.getElementById('dashboard');
                if (dashboard && !dashboard.classList.contains('hidden')) {
                    const searchInput = document.getElementById('food-search');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            });
            
            // Add hover effects
            botButton.addEventListener('mouseenter', () => {
                botButton.style.transform = 'scale(1.1)';
            });
            
            botButton.addEventListener('mouseleave', () => {
                botButton.style.transform = 'scale(1)';
            });
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomaFoodsApp();
});
