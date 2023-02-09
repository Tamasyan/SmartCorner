var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2,
  spaceBetween: 32,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    992: {
      slidesPerView: 2.2,
      spaceBetween: 40,
    },
  },
});

let isThrottled = false
const body = document.querySelector('body')
const header = document.querySelector('.header')
const headerBurger = document.querySelector('.header__burger')

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

headerBurger.addEventListener('click', () => {
  thingToThrottle(() => {
      header.classList.toggle('active')
      if (header.classList.contains('active')) {
        body.classList.add('lock');
      } else {
        body.classList.remove('lock');
      }
  }, 400)
})
