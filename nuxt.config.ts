// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // Private keys are only available on the server
        apiSecret: process.env.API_SECRET,
        // Public keys that are exposed to the client
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
            firebaseApiKey: process.env.FB_API_KEY,
            firebaseAuthDomain: process.env.FB_AUTH_DOMAIN,
            firebaseProjectId: process.env.FB_PROJECT_ID,
            firebaseStorageBucket: process.env.FB_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FB_APP_ID,
        },
    },
});
