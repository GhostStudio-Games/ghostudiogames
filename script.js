document.addEventListener('DOMContentLoaded', () => {
    const pageData = {
        home: {
            cards: [
                { imgSrc: "./images/2.png", altText: "Our Creative Mission", description: "Our success is in creating games which are enjoyed by the players around the world." },
                { imgSrc: "./images/1.png", altText: "Ghost Studio Games", description: "Welcome to Ghost Studio Games." },
                { imgSrc: "./images/3.png", altText: "Join the Adventure", description: "For now, Ghost Studio Games is a one-person team. It's just me (Ghost), a passionate developer dedicated to creating the kind of unique and engaging games I've always wanted to play. I'm excited to share my creations with you." }
            ],
            description: "Welcome to ghoSTudio Games, where creativity respawns for greatness!"
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
                { imgSrc: "./images/10.png", altText: "PC Stats", description: "60+ players have stepped into our world of PC games so far, and the momentum continues." },
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
                { imgSrc: "./images/16.png", altText: "Steam", description: "Wishlist our upcoming titles on Steam.", link: "https://store.steampowered.com/curator/45751656"}
            ],
            description: "Connect with us on social media."
        },
        joinUs: {
            cards: [
                { imgSrc: "./images/17.png", altText: "Level Designer", description: "Thank you for your interest in joining our team at Ghost Studio Games. At this time, we do not have any job openings." },
                { imgSrc: "./images/18.png", altText: "Programmer", description: "Thank you for your interest in joining our team at Ghost Studio Games. At this time, we do not have any job openings." },
                { imgSrc: "./images/19.png", altText: "Web Developer", description: "Thank you for your interest in joining our team at Ghost Studio Games. At this time, we do not have any job openings." }
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
    const cardButton = document.querySelector('.card-button');
    const navLinks = document.querySelectorAll('nav ul li a');
    const headerLogoLink = document.querySelector('.logo-link');

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

    function animateSlider() {
        if (!sliderState.images) return;

        sliderState.images.forEach((img, index) => {
            img.classList.remove('active', 'prev', 'next');
            if (index === sliderState.counter) {
                img.classList.add('active');
            } else if (index === sliderState.counter - 1) {
                img.classList.add('prev');
            } else if (index === sliderState.counter + 1) {
                img.classList.add('next');
            }
        });
        
        gsap.to(sliderState.images, {
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

    function updateButton() {
        const pageKey = sliderState.currentPageKey;
        if (!pageKey || !pageData[pageKey]) return;
        
        const activeCardIndex = sliderState.counter;
        const cards = pageData[pageKey].cards;
        const cardData = cards && cards[activeCardIndex] ? cards[activeCardIndex] : null;

        if (cardData && cardData.link) {
            cardButton.href = cardData.link;
            cardButton.classList.remove('hidden');

            if (cardData.buttonText) {
                cardButton.textContent = cardData.buttonText;
                cardButton.classList.add('disabled');
            } else {
                cardButton.textContent = 'Visit Site';
                cardButton.classList.remove('disabled');
            }
        } else {
            cardButton.classList.add('hidden');
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
        updateButton();
    }

    function initializeSlider() {
        const images = slider.querySelectorAll('img');
        if (images.length === 0) {
            sliderContainer.style.visibility = 'hidden';
            sliderState = {};
            return;
        }

        sliderContainer.style.visibility = 'visible';
        slider.style.transform = 'none';
        sliderState.images = images;
        sliderState.maxCounter = images.length - 1;
        sliderState.counter = Math.floor(images.length / 2);
        
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
                const cardHTML = data.cards.map(card => `<img src="${card.imgSrc}" alt="${card.altText}">`).join('');
                slider.innerHTML = cardHTML;
            }
            pageDescription.textContent = data.description || '';
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === pageKey);
            });

            document.title = `Ghost Studio Games | ${pageKey === 'home' ? 'Home' : pageKey}`;
            
            requestAnimationFrame(() => {
                initializeSlider();
                main.classList.remove('content-loading');
            });

        }, 300);
    }
    
    function selectCardOnClick(e) {
        if (e.target.tagName !== 'IMG' || e.target.classList.contains('active')) return;

        const clickedIndex = Array.from(sliderState.images).indexOf(e.target);
        if (clickedIndex === -1) return;

        sliderState.counter = clickedIndex;
        updateSlider();
    }

    slider.addEventListener('click', selectCardOnClick);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('active')) return;
            const pageKey = e.target.dataset.page;
            renderPage(pageKey);
        });
    });
    
    headerLogoLink.addEventListener('click', (e) => {
        e.preventDefault();
        renderPage('home');
    });
    
    window.addEventListener('resize', debounce(() => {
        initializeSlider();
    }));

    renderPage('home');
});