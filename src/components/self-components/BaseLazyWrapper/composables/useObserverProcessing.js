import { ref, onMounted, onBeforeUnmount } from 'vue'

export default function (
  rootMargin = 0,
  unobserveAfterIntersect = false,
  centeredViewPort = false
) {
  const intersectionObserver = ref(null)
  const wrapper = ref(null)
  const isVisibleContent = ref(typeof window === 'undefined')
  const margin = centeredViewPort ? '-50% 0% -50% 0%' : `${rootMargin}px`

  const checkIntersections = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        isVisibleContent.value = false
        return
      }

      isVisibleContent.value = true
      if (!unobserveAfterIntersect) {
        intersectionObserver.value.unobserve(wrapper.value)
      }
    })
  }
  onMounted(() => {
    intersectionObserver.value = new IntersectionObserver(checkIntersections, {
      rootMargin: margin
    })
    if (wrapper.value) intersectionObserver.value?.observe(wrapper.value)
  })

  onBeforeUnmount(() => {
    if (wrapper.value) intersectionObserver.value?.unobserve(wrapper.value)
  })
  return {
    checkIntersections,
    intersectionObserver,
    wrapper,
    isVisibleContent
  }
}
