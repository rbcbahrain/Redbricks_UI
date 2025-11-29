// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'hover:scale-[1.02]',
    'focus:scale-[0.98]',
    'active:scale-[0.97]',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#FF6347", // Tomato red for light theme
          secondary: "#32CD32", // Lime green for light theme
          background: "#F0F8FF", // Alice blue background
          text: "#333333", // Dark text
        },
        dark: {
          primary: "#1E40AF", // Dark blue for dark theme
          secondary: "#FFD700", // Gold for dark theme
          background: "#2C3E50", // Dark slate for background
          text: "#FFFFFF", // White text
        },
        blue: {
          primary: "#1D4ED8", // Blue for blue theme
          secondary: "#3B82F6", // Lighter blue
          background: "#E0F2FE", // Light blue background
          text: "#1E3A8A", // Dark blue text
        },
        green: {
          primary: "#10B981", // Green for green theme
          secondary: "#34D399", // Light green
          background: "#D1FAE5", // Light green background
          text: "#064E3B", // Dark green text
        },
      },
      boxShadow: {
        'light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'dark': '0 4px 6px rgba(0, 0, 0, 0.4)',
        'blue': '0 4px 6px rgba(29, 78, 216, 0.3)', // Blue shadow
        'green': '0 4px 6px rgba(16, 185, 129, 0.3)', // Green shadow
      },
    },
  },
  plugins: [],
}
