// ===================================
// 南京大学介绍网站 - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动动画 - Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.timeline-item, .achievement-card, .discipline-card, .campus-card, .alumni-card, .symbol-card').forEach(el => {
        observer.observe(el);
    });
    
    // 数字计数动画
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // 观察数字元素
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const value = parseInt(entry.target.textContent.replace(/[^0-9]/g, ''));
                if (!isNaN(value) && value > 0) {
                    animateNumber(entry.target, value);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.number-value, .stat-value').forEach(el => {
        numberObserver.observe(el);
    });
    
    // 鼠标跟随效果（英雄区域）
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const pattern = document.querySelector('.hero-pattern');
        if (pattern) {
            pattern.style.background = `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at ${100 - x * 100}% ${y * 100}%, rgba(212,175,55,0.2) 0%, transparent 40%)
            `;
        }
    });
    
    // 卡片悬停效果增强
    document.querySelectorAll('.achievement-card, .discipline-card, .campus-card, .alumni-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 打字机效果（校训）
    const motto = document.querySelector('.hero-motto');
    if (motto) {
        const text = motto.textContent;
        motto.textContent = '';
        motto.style.opacity = '1';
        
        let index = 0;
        const typeWriter = setInterval(() => {
            if (index < text.length) {
                motto.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }
    
    // 滚动进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6B3FA0, #D4AF37);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // 回到顶部按钮
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6B3FA0, #8B5FC0);
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(107, 63, 160, 0.3);
        z-index: 999;
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    console.log('🎓 南京大学介绍网站已加载');
    console.log('诚朴雄伟，励学敦行');
});
