const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'

const setSrc = (el, url) => {
  if (!url) return
  el.src = url
  el.onload = () => el.classList.add('loaded')
  el.onerror = () => el.classList.add('error')
}

const observe = (el, url) => {
  if (!('IntersectionObserver' in window)) {
    setSrc(el, url)
    return
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setSrc(el, url)
        observer.unobserve(el)
      }
    })
  }, { root: null, rootMargin: '0px', threshold: 0.1 })
  observer.observe(el)
}

export default {
  mounted(el, binding) {
    if (el.tagName !== 'IMG') return
    if (!el.getAttribute('src')) el.src = PLACEHOLDER
    observe(el, binding.value)
  },
  updated(el, binding) {
    if (el.tagName !== 'IMG') return
    if (binding.value && binding.value !== binding.oldValue) {
      el.classList.remove('loaded', 'error')
      setSrc(el, binding.value)
    }
  },
}
