// import { FastAverageColor } from 'fast-average-color';

export const utilService = {
  makeId,
  getRandomIntInc,
  saveToStorage,
  loadFromStorage,
  debounce,
  timeAgo,
  makeRandNum,
  getRandomColor,
  // getImgAvgColor,
  // isDarkImg,
  isDarkColor,
  get21Cards,
  get6Cards,
  getBrightColor
}

function makeRandNum() {
  return Math.trunc(Date.now() % 100)
}

function makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getRandomIntInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function debounce(func, wait = 30) {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function timeAgo(input) {
  const date = input instanceof Date ? +input : new Date(+input)
  const formatter = new Intl.RelativeTimeFormat('en')
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }
  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key]
      let time = formatter.format(Math.round(delta), key)
      if (time.includes('in')) {
        time = time.replace('in ', '')
        time = time.replace('ago', '')
        time += ' ago'
      }
      return time ? time : 'Just now'
    }
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getBrightColor(idx) {
  const clrs = [
    '#f2d600',
    '#ff9f1a',
    '#eb5a46',
    '#c377e0',
    '#0079bf',
    '#00c2e0',
    '#51e898',
    '#ECB390',
    '#FCF8E8',
    '#CEE5D0',
    '#94B49F'
  ]
  return clrs[idx]
}

export const TypeWriter = class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.isDeleting = false
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length
    // Get full text of current word
    const fullTxt = this.words[current]

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // Initial Type Speed
    let typeSpeed = 300

    if (this.isDeleting) {
      typeSpeed /= 2
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait
      // Set delete to true
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      // Move to next word
      this.wordIndex++
      // Pause before start typing
      typeSpeed = 30
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// async function getImgAvgColor(imgUrl) {
//   try {
//       const fac = new FastAverageColor();
//       const color = await fac.getColorAsync(imgUrl)
//       return color.hexa
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

// async function isDarkImg(imgUrl) {
//   try {
//     const fac = new FastAverageColor();
//     const color = await fac.getColorAsync(imgUrl)
//     return color.isDark
//   }
//   catch (e) {
//     console.log(e)
//   }
// }

function isDarkColor(color) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness < 155;
}

function get21Cards(windowSize) {
  const cardsArr = []
  const cardWidth = windowSize.width / 6 > 70 ? 70 : windowSize.width / 6
  const heightDivide = cardWidth / 12 < 5.5 ? 5.5 : cardWidth / 12
  const heightDistance = 30
  const widthDistance = ((windowSize.width / 5) / 2) - cardWidth / 2

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const newCard = {
        x: ((windowSize.width / 5) * j) + widthDistance,
        y: ((windowSize.height / heightDivide) * i) + heightDistance,
        num: (i + 1) * (j + 1) + ((4 - j) * i),
        width: cardWidth
      }
      cardsArr.push(newCard)
    }
  }
  cardsArr.push({
    x: ((windowSize.width / 5) * 2) + widthDistance,
    y: ((windowSize.height / heightDivide) * 4) + heightDistance,
    num: 21,
    width: cardWidth
  })
  return cardsArr
}

function get6Cards(windowSize) {
  const cardsArr = []
  const cardWidth = windowSize.width / 6 > 55 ? 55 : windowSize.width / 6
  const nums = []
  for (let i = 1; i <= 50; i++) { nums.push(i) }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const newCard = {
        num: nums[getRandomIntInc(0, nums.length - 1)],
        width: cardWidth
      }
      nums.splice(nums.findIndex(c => newCard.num === c), 1)
      cardsArr.push(newCard)
    }
  }
  return cardsArr
}