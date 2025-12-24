import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        wedding: {
          pink: "hsl(var(--wedding-pink))",
          "pink-light": "hsl(var(--wedding-pink-light))",
          "pink-dark": "hsl(var(--wedding-pink-dark))",
          rose: "hsl(var(--wedding-rose))",
          gold: "hsl(var(--wedding-gold))",
          "gold-light": "hsl(var(--wedding-gold-light))",
          cream: "hsl(var(--wedding-cream))",
          "cream-dark": "hsl(var(--wedding-cream-dark))",
          sage: "hsl(var(--wedding-sage))",
          lavender: "hsl(var(--wedding-lavender))",
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        body: ['Quicksand', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "heart-float": {
          "0%": { 
            transform: "translateY(100vh) rotate(0deg) scale(1)",
            opacity: "0"
          },
          "10%": { 
            opacity: "0.8"
          },
          "90%": { 
            opacity: "0.6"
          },
          "100%": { 
            transform: "translateY(-100px) rotate(360deg) scale(0.8)",
            opacity: "0"
          },
        },
        "petal-fall": {
          "0%": { 
            transform: "translateY(-50px) translateX(0) rotate(0deg)",
            opacity: "0"
          },
          "10%": { 
            opacity: "0.7"
          },
          "100%": { 
            transform: "translateY(100vh) translateX(100px) rotate(360deg)",
            opacity: "0"
          },
        },
        "sparkle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "heart-float": "heart-float 10s linear infinite",
        "petal-fall": "petal-fall 12s linear infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-romantic': 'linear-gradient(135deg, hsl(350, 70%, 95%) 0%, hsl(30, 40%, 98%) 50%, hsl(350, 60%, 93%) 100%)',
        'gradient-gold': 'linear-gradient(135deg, hsl(43, 50%, 65%) 0%, hsl(43, 60%, 75%) 50%, hsl(43, 50%, 65%) 100%)',
        'gradient-soft': 'linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(30, 40%, 97%) 100%)',
        'pattern-floral': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8b4b8' fill-opacity='0.15'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
