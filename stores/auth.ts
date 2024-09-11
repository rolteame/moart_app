export const useAuthStore = defineStore(
	"auth",
	() => {
		const user = ref();
		const token = ref();
		const refreshToken = ref();
		const router = useRouter();

		const isLoggedin = ref(false);

		const userToken = computed(() => {
			return token.value;
		});

		const resetToken = async () => {
			try {
				const response: any = await $fetch<any>(
					`https://moart-backend.onrender.com/v1/auth/refresh-tokens`,
					{
						method: "POST",
						body: {
							refreshToken: refreshToken.value,
						},
					}
				);

				token.value = response.access.token;
				refreshToken.value = response.refresh.token;
			} catch (err: any) {
				console.log(err);
				if (err.statusCode === 401) {
					token.value = "";
					refreshToken.value = "";
					user.value = "",
					setTimeout(() => {
						useNuxtApp().$toast.error("Token Expired, Login Again")
					}, 3000);
					router.push("/login");
				}

				if (err.statusCode === 429) {
					token.value = "";
					refreshToken.value = "";
					user.value = "";
					setTimeout(() => {
						useNuxtApp().$toast.error("Token Expired, Login Again")
					}, 3000);
					router.push("/login");
				}
			}
			
		};

		return {
			user,
			token,
			userToken,
			refreshToken,
			isLoggedin,
			resetToken,
		};
	},
	{
		persist: {
			paths: ["user", "token", "refreshToken"],
		},
	}
);
