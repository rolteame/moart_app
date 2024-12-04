// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},
	modules: [
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@nuxtjs/google-fonts",
		"nuxt-lucide-icons",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
	],
	// plugins: ['~/plugins/vue3-toastify.client.js'],
	css: ["animate.css/animate.min.css"],
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
	googleFonts: {
		families: {
			"Proxima Nova": true,
		},
	},
	pinia: {
		storesDirs: ["./stores/**"],
	},
	app: {
		head: {
			link: [{ rel: "icon", type: "image/png", href: "/assets/img/logo.png" }],
		},
	},
	routeRules: {
		"/": { redirect: "/login" },
	},
	runtimeConfig: {
		public: {
			backendUrl: process.env.BACKEND_URL,
		},
	},
	// ssr: false,
});
