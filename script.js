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

// ===================================
// 校区详情模态框
// ===================================

const campusData = {
    xianlin: {
        name: '仙林校区',
        tag: '主校区 · 现代化校园',
        heroImage: 'https://lib.nju.edu.cn/__local/7/20/09/8F3565F3734E11C36C1CCBADE0D_DF39C712_9F037.jpg',
        description: '仙林校区位于南京市栖霞区仙林大道163号，是南京大学的主校区，占地面积约3000亩。校区于2009年投入使用，拥有现代化的教学设施和优美的校园环境。',
        highlights: [
            '杜厦图书馆：总建筑面积5.3万平方米，是江苏省单体面积最大的高校图书馆',
            '香雪海园：春季樱花盛开，是校园最美的赏花胜地',
            '方肇周体育馆：现代化综合体育场馆，承办多项重要赛事',
            '敬文学生活动中心：学生社团活动的重要场所'
        ],
        facilities: ['图书馆', '体育馆', '学生公寓', '餐饮中心', '医院', '超市'],
        gallery: [
            'https://lib.nju.edu.cn/__local/A/03/04/A51BE7851446EA7DC06201BFC13_8CEFE4B0_9F991.jpg',
            'https://lib.nju.edu.cn/__local/5/E3/3B/B646021F8FABF2C0433BFE29BAE_88E60CBB_C42EE.jpg',
            'https://lib.nju.edu.cn/__local/6/33/F9/2514922C8D0F9E87A604841405A_439C0999_B6C34.jpg'
        ]
    },
    gulou: {
        name: '鼓楼校区',
        tag: '历史校区 · 百年传承',
        heroImage: 'http://pics4.baidu.com/feed/9f510fb30f2442a7af94b129e85c6d44d0130256.jpeg@f_auto?token=c9e95eae35e9c25b685f3f4c7f001a20',
        description: '鼓楼校区位于南京市鼓楼区汉口路22号，是南京大学的发源地，承载着百年历史与文化传承。金陵大学旧址建筑群是全国重点文物保护单位。',
        highlights: [
            '金陵大学旧址：百年历史建筑群，中西合璧的建筑风格',
            '六朝松：千年古树，见证南大历史沧桑',
            '北大楼：标志性建筑，南大的精神象征',
            '孙中山铜像：纪念孙中山先生曾在南大演讲'
        ],
        facilities: ['历史建筑群', '校史馆', '图书馆', '行政楼', '研究生院'],
        gallery: [
            'http://pics3.baidu.com/feed/e824b899a9014c0865ac1b065e69bb077af4f49b.jpeg@f_auto?token=96077ac557781559c11406551aba74c6',
            'https://bkimg.cdn.bcebos.com/pic/4610b912c8fcc3cec3fdaf5ecc0fc188d43f87948a0e',
            'https://bkimg.cdn.bcebos.com/pic/5882b2b7d0a20cf404ddf7d276094b36acaf9969'
        ]
    },
    pukou: {
        name: '浦口校区',
        tag: '科研基地 · 创新发展',
        heroImage: 'https://bkimg.cdn.bcebos.com/pic/509b9fcbb0a98ac052664f94',
        description: '浦口校区位于南京市浦口区，是南京大学重要的科研基地和产学研合作平台，推动科技成果转化，服务区域经济发展。',
        highlights: [
            '产业技术研究院：推动科技成果转化的重要平台',
            '创新创业基地：孵化高新技术企业和项目',
            '实验室集群：多个国家级、省部级重点实验室',
            '产学研合作：与多家企业建立深度合作'
        ],
        facilities: ['科研实验室', '孵化器', '会议中心', '学生公寓'],
        gallery: [
            'https://bkimg.cdn.bcebos.com/pic/c9bdddceb98cc03e92457e8b',
            'https://bkimg.cdn.bcebos.com/pic/7aad4ae706a31313b9382094',
            'https://bkimg.cdn.bcebos.com/pic/d4628535e5dde7116966f08fadefce1b9d166117'
        ]
    },
    suzhou: {
        name: '苏州校区',
        tag: '新工科 · 未来引擎',
        heroImage: 'https://pic.rmb.bdstatic.com/bjh/news/35b0a0eb2fb9c778f66d909a9f3ce2d9.jpeg',
        description: '苏州校区位于苏州市高新区太湖科学城，是南京大学新工科建设的主阵地。总投资128亿元，一期工程已交付使用，聚焦人工智能、集成电路、能源资源等卡脖子领域。',
        highlights: [
            '10个新工科学院：智能科学与技术、集成电路、数字经济与管理等',
            '10个前沿研究院：环境与健康、深空探测、功能材料等',
            '院士林：汇聚全球顶尖科学家',
            '产学研融合：与苏州产业深度对接'
        ],
        facilities: ['科创大厦', '图书馆', '学术交流中心', '大礼堂', '文体中心'],
        gallery: [
            'https://pic.rmb.bdstatic.com/bjh/news/16b6001951fd1f3d28283622e999a9bc.jpeg',
            'https://bkimg.cdn.bcebos.com/pic/d1a20cf431adcbefb25eeb7aa3af2edda3cc9f60',
            'https://www.nju.edu.cn/__local/A/EB/E3/4BEB2C6B44C2949111317103513_2287F688_1C23B.jpg'
        ]
    }
};

function openCampusModal(campusId) {
    const campus = campusData[campusId];
    if (!campus) return;
    
    const modal = document.getElementById('campusModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-hero">
            <img src="${campus.heroImage}" alt="${campus.name}">
            <div class="modal-hero-overlay">
                <h2>${campus.name}</h2>
                <p>${campus.tag}</p>
            </div>
        </div>
        <div class="modal-info">
            <p>${campus.description}</p>
            
            <h3>🏛️ 标志性景观</h3>
            <ul>
                ${campus.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
            
            <h3>🏢 主要设施</h3>
            <p>${campus.facilities.join(' · ')}</p>
        </div>
        <div class="modal-gallery">
            ${campus.gallery.map(img => `<img src="${img}" alt="${campus.name}">`).join('')}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCampusModal() {
    const modal = document.getElementById('campusModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 点击模态框背景关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('campusModal');
    if (e.target === modal) {
        closeCampusModal();
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCampusModal();
    }
});
