/// ==================== SCRIPT PRINCIPAL ====================
document.addEventListener('DOMContentLoaded', function() {
    // ========== ÉLÉMENTS DOM ==========
    // Navigation et modals
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const modalLogin = document.getElementById('modal-login');
    const modalRegister = document.getElementById('modal-register');
    const modalWelcome = document.getElementById('modal-welcome');
    const welcomeModal = document.getElementById('welcome-modal');
    const btnLogin = document.getElementById('btn-login');
    const btnRegister = document.getElementById('btn-register');
    const btnLoginMobile = document.getElementById('btn-login-mobile');
    const btnRegisterMobile = document.getElementById('btn-register-mobile');
    const btnLogout = document.getElementById('btn-logout');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    const welcomeLogin = document.getElementById('welcome-login');
    const welcomeRegister = document.getElementById('welcome-register');
    const welcomeLater = document.getElementById('welcome-later');
    const btnStartExploring = document.getElementById('btn-start-exploring');
    const heroReserve = document.getElementById('hero-reserve');
    const heroAccount = document.getElementById('hero-account');
    const requiredLogin = document.getElementById('required-login');
    const requiredRegister = document.getElementById('required-register');
    const userInfo = document.getElementById('user-info');
    const guestInfo = document.getElementById('guest-info');
    const userName = document.getElementById('user-name');
    
    // Réservation
    const reservationLoginRequired = document.getElementById('reservation-login-required');
    const reservationFormContainer = document.getElementById('reservation-form-container');
    const userReservations = document.getElementById('user-reservations');
    const reservationsList = document.getElementById('reservations-list');
    const formReservation = document.getElementById('form-reservation');
    const reservationMessage = document.getElementById('reservation-message');
    
    // Restaurant
    const restaurantSection = document.getElementById('restaurant');
    const menuGrid = document.getElementById('menu-grid');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderMessage = document.getElementById('order-message');
    const menuLink = document.querySelector('.menu-link');
    
    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    
    // ========== ÉTAT GLOBAL ==========
    let currentUser = null;
    let userReservationsData = [];
    let cart = [];
    let currentCategory = 'entrees';
    
    // ========== DONNÉES DU MENU ==========
    const menuData = {
        entrees: [
            { id: 1, name: "Foie gras de canard", description: "Foie gras maison, chutney de figues et pain brioché", prix: 5000, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "entrees" },
            { id: 2, name: "Carpaccio de Saint-Jacques", description: "Fines lamelles de Saint-Jacques, huile d'olive et citron vert", prix: 6000, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "entrees" },
            { id: 3, name: "Soupe à l'oignon gratinée", description: "Notre classique revisité, gratiné au Comté", prix: 4000, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "entrees" }
        ],
        plats: [
            { id: 4, name: "Filet de bœuf Rossini", description: "Filet de bœuf, foie gras poêlé, sauce truffée", prix: 5000, image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "plats" },
            { id: 5, name: "Bar de ligne rôti", description: "Bar de ligne, écrasé de pommes de terre, beurre blanc", prix: 4000, image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "plats" },
            { id: 6, name: "Risotto aux cèpes", description: "Risotto crémeux, cèpes frais, parmesan", prix: 7500, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "plats" }
        ],
        desserts: [
            { id: 7, name: "Soufflé au chocolat", description: "Soufflé chaud au chocolat Grand Cru, glace vanille", prix: 5000, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "desserts" },
            { id: 8, name: "Tarte Tatin", description: "Tarte Tatin aux pommes caramélisées, crème fraîche", prix: 12000, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "desserts" },
            { id: 9, name: "Macarons assortis", description: "Assortiment de macarons (6 pièces) - saveurs du moment", prix: 8500, image: "https://images.unsplash.com/photo-1558326567-9a1ea3c5e5b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "desserts" }
        ],
        boissons: [
            { id: 10, name: "Cuvée Prestige (Champagne)", description: "Brut, notes de fruits blancs et d'agrumes", prix: 2500, image: "https://images.unsplash.com/photo-1603569286847-aa9c25e0b6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "boissons" },
            { id: 11, name: "Château Margaux 2015", description: "Grand cru classé, vin rouge puissant et élégant", prix: 6000, image: "https://images.unsplash.com/photo-1586334639-0fe43b2d32e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "boissons" },
            { id: 12, name: "Cocktail signature 'Élégance'", description: "Vodka, litchi, rose, citron vert", prix: 3500, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "boissons" }
        ]
    };
    
    // ========== FONCTIONS UTILITAIRES ==========
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `message ${type}`;
        element.style.display = 'block';
        setTimeout(() => { element.style.display = 'none'; }, 5000);
    }
    
    function showTemporaryMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `temporary-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 4px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
            background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#9a7b4f'};
            color: white;
        `;
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => document.body.removeChild(messageDiv), 300);
        }, 3000);
    }
    
    // Ajout de l'animation pour les messages temporaires si pas déjà présente
    if (!document.getElementById('temp-message-style')) {
        const style = document.createElement('style');
        style.id = 'temp-message-style';
        style.textContent = `
            @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 80px; opacity: 1; } }
            @keyframes slideUp { from { top: 80px; opacity: 1; } to { top: -50px; opacity: 0; } }
        `;
        document.head.appendChild(style);
    }
    
    // ========== GESTION DE L'AUTHENTIFICATION ==========
    function checkAuthStatus() {
        const savedUser = localStorage.getItem('hotelUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUIForLoggedInUser();
        } else {
            updateUIForGuest();
            setTimeout(() => {
                if (welcomeModal) welcomeModal.style.display = 'flex';
            }, 1000);
        }
    }
    
    function updateUIForLoggedInUser() {
        if (userName) userName.textContent = `${currentUser.prenom} ${currentUser.nom}`;
        if (userInfo) userInfo.style.display = 'flex';
        if (guestInfo) guestInfo.style.display = 'none';
        
        // Réservation
        if (reservationLoginRequired) reservationLoginRequired.style.display = 'none';
        if (reservationFormContainer) reservationFormContainer.style.display = 'grid';
        
        // Pré-remplir le formulaire de réservation
        const nomField = document.getElementById('reservation-nom');
        const emailField = document.getElementById('reservation-email');
        if (nomField) nomField.value = `${currentUser.prenom} ${currentUser.nom}`;
        if (emailField) emailField.value = currentUser.email;
        
        // Afficher les réservations
        loadUserReservations();
        if (userReservations) userReservations.style.display = 'block';
        
        // Restaurant
        if (restaurantSection) restaurantSection.style.display = 'block';
        if (menuLink) menuLink.style.display = 'block';
        displayMenu(currentCategory);
        
        // Masquer le modal de bienvenue
        if (welcomeModal) welcomeModal.style.display = 'none';
    }
    
    function updateUIForGuest() {
        if (userInfo) userInfo.style.display = 'none';
        if (guestInfo) guestInfo.style.display = 'flex';
        
        // Réservation
        if (reservationLoginRequired) reservationLoginRequired.style.display = 'block';
        if (reservationFormContainer) reservationFormContainer.style.display = 'none';
        if (userReservations) userReservations.style.display = 'none';
        
        // Restaurant
        if (restaurantSection) restaurantSection.style.display = 'none';
        if (menuLink) menuLink.style.display = 'none';
    }
    
    function loadUserReservations() {
        if (!currentUser) return;
        const saved = localStorage.getItem(`reservations_${currentUser.email}`);
        if (saved) {
            userReservationsData = JSON.parse(saved);
            displayReservations();
        } else {
            userReservationsData = [];
            if (reservationsList) reservationsList.innerHTML = '<p>Aucune réservation pour le moment.</p>';
        }
    }
    
    function displayReservations() {
        if (!reservationsList) return;
        if (userReservationsData.length === 0) {
            reservationsList.innerHTML = '<p>Aucune réservation pour le moment.</p>';
            return;
        }
        let html = '';
        const chambreTypes = { classique: 'Chambre Classique', deluxe: 'Chambre Deluxe', suite: 'Suite Présidentielle' };
        userReservationsData.forEach((res, index) => {
            html += `
                <div class="reservation-item">
                    <h5>${chambreTypes[res.chambre] || res.chambre}</h5>
                    <p><strong>Du:</strong> ${res.dateArrivee} <strong>au:</strong> ${res.dateDepart}</p>
                    <p><strong>Personnes:</strong> ${res.personnes}</p>
                    <p><strong>Statut:</strong> <span style="color: var(--success-color)">Confirmée</span></p>
                    <button class="btn-text" onclick="cancelReservation(${index})" style="font-size: 0.8rem;">Annuler</button>
                </div>
            `;
        });
        reservationsList.innerHTML = html;
    }
    
    // Fonction d'annulation accessible globalement
    window.cancelReservation = function(index) {
        if (!currentUser) return;
        if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            userReservationsData.splice(index, 1);
            localStorage.setItem(`reservations_${currentUser.email}`, JSON.stringify(userReservationsData));
            displayReservations();
            showTemporaryMessage('Réservation annulée avec succès.', 'info');
        }
    };
    
    // ========== FONCTIONS DU RESTAURANT ==========
    function displayMenu(category) {
        if (!menuGrid) return;
        const items = menuData[category] || [];
        let html = '';
        items.forEach(item => {
            html += `
                <div class="menu-item">
                    <div class="menu-item-image" style="background-image: url('${item.image}');">
                        <span class="menu-item-category">${item.category}</span>
                    </div>
                    <div class="menu-item-info">
                        <h4>${item.name}</h4>
                        <p class="menu-item-desc">${item.description}</p>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">${item.prix}FCFA</span>
                            <button class="btn-add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                                <i class="fas fa-cart-plus"></i> Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        menuGrid.innerHTML = html;
    }
    
    function updateCartDisplay() {
        if (!cartItems) return;
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            if (cartCount) cartCount.textContent = '0';
            if (cartTotal) cartTotal.textContent = '0€';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }
        let html = '';
        let total = 0;
        let itemCount = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            itemCount += item.quantity;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price}€</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
        });
        cartItems.innerHTML = html;
        if (cartCount) cartCount.textContent = itemCount;
        if (cartTotal) cartTotal.textContent = total.toFixed(2) + '€';
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    
    function addToCart(id, name, price) {
        const existing = cart.find(item => item.id === id);
        if (existing) existing.quantity++;
        else cart.push({ id, name, price, quantity: 1 });
        updateCartDisplay();
        showTemporaryMessage(`${name} ajouté au panier`, 'success');
    }
    
    // ========== GESTION DES MODALS ==========
    function openLoginModal() {
        if (modalLogin) modalLogin.style.display = 'flex';
        if (welcomeModal) welcomeModal.style.display = 'none';
    }
    function openRegisterModal() {
        if (modalRegister) modalRegister.style.display = 'flex';
        if (welcomeModal) welcomeModal.style.display = 'none';
    }
    
    // Événements d'ouverture des modals
    if (btnLogin) btnLogin.addEventListener('click', openLoginModal);
    if (btnLoginMobile) btnLoginMobile.addEventListener('click', openLoginModal);
    if (welcomeLogin) welcomeLogin.addEventListener('click', openLoginModal);
    if (requiredLogin) requiredLogin.addEventListener('click', openLoginModal);
    
    if (btnRegister) btnRegister.addEventListener('click', openRegisterModal);
    if (btnRegisterMobile) btnRegisterMobile.addEventListener('click', openRegisterModal);
    if (welcomeRegister) welcomeRegister.addEventListener('click', openRegisterModal);
    if (requiredRegister) requiredRegister.addEventListener('click', openRegisterModal);
    
    // Fermeture des modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            if (modalLogin) modalLogin.style.display = 'none';
            if (modalRegister) modalRegister.style.display = 'none';
            if (modalWelcome) modalWelcome.style.display = 'none';
            if (welcomeModal) welcomeModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modalLogin) modalLogin.style.display = 'none';
        if (e.target === modalRegister) modalRegister.style.display = 'none';
        if (e.target === modalWelcome) modalWelcome.style.display = 'none';
        if (e.target === welcomeModal) welcomeModal.style.display = 'none';
    });
    
    // Basculer entre login et register
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if (modalLogin) modalLogin.style.display = 'none';
            if (modalRegister) modalRegister.style.display = 'flex';
        });
    }
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            if (modalRegister) modalRegister.style.display = 'none';
            if (modalLogin) modalLogin.style.display = 'flex';
        });
    }
    
    // Continuer sans compte
    if (welcomeLater) {
        welcomeLater.addEventListener('click', function() {
            if (welcomeModal) welcomeModal.style.display = 'none';
            showTemporaryMessage('Vous pouvez parcourir le site, mais la réservation nécessite un compte.', 'info');
        });
    }
    
    // Bouton "Commencer l'exploration"
    if (btnStartExploring) {
        btnStartExploring.addEventListener('click', function() {
            if (modalWelcome) modalWelcome.style.display = 'none';
        });
    }
    
    // Bouton "Mon compte" dans le hero
    if (heroAccount) {
        heroAccount.addEventListener('click', function() {
            if (currentUser) {
                showTemporaryMessage(`Bonjour ${currentUser.prenom} !`, 'success');
            } else {
                openLoginModal();
            }
        });
    }
    
    // ========== FORMULAIRES D'AUTHENTIFICATION ==========
    // Inscription
    const formRegister = document.getElementById('form-register');
    const registerMessage = document.getElementById('register-message');
    if (formRegister) {
        formRegister.addEventListener('submit', function(e) {
            e.preventDefault();
            const prenom = document.getElementById('register-prenom').value.trim();
            const nom = document.getElementById('register-nom').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            const terms = document.getElementById('register-terms')?.checked || false;
            const newsletter = document.getElementById('register-newsletter')?.checked || false;
            
            if (!prenom || !nom || !email || !password || !confirm) {
                showMessage(registerMessage, 'Veuillez remplir tous les champs.', 'error');
                return;
            }
            if (!terms) {
                showMessage(registerMessage, 'Vous devez accepter les conditions d\'utilisation.', 'error');
                return;
            }
            if (password !== confirm) {
                showMessage(registerMessage, 'Les mots de passe ne correspondent pas.', 'error');
                return;
            }
            if (password.length < 8) {
                showMessage(registerMessage, 'Le mot de passe doit contenir au moins 8 caractères.', 'error');
                return;
            }
            
            const existingUsers = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
            if (existingUsers.some(u => u.email === email)) {
                showMessage(registerMessage, 'Cet email est déjà utilisé.', 'error');
                return;
            }
            
            const newUser = { prenom, nom, email, password, newsletter, joinDate: new Date().toISOString() };
            existingUsers.push(newUser);
            localStorage.setItem('hotelUsers', JSON.stringify(existingUsers));
            localStorage.setItem('hotelUser', JSON.stringify(newUser));
            
            currentUser = newUser;
            formRegister.reset();
            if (modalRegister) modalRegister.style.display = 'none';
            if (modalWelcome) modalWelcome.style.display = 'flex';
            updateUIForLoggedInUser();
        });
    }
    
    // Connexion
    const formLogin = document.getElementById('form-login');
    const loginMessage = document.getElementById('login-message');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const remember = document.getElementById('remember-me')?.checked || false;
            
            if (!email || !password) {
                showMessage(loginMessage, 'Veuillez remplir tous les champs.', 'error');
                return;
            }
            
            const existingUsers = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
            const user = existingUsers.find(u => u.email === email && u.password === password);
            if (!user) {
                showMessage(loginMessage, 'Email ou mot de passe incorrect.', 'error');
                return;
            }
            
            currentUser = user;
            if (remember) {
                localStorage.setItem('hotelUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('hotelUser', JSON.stringify(user));
            }
            
            formLogin.reset();
            if (modalLogin) modalLogin.style.display = 'none';
            updateUIForLoggedInUser();
            showTemporaryMessage(`Bon retour, ${user.prenom} !`, 'success');
        });
    }
    
    // Déconnexion
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            currentUser = null;
            localStorage.removeItem('hotelUser');
            sessionStorage.removeItem('hotelUser');
            updateUIForGuest();
            showTemporaryMessage('Vous avez été déconnecté.', 'info');
        });
    }
    
    // ========== RÉSERVATION ==========
    if (formReservation) {
        formReservation.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!currentUser) {
                showMessage(reservationMessage, 'Vous devez être connecté pour réserver.', 'error');
                openLoginModal();
                return;
            }
            
            const nom = document.getElementById('reservation-nom').value.trim();
            const email = document.getElementById('reservation-email').value.trim();
            const dateArrivee = document.getElementById('reservation-date-arrivee').value;
            const dateDepart = document.getElementById('reservation-date-depart').value;
            const chambre = document.getElementById('reservation-chambre').value;
            const personnes = document.getElementById('reservation-personnes').value;
            const notes = document.getElementById('reservation-notes').value.trim();
            
            if (!nom || !email || !dateArrivee || !dateDepart || !chambre) {
                showMessage(reservationMessage, 'Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (new Date(dateDepart) <= new Date(dateArrivee)) {
                showMessage(reservationMessage, 'La date de départ doit être postérieure à la date d\'arrivée.', 'error');
                return;
            }
            if (new Date(dateArrivee) < new Date().setHours(0,0,0,0)) {
                showMessage(reservationMessage, 'La date d\'arrivée ne peut pas être dans le passé.', 'error');
                return;
            }
            
            const reservation = {
                id: Date.now(),
                nom, email, dateArrivee, dateDepart, chambre, personnes, notes,
                dateReservation: new Date().toISOString(),
                statut: 'confirmée'
            };
            
            userReservationsData.push(reservation);
            localStorage.setItem(`reservations_${currentUser.email}`, JSON.stringify(userReservationsData));
            
            showMessage(reservationMessage, 'Réservation confirmée ! Un email de confirmation vous a été envoyé.', 'success');
            
            // Réinitialiser certains champs
            document.getElementById('reservation-date-arrivee').value = '';
            document.getElementById('reservation-date-depart').value = '';
            document.getElementById('reservation-chambre').value = '';
            document.getElementById('reservation-notes').value = '';
            
            displayReservations();
        });
    }
    
    // Définir les dates minimales pour la réservation
    const dateArriveeInput = document.getElementById('reservation-date-arrivee');
    const dateDepartInput = document.getElementById('reservation-date-depart');
    if (dateArriveeInput) {
        const today = new Date().toISOString().split('T')[0];
        dateArriveeInput.min = today;
        dateArriveeInput.addEventListener('change', function() {
            if (dateDepartInput) {
                dateDepartInput.min = this.value;
                if (dateDepartInput.value < this.value) dateDepartInput.value = '';
            }
        });
    }
    
    // Boutons "Réserver" sur les cartes de chambres
    document.querySelectorAll('.btn-reserve-room').forEach(btn => {
        btn.addEventListener('click', function() {
            const roomType = this.getAttribute('data-room');
            if (!currentUser) {
                openLoginModal();
                showTemporaryMessage('Connectez-vous pour réserver cette chambre.', 'info');
                return;
            }
            const chambreSelect = document.getElementById('reservation-chambre');
            if (chambreSelect) chambreSelect.value = roomType;
            document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => dateArriveeInput?.focus(), 500);
        });
    });
    
    // Lien "Réserver maintenant" dans le hero
    if (heroReserve) {
        heroReserve.addEventListener('click', function(e) {
            if (!currentUser) {
                e.preventDefault();
                openLoginModal();
                showTemporaryMessage('Connectez-vous pour effectuer une réservation.', 'info');
            }
        });
    }
    
    // ========== RESTAURANT ÉVÉNEMENTS ==========
    // Catégories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            displayMenu(currentCategory);
        });
    });
    
    // Ajout au panier via délégation
    if (menuGrid) {
        menuGrid.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn-add-to-cart');
            if (btn) {
                const id = parseInt(btn.dataset.id);
                const name = btn.dataset.name;
                const price = parseFloat(btn.dataset.price);
                addToCart(id, name, price);
            }
        });
    }
    
    // Gestion des quantités et suppression dans le panier
    if (cartItems) {
        cartItems.addEventListener('click', function(e) {
            const target = e.target.closest('.quantity-btn, .remove-item');
            if (!target) return;
            const id = parseInt(target.dataset.id);
            const item = cart.find(i => i.id === id);
            if (!item) return;
            
            if (target.classList.contains('plus')) {
                item.quantity++;
            } else if (target.classList.contains('minus')) {
                item.quantity--;
                if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
            } else if (target.classList.contains('remove-item') || target.closest('.remove-item')) {
                cart = cart.filter(i => i.id !== id);
            }
            updateCartDisplay();
        });
    }
    
    // Validation de la commande
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (!currentUser) {
                showMessage(orderMessage, 'Vous devez être connecté pour commander.', 'error');
                openLoginModal();
                return;
            }
            if (cart.length === 0) {
                showMessage(orderMessage, 'Votre panier est vide.', 'error');
                return;
            }
            const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
            const order = {
                id: Date.now(),
                userId: currentUser.email,
                items: [...cart],
                total: total,
                date: new Date().toISOString(),
                status: 'confirmée'
            };
            const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`) || '[]');
            orders.push(order);
            localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
            cart = [];
            updateCartDisplay();
            showMessage(orderMessage, 'Votre commande a été enregistrée ! Elle sera préparée par notre chef.', 'success');
            setTimeout(() => {
                alert(`Merci pour votre commande ${currentUser.prenom} !\nTotal : ${total.toFixed(2)}€\nVotre repas sera prêt dans environ 30 minutes.`);
            }, 500);
        });
    }
    
    // Lien de navigation vers restaurant
    if (menuLink) {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('restaurant').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // ========== NEWSLETTER ==========
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (!email) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            }
            alert('Merci pour votre inscription à notre newsletter !');
            emailInput.value = '';
        });
    }
    
    // ========== NAVIGATION MOBILE ==========
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ========== EFFET SCROLL SUR LA NAVBAR ==========
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.padding = '10px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
    
    // ========== INITIALISATION ==========
    checkAuthStatus();
});

