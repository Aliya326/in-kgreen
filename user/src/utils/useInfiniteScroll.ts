import { onMounted, onUnmounted, watch } from 'vue'

export function useInfiniteScroll(
  targetRef,
  onLoadMore: () => void,
  options?: { rootMargin?: string; enabled?: () => boolean }
) {
  let observer: IntersectionObserver | null = null

  const cleanup = () => {
    if (observer) observer.disconnect()
    observer = null
  }

  const setup = () => {
    cleanup()
    const el = targetRef.value
    if (!el) return
    if (options?.enabled && !options.enabled()) return

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        if (options?.enabled && !options.enabled()) return
        onLoadMore()
      },
      { rootMargin: options?.rootMargin || '200px' }
    )

    observer.observe(el)
  }

  onMounted(setup)
  watch(() => targetRef.value, setup)
  onUnmounted(cleanup)
}

