let isThrottled = false
let bodyLockStatus = true
const delayAnimation = 400
const html = document.documentElement
const body = document.querySelector('body')
const header = document.querySelector('.header')
const headerBurger = document.querySelector('.header__burger')
const lockPadding = document.querySelectorAll('.lock-padding')
const popupOpenLinks = document.querySelectorAll('.popup-open')
const popupCloseLinks = document.querySelectorAll('.popup-close')
const dropdownMenus = document.querySelectorAll('.sub-menu')
let isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}
AOS.init({
    offset: 0,
    duration: 800,
    once: true
})
SmoothScroll({
    animationTime: 800,
    stepSize: 150,
    accelerationDelta: 30,
    accelerationMax: 2,
    keyboardSupport: true,
    arrowScroll: 50,
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    touchpadSupport: true
})
if (!isMobile.any()) {
    const headerLogoScript = document.createElement('script')
    headerLogoScript.src = '/wp-content/themes/fireart/assets/js/header-logo.js'
    body.appendChild(headerLogoScript)
}

function thingToThrottle(func, timeout) {
    if (isThrottled) {
        return
    }
    isThrottled = true
    setTimeout(function() {
        isThrottled = false;
    }, timeout)
    func()
}

function headerFixed() {
    if (window.scrollY >= 75) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
    }
}
headerFixed()
document.addEventListener('scroll', () => {
    headerFixed()
})

function slideUp(target, duration = 400) {
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.transitionProperty = 'height'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.offsetHeight
    target.style.height = 0
    window.setTimeout(() => {
        target.style.display = 'none'
        target.style.removeProperty('height')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-property')
        target.style.removeProperty('transition-duration')
    }, duration)
}

function slideDown(target, duration = 400) {
    target.style.display = 'block'
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.transitionProperty = 'height'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = 0
    target.offsetHeight
    target.style.height = height + 'px'
    window.setTimeout(() => {
        target.style.removeProperty('height')
        target.style.removeProperty('overflow')
        target.style.removeProperty('transition-property')
        target.style.removeProperty('transition-duration')
    }, duration)
}

function slideToggle(target, duration = 400) {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration)
    } else {
        return slideUp(target, duration)
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index]
            el.style.paddingRight = lockPaddingValue
        }
    }
    body.style.paddingRight = lockPaddingValue
    body.classList.add('lock')
    bodyLockStatus = false
    setTimeout(function() {
        bodyLockStatus = true
    }, delayAnimation)
}

function bodyUnlock() {
    setTimeout(function() {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, delayAnimation)
    bodyLockStatus = false
    setTimeout(function() {
        bodyLockStatus = true
    }, delayAnimation)
}

function popupClose(popupActive, doUnlock = true) {
    if (bodyLockStatus) {
        popupActive.classList.remove('active')
        setTimeout(function() {
            popupActive.classList.add('hide')
        }, delayAnimation)
        if (doUnlock) {
            bodyUnlock()
        }
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && bodyLockStatus) {
        const popupActive = document.querySelector('.popup.active')
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        currentPopup.classList.add('active')
        currentPopup.classList.remove('hide')
    }
}
if (popupOpenLinks.length > 0) {
    for (let index = 0; index < popupOpenLinks.length; index++) {
        const popupOpenLink = popupOpenLinks[index]
        popupOpenLink.addEventListener('click', function(e) {
            const popupName = popupOpenLink.getAttribute('href').replace('#', '')
            const currentPopup = document.getElementById(popupName)
            popupOpen(currentPopup)
            e.preventDefault()
        })
    }
}
if (popupCloseLinks.length > 0) {
    for (let index = 0; index < popupCloseLinks.length; index++) {
        const popupCloseLink = popupCloseLinks[index]
        popupCloseLink.addEventListener('click', function(e) {
            popupClose(popupCloseLink.closest('.popup'))
            e.preventDefault()
        })
    }
}
headerBurger.addEventListener('click', () => {
    thingToThrottle(() => {
        header.classList.toggle('active')
        if (header.classList.contains('active')) {
            bodyLock()
        } else {
            bodyUnlock()
        }
    }, 400)
})
dropdownMenus.forEach(menu => {
    const link = menu.querySelector('a')
    const linkIcon = document.createElement('div')
    const content = menu.querySelector('ul')
    linkIcon.innerHTML = '<svg viewBox="0 0 384 512"><path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"/></svg>'
    link.appendChild(linkIcon)
    link.addEventListener('click', (e) => {
        if (window.innerWidth < 830) {
            e.preventDefault()
            thingToThrottle(() => {
                menu.classList.toggle('active')
                slideToggle(content)
            }, 400)
        }
    })
})
ThirtPartyJsLoader.add_function('lazy_iframe_loading', () => {
    let iframeVideos = document.querySelectorAll('[lazy-src]');
    iframeVideos.forEach(el => {
        el.setAttribute('src', el.getAttribute('lazy-src'));
    })
})