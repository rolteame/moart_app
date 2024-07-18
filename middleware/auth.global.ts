export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuthStore();

	if (auth.isLoggedin === false && to.meta.requireAuth && !auth.userToken) {
		return navigateTo("/login");
	}

  if(to.path === "/login" && auth.userToken) {
    if (auth.user.role === 'admin') {
      return navigateTo('/admin');
    }
  }
});
