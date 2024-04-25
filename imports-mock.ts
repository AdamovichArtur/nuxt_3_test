
import fetch from 'node-fetch'
import { ref } from 'vue'

export const mockServerPath = 'http://localhost:8000'
let path = '/'

export function useRoute() {
  return { path }
}

export function useRouter() {
  return {
    push: (newPath) => {
      path = newPath
    },
  }
}

export function useRuntimeConfig() {
  return {
    public: {
      // mocked versions of all my environment variables
    },
  }
}

export async function useFetch(url, options) {
  try {
    const response = await fetch(
      `${url.includes('http') ? '' : `${mockServerPath}`}${url}`,
      {
        ...options,
      }
    )

    let data = ref(await response.json())

    if (options?.transform) {
      data = ref(options.transform(data.value))
    }

    return { data, error: false, pending: false, refresh: () => ({}) }
  } catch (error) {
    return {
      data: null,
      error,
      pending: false,
      refresh: () => ({}),
    }
  }
}

export function useState(name, init = () => null) {
  return init()
}

export function useCookie(name, init = () => null) {
  return init()
}