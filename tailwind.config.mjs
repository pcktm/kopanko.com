/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	theme: {
		extend: {
			fontFamily: {
        // serif: ["Crimson Text", ...defaultTheme.fontFamily.serif],
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				mono: ["Space Mono", ...defaultTheme.fontFamily.mono],
				redaction20: ["Redaction_20", ...defaultTheme.fontFamily.serif],
				redaction50: ["Redaction_50", ...defaultTheme.fontFamily.serif],
      },
			colors: {
				"darkbg": "#111313",
			},
			container: {
				screens: {
					"sm": "640px",
					"md": "768px",
					"lg": "1024px",
					"xl": "1024px",
					"2xl": "1280px"
				}
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
