document.addEventListener('DOMContentLoaded', () => {
    const pageData = {
        home: {
            cards: [
                { imgSrc: "./images/2.png", altText: "Our Creative Mission", description: "Our success is in creating games which are enjoyed by the players around the world." },
                { imgSrc: "./images/1.png", altText: "ghoSTudio games", description: "Welcome to ghoSTudio games." },
                { imgSrc: "./images/3.png", altText: "Join the Adventure", description: "For now, ghoSTudio games is a one-person team. It's just me (Ghost), a passionate developer dedicated to creating the kind of unique and engaging games I've always wanted to play. I'm excited to share my creations with you." }
            ],
            description: "Welcome to ghoSTudio games, where creativity respawns for greatness!"
        },
        ourGames: {
            cards: [
                { imgSrc: "./images/4.png", altText: "SlideRush", description: "A thrilling and addictive game designed for non-stop fun across multiple dynamic levels!", link: "https://play.google.com/store/apps/details?id=com.GhoStudioGames.SlideRush" },
                { imgSrc: "./images/5.png", altText: "Zero Drift", description: "The ultimate drift racing experience that combines skill, control, and lightning-fast speed!", link: "https://play.google.com/store/apps/details?id=com.GhoStudioGames.ZeroDrift" },
                { imgSrc: "./images/7.png", altText: "Phobophobia 1.0 – The Experiment", description: "A story-driven psychological horror experience where you must survive 10 phobia-inspired rooms, each filled with atmospheric puzzles, relentless dread, and unsettling truths waiting to be uncovered.", link: "https://store.steampowered.com/app/3981410/Phobophobia_10__The_Experiment/"},
                { imgSrc: "./images/6.png", altText: "Extreme 2048", description: "Take your 2048 game experience to the next level with four challenging modes.", link: "https://play.google.com/store/apps/details?id=com.GhoStudioGames.Extreme2048" },
                { imgSrc: "./images/8.png", altText: "Next Title", description: "Our next title is still a whisper in the ether—an idea taking form. What will emerge from the imagination? Only time will tell.", link: "#", buttonText: "Coming Soon" }
            ],
            description: "Explore our library of released and upcoming titles."
        },
        stats: {
            cards: [
                { imgSrc: "./images/9.png", altText: "Mobile Stats", description: "Our games have been downloaded over 5000 times on mobile. A huge thank you to our amazing community of players!" },
                { imgSrc: "./images/10.png", altText: "PC Stats", description: "100+ players have stepped into our world of PC games so far, and the momentum continues." },
                { imgSrc: "./images/11.png", altText: "Console Stats", description: "We're aiming to bring our games to consoles in the future. Expanding to new platforms is our next big goal." }
            ],
            description: "Stats and leaderboards for all our titles."
        },
        socials: {
            cards: [
                { imgSrc: "./images/13.png", altText: "Youtube", description: "Subscribe to our YouTube channel.", link: "https://www.youtube.com/@ghostudiogames" },
                { imgSrc: "./images/12.png", altText: "Instagram", description: "Follow us on Instagram!", link: "https://www.instagram.com/ghostudio_games/" },
                { imgSrc: "./images/15.png", altText: "Discord", description: "Our Discord server is more than an update hub, it’s a space where gamers connect, anime discussions happen, ideas are shared, and feedback shapes the future of our games. Join us to be part of the conversation and help grow the community.", link: "https://discord.gg/7uqW4FW8vH" },
                { imgSrc: "./images/14.png", altText: "X", description: "Get the latest news on X (Twitter).", link: "https://x.com/GhoStudio_Games" },
                { imgSrc: "./images/16.png", altText: "TikTok", description: "Follow us on TikTok!", link: "https://www.tiktok.com/@ghostudiogames"}
            ],
            description: "Connect with us on social media."
        },
        joinUs: {
            cards: [
                { imgSrc: "./images/17.png", altText: "Level Designer", description: "Thank you for your interest in joining our team at ghoSTudio games. At this time, we do not have any job openings." },
                { imgSrc: "./images/18.png", altText: "Programmer", description: "Thank you for your interest in joining our team at ghoSTudio games. At this time, we do not have any job openings." },
                { imgSrc: "./images/19.png", altText: "Web Developer", description: "Thank you for your interest in joining our team at ghoSTudio games. At this time, we do not have any job openings." }
            ],
            description: "Ready to join the team? Check out our open positions."
        },
        contactUs: {
            cards: [
                { imgSrc: "./images/20.png", altText: "General Inquiry", description: "For support or business inquiries, please reach out to us at gamesghostudio@gmail.com" }
            ],
            description: "For support or business inquiries, please reach out to us at gamesghostudio@gmail.com"
        }
    };
    
    const main = document.querySelector('main');
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider');
    const pageDescription = document.querySelector('.page-description');
    const navLinks = document.querySelectorAll('nav ul li a');
    const headerLogoLink = document.querySelector('.logo-link');
    const backToTopBtn = document.getElementById('back-to-top');

    let sliderState = {};

    function debounce(func, delay = 250) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function animateSlider() {
        if (!sliderState.cards) return;

        sliderState.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            if (index === sliderState.counter) {
                card.classList.add('active');
            } else if (index === sliderState.counter - 1) {
                card.classList.add('prev');
            } else if (index === sliderState.counter + 1) {
                card.classList.add('next');
            }
        });
        
        gsap.to(sliderState.cards, {
            duration: 0.6,
            scale: (i) => (i === sliderState.counter ? 1.1 : (Math.abs(i - sliderState.counter) === 1 ? 0.9 : 0.8)),
            ease: "power3.out",
            stagger: 0.05
        });
    }

    function updateDescription() {
        const pageKey = sliderState.currentPageKey;
        if (!pageKey || !pageData[pageKey]) return;
        
        const activeCardIndex = sliderState.counter;
        const cards = pageData[pageKey].cards;
        
        if (cards && cards[activeCardIndex] && cards[activeCardIndex].description) {
            pageDescription.textContent = cards[activeCardIndex].description;
        } else {
            pageDescription.textContent = pageData[pageKey].description || '';
        }
    }

    function checkOverflow() {
        if (slider.scrollWidth > sliderContainer.clientWidth) {
            sliderContainer.classList.add('is-scrollable');
        } else {
            sliderContainer.classList.remove('is-scrollable');
        }
    }

    function updateSlider() {
        animateSlider();
        updateDescription();
    }

    function initializeSlider() {
        const cards = slider.querySelectorAll('.card');
        if (cards.length === 0) {
            sliderContainer.style.visibility = 'hidden';
            sliderState = {};
            return;
        }

        sliderContainer.style.visibility = 'visible';
        slider.style.transform = 'none';
        sliderState.cards = cards;
        sliderState.maxCounter = cards.length - 1;
        sliderState.counter = Math.floor(cards.length / 2);
        
        updateSlider();
        checkOverflow();
    }

    function renderPage(pageKey) {
        const data = pageData[pageKey];
        if (!data) return;
        
        sliderState.currentPageKey = pageKey;
        main.classList.add('content-loading');

        setTimeout(() => {
            slider.innerHTML = '';
            if (data.cards && data.cards.length > 0) {
                const cardHTML = data.cards.map(card => {
                    let btnHTML = '';
                    if (card.link) {
                        const btnText = card.buttonText ? card.buttonText : 'Explore';
                        const btnClass = card.buttonText ? 'card-button disabled' : 'card-button';
                        btnHTML = `<a href="${card.link}" class="${btnClass}" target="_blank">${btnText}</a>`;
                    }
                    return `
                    <div class="card">
                        <img src="${card.imgSrc}" alt="${card.altText}">
                        ${btnHTML}
                    </div>`;
                }).join('');
                slider.innerHTML = cardHTML;
            }
            pageDescription.textContent = data.description || '';
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === pageKey);
            });

            document.title = `ghoSTudio games | ${pageKey === 'home' ? 'Home' : pageKey}`;
            
            requestAnimationFrame(() => {
                initializeSlider();
                main.classList.remove('content-loading');
            });

        }, 300);
    }
    
    function selectCardOnClick(e) {
        if (e.target.closest('.card-button')) return;

        const card = e.target.closest('.card');
        if (!card || card.classList.contains('active')) return;

        const clickedIndex = Array.from(sliderState.cards).indexOf(card);
        if (clickedIndex === -1) return;

        sliderState.counter = clickedIndex;
        updateSlider();
    }

    if (slider) {
        slider.addEventListener('click', selectCardOnClick);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('active')) return;
            const pageKey = e.target.dataset.page;
            renderPage(pageKey);
        });
    });
    
    headerLogoLink.addEventListener('click', (e) => {
        if (window.location.pathname.includes('legal.html')) return;
        e.preventDefault();
        renderPage('home');
    });
    
    window.addEventListener('resize', debounce(() => {
        if (document.querySelector('.slider')) {
            initializeSlider();
        }
    }));

    if (document.querySelector('.slider')) {
        renderPage('home');
    }
});