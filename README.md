<img width="1200" height="304" alt="Mockup of recipe website on laptop" src="https://github.com/user-attachments/assets/b365f72f-8ebc-4204-9854-f7e8762c4cd3" />

# Elart.nl - Recipe Website

A recipe website built with [Payload CMS](https://payloadcms.com) and [Next.js](https://nextjs.org).

## Tech Stack

- **Backend**: Payload CMS (MongoDB)
- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Storage**: Vercel Blob Storage
- **Deployment**: Vercel

## Features

- Recipe management 
- Categories
- Ingredients
- Page builder
- Search functionality

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Start development server:

   ```bash
   pnpm dev
   ```

4. Open http://localhost:3000 and create your admin user

## Scripts

- `npm dev` - Start development server
- `npm build` - Build for production
- `npm start` - Start production server
- `npm lint` - Run ESLint
- `npm payload` - Run Payload CLI commands

## Project Structure

- `src/collections/` - Payload collections (Recipes, Pages, Users, Media, Categories, Ingredients)
- `src/blocks/` - Layout blocks
- `src/fields/` - Custom field types
- `src/heros/` - Hero components
- `src/utilities/` - Utility functions
- `src/hooks/` - Custom hooks
