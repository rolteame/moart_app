import type { Login } from "~/types/authTypes"
import { backendUrl } from "~/utils"

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  const token = ref()


  return {
    user,
    token
  }
},
{
  persist: {
    paths: ['user', 'token'],
  }
})