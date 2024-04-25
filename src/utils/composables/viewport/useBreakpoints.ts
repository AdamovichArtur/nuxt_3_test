import { computed, onMounted, onUnmounted, ref } from 'vue'
import breakpointsConstants from '@/constants/breakpointsConstants'

const { SM_SIZE, MD_SIZE, LG_SIZE, XL_SIZE, XXL_SIZE } = breakpointsConstants

export default function () {
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  const windowOrientation = ref('')

  const setOrientation = () => {
    windowOrientation.value = screen.orientation?.type?.includes('landscape')
      ? 'landscape'
      : 'portrait'
  }

  const onWidthChange = () => {
    windowWidth.value = window.innerWidth
    setOrientation()
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
    setOrientation()

    window.addEventListener('resize', onWidthChange)
  })

  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const type = computed(() => {
    if (windowWidth.value >= XXL_SIZE) return '3xl'
    if (windowWidth.value >= XL_SIZE && windowWidth.value < XXL_SIZE) return '2xl'
    if (windowWidth.value >= LG_SIZE && windowWidth.value < XL_SIZE) return 'xl'
    if (windowWidth.value >= MD_SIZE && windowWidth.value < LG_SIZE) return 'lg'
    if (windowWidth.value >= SM_SIZE && windowWidth.value < MD_SIZE) return 'md'
    if (windowWidth.value < SM_SIZE && windowWidth.value > 0) return 'sm'

    return null
  })

  const isLargestDesktop = computed(() => type.value === '3xl')
  const isVeryLargeDesktop = computed(() => type.value === '2xl')
  const isLargeDesktop = computed(() => type.value === 'xl')
  const isDesktop = computed(() => type.value === 'lg')
  const isTablet = computed(() => type.value === 'md')
  const isMobile = computed(() => type.value === 'sm')

  const isDesktopDevice = computed(
    () =>
      isLargestDesktop.value || isVeryLargeDesktop.value || isLargeDesktop.value || isDesktop.value
  )

  const width = computed(() => windowWidth.value)
  const height = computed(() => windowHeight.value)
  const orientation = computed(() => windowOrientation.value)
  /**
   *
   * @param {String | Number} defaultWidth - default width of window
   * @param {String | Number} defaultHeight - default height of window
   * @returns { Object } - data about window size
   */
  const getSizeOfWindow = (defaultWidth = 1980, defaultHeight = 2048) => {
    return {
      windowWidth: windowWidth.value || defaultWidth,
      windowHeight: windowHeight.value || defaultHeight
    }
  }

  return {
    width,
    height,
    orientation,
    type,
    isDesktopDevice,
    isLargestDesktop,
    isVeryLargeDesktop,
    isLargeDesktop,
    isDesktop,
    isTablet,
    isMobile,
    getSizeOfWindow
  }
}
