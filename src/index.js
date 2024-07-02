import './index.html'
import './styles.css'
import './locales/de.json'
import './locales/en.json'
import './locales/es.json'
import './locales/fr.json'
import './locales/ja.json'
import './locales/pt.json'
import { loadTranslations, t } from './assets/scripts/translations'
import { changeSizeText } from './assets/scripts/changeSizeText'

const offers = document.querySelectorAll('.offer')
const offerSbmBtn = document.querySelector('#offer-submit')

const LOCALES_CODE = ['de', 'en', 'es', 'fr', 'ja', 'pt']

const urlParams = new URLSearchParams(window.location.search)
const navigatorLocale = navigator.language.split('-')[0]
const systemLang = LOCALES_CODE.includes(navigatorLocale) ? navigatorLocale : 'en'
let currentLanguage = LOCALES_CODE.includes(urlParams.get('lang')) ? urlParams.get('lang') : systemLang

loadTranslations(currentLanguage).then(() => {
  updateText()
})

offers.forEach(offer => {

  offer.addEventListener('click', () => {
    offers.forEach(offer => {
      offer.classList.remove('offer_active')
    })

    offer.classList.add('offer_active')

    let href = offer.getAttribute('data-href')
    offerSbmBtn.setAttribute('href', href)
  })
})

window.onload = changeSizeFooterLinks
window.addEventListener('resize', changeSizeFooterLinks)

function changeSizeFooterLinks() {
  const bannerFooterBlockLink = document.querySelector('.banner__footer')
  const elements = document.querySelectorAll('.banner__footer-link') || []

  changeSizeText(bannerFooterBlockLink, elements)
}

function updateText() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');

    const attrs = Object.values(element.attributes)
      .filter(i => i.name.includes('data-i18n-var-'))
      .map(i => i.name.replace('data-i18n-var-', ''))

    const props = {}

    for (let i = 0; i < attrs.length; i++) {
      props[attrs[i]] = element.getAttribute(`data-i18n-var-${attrs[i]}`)
    }

    element.innerHTML = t(key, props);
  });
}