# 🎸 VibeStrings Guitar Shop - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd online-guitar-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter disk space issues, try:
   ```bash
   npm install --no-optional
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Disk Space Issues
If you encounter "ENOSPC" errors during installation:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Try installation again: `npm install`

### TypeScript Errors
The application may show TypeScript errors until dependencies are installed. This is normal and will resolve after running `npm install`.

### GraphQL Connection Issues
- Verify the API endpoint is accessible: https://graphql-api-brown.vercel.app/api/graphql
- Check your internet connection
- Try refreshing the page

## Features to Test

1. **Home Page**: View all guitar brands
2. **Brand Selection**: Click on a brand to see its models
3. **Search & Filter**: Use the search bar and type filter on the models page
4. **Pagination**: Navigate through pages of models
5. **Guitar Details**: Click on a guitar to see specifications and musicians
6. **Language Switcher**: Change languages in the footer (EN/MK/SQ)

## Development Notes

- The application uses Apollo Client for GraphQL data fetching
- Language switching is handled through React Context
- All components are responsive and mobile-friendly
- Error boundaries handle API failures gracefully
- Loading states provide good user experience

## Deployment

For production deployment:
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Or deploy to Vercel for automatic deployments

---

**Happy coding! 🎸** 