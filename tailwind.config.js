module.exports = {
  content: [
    "./*.html",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand, #00C853)',
          dark: 'var(--color-brand-dark, #00A844)',
          light: 'var(--color-brand-light, #33D375)',
          glow: 'var(--color-brand-glow, rgba(0, 200, 83, 0.08))',
          glowDeep: 'var(--color-brand-glow-deep, rgba(0, 200, 83, 0.15))',
        },
        dark: {
          DEFAULT: 'var(--color-dark, #111111)',
          card: 'var(--color-dark-card, #121216)',
          border: 'var(--color-dark-border, #1E1E24)',
          glass: 'var(--color-dark-glass, rgba(10, 10, 12, 0.75))',
        },
        accent: {
          DEFAULT: 'var(--color-accent, #D4AF37)',
          dark: 'var(--color-accent-dark, #B8901C)',
          light: 'var(--color-accent-light, #E6C25E)',
          warm: 'var(--color-accent-warm, #F59E0B)',
          magenta: 'var(--color-accent-magenta, #FF1744)',
          neonGreen: 'var(--color-accent-neonGreen, #00E676)',
          amber: 'var(--color-accent-amber, #FFD700)',
        },
        lightBg: 'var(--color-light-bg, #F9FAFB)',
        cardBg: 'var(--color-card-bg, #FFFFFF)',
        appleGray: 'var(--color-apple-gray, #F5F5F7)',
        appleBorder: 'var(--color-apple-border, #E8E8ED)',
        darkBg: 'var(--color-dark-bg, #070A10)',
        light: 'var(--color-light, #F8FAFC)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shutter-flash': 'flash 0.3s ease-out forwards',
        'float-slow': 'float 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
