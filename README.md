# ⚠️ This is a prototype for Glimpse

This prototype is from an early phase of what is now Glimpse, a design-toolkit for developers.<br/><br/>
**Built using some really cool tools:**

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenAi API](https://openai.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

## 💻 Usage

1. Create a `.env` file in the root of your project. Add your OpenAi project key as `NEXT_PUBLIC_OPENAI_API_KEY`

2. The palette is currently limited to 5 hex color codes. You can edit `SYSTEM_PROMPT` in `app/api/generate-palette/route` to change the behavior.

3. The current `model` is set as `gpt-3.5-turbo` which you can edit `completion` in `app/api/generate-palette/route`.

4. `max_tokens` is set to `30` given the current restriction of 5 hex color codes. You can edit this as well in `completion`.

5. Have fun 🙂
