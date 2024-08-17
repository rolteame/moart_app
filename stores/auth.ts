

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  const token = ref()
  const refreshToken = ref()
  const router = useRouter()

  const isLoggedin = ref(false)

  const userToken = computed(() => {
    return token.value
  })

  const resetToken = async () => {
    try {
      const response: any = await $fetch<any>(`https://moart-backend.onrender.com/v1/auth/refresh-tokens`, {
        method: "POST",
        body: {
          "refreshToken": refreshToken.value
        }
      })
      
      token.value = response.access.token
      refreshToken.value = response.refresh.token

    } catch (err: any) {
      console.log(err)
      if (err.statusCode === 401) {
        logout()
        router.push("/login")
      }

      if (err.statusCode === 429) {
        logout()
        router.push("/login")
      }
    }
    // console.log(response);
  }

  const logout = async () => {
    try {
      const response: any = await $fetch<any>(`https://moart-backend.onrender.com/v1/auth/logout`, {
        method: "POST",
        body: {
          refreshToken: refreshToken.value
        },
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
  
      useNuxtApp().$toast.success(response.message)
      token.value = ""
      user.value = ""
      refreshToken.value = ""
      isLoggedin.value = false
      router.push("/login")
    } catch (err: any) {
      console.log(err)
      if (err.statusCode === 401) {
        token.value = ""
        user.value = ""
        refreshToken.value = ""
        isLoggedin.value = false
        router.push("/login")
      }

      if (err.statusCode === 429) {
        useNuxtApp().$toast.error("Token expired, Kindly relogin")
        token.value = ""
        user.value = ""
        refreshToken.value = ""
        isLoggedin.value = false
        router.push("/login")
      }

      if (err.statusCode === 404) {
        useNuxtApp().$toast.error("Token expired, Kindly relogin")
        token.value = ""
        user.value = ""
        refreshToken.value = ""
        isLoggedin.value = false
        router.push("/login")
      }
    }
  } 


  return {
    user,
    token,
    userToken,
    refreshToken,
    isLoggedin,
    resetToken,
    logout
  }
},
{
  persist: {
    paths: ['user', 'token', "refreshToken"],
  }
})