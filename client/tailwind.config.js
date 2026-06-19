module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e5ecff',
          200: '#cdd9ff',
          300: '#a6b4ff',
          400: '#7c84ff',
          500: '#5865f2',
          600: '#4752d4',
          700: '#3c41ae',
          800: '#36348e',
          900: '#322a73'
        },
        dark: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#666666',
          700: '#444444',
          800: '#222222',
          900: '#111111'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      backdropBlur: {
        'glass': 'blur(4px)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-success': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-danger': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-warning': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