// ========== CARROUSEL DES CHAMBRES ==========
const carousel = document.getElementById('chambresCarousel');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
let autoScrollInterval;
const scrollSpeed = 1; // pixels par frame (ajustez pour la vitesse)
let isPaused = false;

// Dupliquer les cartes pour un effet infini (optionnel mais plus fluide)
function duplicateCards() {
    if (!carousel) return;
    const cards = Array.from(carousel.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        // Éviter les doublons d'IDs si présents
        clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        carousel.appendChild(clone);
    });
}

// Initialiser la duplication (pour un défilement infini)
duplicateCards();

// Fonction de défilement automatique
function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        if (!isPaused && carousel) {
            carousel.scrollLeft += scrollSpeed;
            // Si on arrive presque à la fin, on revient au début sans saut
            if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth - 10)) {
                carousel.scrollLeft = 0;
            }
        }
    }, 20); // environ 50fps
}

// Arrêter le défilement
function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

// Gestion du survol
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoScroll();
    });
    
    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoScroll();
    });
    
    // Démarrer le défilement automatique
    startAutoScroll();
}

// Navigation manuelle avec les flèches
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        carousel.scrollLeft -= carousel.clientWidth * 0.8; // défile d'une carte environ
        // Reprendre après un court délai
        setTimeout(() => {
            if (!carousel.matches(':hover')) {
                startAutoScroll();
            }
        }, 500);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        carousel.scrollLeft += carousel.clientWidth * 0.8;
        setTimeout(() => {
            if (!carousel.matches(':hover')) {
                startAutoScroll();
            }
        }, 500);
    });
}

// Ajuster la largeur des cartes si nécessaire (optionnel)
function adjustCardWidth() {
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.chambre-card');
    if (cards.length > 0) {
        // On peut définir une largeur dynamique basée sur le conteneur
        // Mais on a déjà une largeur fixe en CSS
    }
}
window.addEventListener('resize', adjustCardWidth);
adjustCardWidth();