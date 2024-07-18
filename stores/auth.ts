import type { Login } from "~/types/authTypes"
import { backendUrl } from "~/utils"

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  const token = ref()

  const confirmMessage = ref()

  const isLoggedin = ref(false)

  const userToken = computed(() => {
    return token.value
  })


  return {
    user,
    token,
    userToken,
    isLoggedin
  }
},
{
  persist: {
    paths: ['user', 'token'],
  }
})