const translations = {}
let currentLanguage = null

export async function loadTranslations(language) {
  try {
    const res = await fetch(`locales/${language}.json`)
    const data = await res.json()

    translations[language] = data
    currentLanguage = language
  } catch (err) {
    console.log('Error loading translation:', err)
  }
}

export function t(key, vars = {}) {
  let translation = translations[currentLanguage][key] || key

  for (let varKey in vars) {
    translation = translation.replace(`{{${varKey}}}`, vars[varKey])
  }

  return translation
}