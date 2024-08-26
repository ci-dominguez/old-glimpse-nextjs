# 🤖🧑‍🎨 AI Color Palette Generator

This prototype is an early phase of what is now Glimpse, a design toolkit for developers.

## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAI API](https://openai.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 📝 Description

The palette generator leverages OpenAI's GPT model to create harmonious color palettes based on user prompts. It uses Next.js for the frontend and API routes, TypeScript, Tailwind CSS and Shadcn UI for styling, React Hook Form for form management, and Zod for frontend and backend validation. The app allows users to input a description, which is then processed by the OpenAI API to generate a palette of five colors.

## 💻 Usage

1. Clone the repository and install dependencies:

   ```
   git clone <repository-url>
   cd ai-color-palette-generator
   npm install
   ```

2. Create a `.env` file in the root of your project and add your OpenAI API key:

   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
   ```

3. Run the development server:

   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

5. Have fun! 🙂

## ⚙️ Configuration

- The palette is currently limited to 5 hex color codes. You can edit `SYSTEM_PROMPT` in `./app/api/generate-palette/route.ts` to change this behavior.
- The current OpenAI model is set to `gpt-3.5-turbo`. You can modify this in the `completion` object in `./app/api/generate-palette/route.ts`.
- `max_tokens` is set to `30` given the current restriction of 5 hex color codes. This can also be adjusted in the `completion` object.
- The user prompt is limited to `200` characters. You can edit `MAX_PROMPT_LENGTH` in `./components/ColorPaletteGenerator.tsx` to change this limit.
