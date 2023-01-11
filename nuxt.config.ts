// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({ 
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap'
        }
      ],
      charset: 'utf-8',
      viewport: 'width=375, initial-scale=1',
      title: 'Whats4dinner?',
      meta: [
        { name: 'description', content: 'App that helps you decide what to eat for dinner' }
      ],
    }
  },
  css: ['~/assets/css/main.css', '@/assets/css/poppins.css'],
      postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    }
})

