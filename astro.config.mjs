import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import metaTags from "astro-meta-tags";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), metaTags(), icon()],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    domains: ["graphassets.com"],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.graphassets.com',
    }]
  },
  prefetch: true,
  experimental: {
    fonts: [
      {
        name: 'Departure Mono',
        provider: 'local',
        cssVariable: '--font-departure-mono',
        fallbacks: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: [
              './src/fonts/DepartureMono-Regular.woff',
              './src/fonts/DepartureMono-Regular.woff2'
            ]
          }
        ]
      },
      {
        name: 'Redaction_20',
        provider: 'local',
        cssVariable: '--font-redaction-20',
        fallbacks: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: ['./src/fonts/Redaction_20-Regular.woff2']
          },
          {
            weight: 700,
            style: 'normal',
            display: 'swap',
            src: ['./src/fonts/Redaction_20-Bold.woff2']
          },
          {
            weight: 400,
            style: 'italic',
            display: 'swap',
            src: ['./src/fonts/Redaction_20-Italic.woff2']
          }
        ]
      },
      {
        name: 'Redaction_50',
        provider: 'local',
        cssVariable: '--font-redaction-50',
        fallbacks: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/fonts/Redaction_50-Regular.woff2']
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/fonts/Redaction_50-Bold.woff2']
          },
          {
            weight: 400,
            style: 'italic',
            src: ['./src/fonts/Redaction_50-Italic.woff2']
          }
        ]
      },
      {
        name: 'Inter',
        provider: 'local',
        cssVariable: '--font-inter',
        fallbacks: [
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        variants: [
          {
            weight: 100,
            style: 'normal',
            src: [
              './src/fonts/Inter-Thin.woff2',
              './src/fonts/Inter-Thin.woff'
            ]
          },
          {
            weight: 100,
            style: 'italic',
            src: [
              './src/fonts/Inter-ThinItalic.woff2',
              './src/fonts/Inter-ThinItalic.woff'
            ]
          },
          {
            weight: 200,
            style: 'normal',
            src: [
              './src/fonts/Inter-ExtraLight.woff2',
              './src/fonts/Inter-ExtraLight.woff'
            ]
          },
          {
            weight: 200,
            style: 'italic',
            src: [
              './src/fonts/Inter-ExtraLightItalic.woff2',
              './src/fonts/Inter-ExtraLightItalic.woff'
            ]
          },
          {
            weight: 300,
            style: 'normal',
            src: [
              './src/fonts/Inter-Light.woff2',
              './src/fonts/Inter-Light.woff'
            ]
          },
          {
            weight: 300,
            style: 'italic',
            src: [
              './src/fonts/Inter-LightItalic.woff2',
              './src/fonts/Inter-LightItalic.woff'
            ]
          },
          {
            weight: 400,
            style: 'normal',
            src: [
              './src/fonts/Inter-Regular.woff2',
              './src/fonts/Inter-Regular.woff'
            ]
          },
          {
            weight: 400,
            style: 'italic',
            src: [
              './src/fonts/Inter-Italic.woff2',
              './src/fonts/Inter-Italic.woff'
            ]
          },
          {
            weight: 500,
            style: 'normal',
            src: [
              './src/fonts/Inter-Medium.woff2',
              './src/fonts/Inter-Medium.woff'
            ]
          },
          {
            weight: 500,
            style: 'italic',
            src: [
              './src/fonts/Inter-MediumItalic.woff2',
              './src/fonts/Inter-MediumItalic.woff'
            ]
          },
          {
            weight: 600,
            style: 'normal',
            src: [
              './src/fonts/Inter-SemiBold.woff2',
              './src/fonts/Inter-SemiBold.woff'
            ]
          },
          {
            weight: 600,
            style: 'italic',
            src: [
              './src/fonts/Inter-SemiBoldItalic.woff2',
              './src/fonts/Inter-SemiBoldItalic.woff'
            ]
          },
          {
            weight: 700,
            style: 'normal',
            src: [
              './src/fonts/Inter-Bold.woff2',
              './src/fonts/Inter-Bold.woff'
            ]
          },
          {
            weight: 700,
            style: 'italic',
            src: [
              './src/fonts/Inter-BoldItalic.woff2',
              './src/fonts/Inter-BoldItalic.woff'
            ]
          },
          {
            weight: 800,
            style: 'normal',
            src: [
              './src/fonts/Inter-ExtraBold.woff2',
              './src/fonts/Inter-ExtraBold.woff'
            ]
          },
          {
            weight: 800,
            style: 'italic',
            src: [
              './src/fonts/Inter-ExtraBoldItalic.woff2',
              './src/fonts/Inter-ExtraBoldItalic.woff'
            ]
          },
          {
            weight: 900,
            style: 'normal',
            src: [
              './src/fonts/Inter-Black.woff2',
              './src/fonts/Inter-Black.woff'
            ]
          },
          {
            weight: 900,
            style: 'italic',
            src: [
              './src/fonts/Inter-BlackItalic.woff2',
              './src/fonts/Inter-BlackItalic.woff'
            ]
          }
        ]
      },
      {
        name: 'iA Writer Duo',
        provider: 'local',
        cssVariable: '--font-writer-duo',
        fallbacks: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: [
              './src/fonts/iAWriterDuoS-Regular.woff2',
              './src/fonts/iAWriterDuoS-Regular.woff'
            ]
          },
          {
            weight: 700,
            style: 'normal',
            display: 'swap',
            src: [
              './src/fonts/iAWriterDuoS-Bold.woff2',
              './src/fonts/iAWriterDuoS-Bold.woff'
            ]
          },
          {
            weight: 400,
            style: 'italic',
            display: 'swap',
            src: [
              './src/fonts/iAWriterDuoS-Italic.woff2',
              './src/fonts/iAWriterDuoS-Italic.woff'
            ]
          },
          {
            weight: 700,
            style: 'italic',
            display: 'swap',
            src: [
              './src/fonts/iAWriterDuoS-BoldItalic.woff2',
              './src/fonts/iAWriterDuoS-BoldItalic.woff'
            ]
          }
        ]
      },
      {
        name: 'iA Writer Mono',
        provider: 'local',
        cssVariable: '--font-writer-mono',
        fallbacks: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
        variants: [
          {
            weight: 400,
            style: 'normal',
            display: 'swap',
            src: [
              './src/fonts/iAWriterMonoS-Regular.woff2',
              './src/fonts/iAWriterMonoS-Regular.woff'
            ]
          },
          {
            weight: 700,
            style: 'normal',
            display: 'swap',
            src: [
              './src/fonts/iAWriterMonoS-Bold.woff2',
              './src/fonts/iAWriterMonoS-Bold.woff'
            ]
          },
          {
            weight: 400,
            style: 'italic',
            display: 'swap',
            src: [
              './src/fonts/iAWriterMonoS-Italic.woff2',
              './src/fonts/iAWriterMonoS-Italic.woff'
            ]
          },
          {
            weight: 700,
            style: 'italic',
            display: 'swap',
            src: [
              './src/fonts/iAWriterMonoS-BoldItalic.woff2',
              './src/fonts/iAWriterMonoS-BoldItalic.woff'
            ]
          }
        ]
      }
    ]
  }
});