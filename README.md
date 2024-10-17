# 🎨 Glimpse: AI-Powered Color System Generator SAAS

> **Note**: The UI is currently being overhauled.

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API](https://openai.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [Neon DB (PostgreSQL)](https://neon.tech/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Culori](https://culorijs.org/)
- [Color-name-list](https://www.npmjs.com/package/color-name-list)
- [Svix](https://www.svix.com/)

## 📝 Description

Glimpse is an AI-powered color system generator designed for creating comprehensive design systems. It leverages OpenAI's API to generate a set of brand colors based on user input, then expands these into accessible color scales using color theory principles.

Key features include:

- Generation of background color and 5 brand colors based on user descriptions
- Creation of accessible shade color scales for each generated color
- User authentication and subscription tiers
- Export options for CSS, SCSS, and Tailwind config variables
- Color swatch library with various color space values (hex, okhsl, rgb, hsl, oklch, cmyk, hsb, lab, lch, displayp3, a98, prophoto, xyz)

The application is built with a Next.js 14 REST API, uses TypeScript for type safety, and incorporates modern web technologies for a robust user experience.

## 💻 Usage

1. Clone the repository and install dependencies:

   ```
   git clone https://github.com/ci-dominguez/ai-color-palette-nextjs-ts>

   cd ai-color-palette-generator

   npm install
   ```

2. Create a `.env` file in the root of your project and add your OpenAI API key:

   ```
   NEXT_PUBLIC_OPENAI_API_KEY=
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   CLERK_WEBHOOK_SECRET_USER_CREATION=
   NEXT_PUBLIC_API_URL=http://localhost:3000
   STIRPE_PUBLIC_KEY=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   -- All other stripe product ids and links

   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

5. Have fun! 🙂

## ⚙️ Configuration

- The color system generation is handled in the `/api/color-systems` route.
- The OpenAI model is currently set to `gpt-4o-mini`. You can modify this in the `completion` object in the API route file.
- `max_tokens` is set to 100 for the OpenAI API call.
- The user prompt is limited to 200 characters, as defined in the `promptSchema`.
- The system generates 5 main colors and 1 background color in OKHsl format.
- Light mode and dark mode have separate system prompts (`LIGHT_MODE_SYSTEM_PROMPT` and `DARK_MODE_SYSTEM_PROMPT`) that define the color generation parameters.
- User limits for color system generation and storage are checked before each generation.
- The API handles both POST (for generating new color systems) and GET (for retrieving user's color systems) requests.

For more detailed configuration options, please refer to the `/api/*` route files.
