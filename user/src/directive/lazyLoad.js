export default {
  mounted(el, binding) {
    const loadImage = () => {
      el.src = binding.value
      el.onload = () => {
        el.classList.add('loaded')
      }
      el.onerror = () => {
        el.classList.add('error')
      }
    }
    
    // 使用 IntersectionObserver
    const createObserver = () => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage()
            observer.unobserve(el)
          }
        })
      }, options)
      
      observer.observe(el)
    }
    
    // 浏览器兼容性处理
    if ('IntersectionObserver' in window) {
      createObserver()
    } else {
      // 降级方案
      loadImage()
    }
  }
}