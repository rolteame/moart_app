export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuthStore();

	if (auth.isLoggedin === false && to.meta.requireAuth && !auth.userToken) {
		return navigateTo("/login");
	}

  if(to.path === "/login" && auth.userToken) {
    if (auth.user.role === 'admin' || auth.user.role === 'superadmin') {
      return navigateTo('/admin');
    }

    if (auth.user.role === 'user') {
      return navigateTo('/user-dashboard');
    }
  }
});
