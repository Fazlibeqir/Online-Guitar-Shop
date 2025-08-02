# 🎸 VibeStrings Guitar Shop

A modern, responsive guitar e-commerce application built with Next.js, Apollo Client, and Tailwind CSS. Features a 3-page application with multilingual support (English, Macedonian, Albanian).

## 🌟 Features

### Core Features
- **Page 1 - Guitar Brands**: Display all guitar brands with navigation to models
- **Page 2 - Guitar Models**: Show models for selected brand with search and filtering
- **Page 3 - Guitar Details**: Detailed view with specifications and musicians tabs

### Advanced Features
- **Multilingual Support**: English, Macedonian, and Albanian languages
- **Apollo Client Integration**: GraphQL data fetching from external API
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Search & Filter**: Real-time search and type filtering for guitar models
- **Pagination**: Built-in pagination for models and musicians
- **Loading States**: Graceful loading and error handling
- **Modern UI**: Clean, professional design inspired by the provided Figma mockups

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **GraphQL**: Apollo Client
- **State Management**: React Context for language switching
- **Deployment**: Ready for Vercel deployment

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd online-guitar-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (Brands)
│   ├── brands/[id]/       # Brand models page
│   ├── guitars/[id]/      # Guitar details page
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer with language switcher
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Language management
├── lib/                   # Utilities and configurations
│   ├── apollo-client.ts   # Apollo Client setup
│   ├── queries.ts         # GraphQL queries
│   └── translations.ts    # Multilingual translations
└── types/                 # TypeScript type definitions
    └── index.ts           # Data interfaces
```

## 🔧 Configuration

### GraphQL API
The application connects to the provided GraphQL API:
```
https://graphql-api-brown.vercel.app/api/graphql
```

### Environment Variables
No environment variables are required for this project as it uses a public API.

## 📱 Pages Overview

### 1. Home Page (`/`)
- Displays all guitar brands in a grid layout
- Features a hero section with call-to-action
- Includes feature highlights section
- Responsive design with hover effects

### 2. Brand Models Page (`/brands/[id]`)
- Shows guitar models for the selected brand
- Search functionality to filter by name
- Type filtering dropdown
- Pagination with 6 items per page
- Back navigation to home

### 3. Guitar Details Page (`/guitars/[id]`)
- Detailed guitar information
- Two tabs: Specifications and Musicians
- Musicians pagination (2 per page)
- Technical specifications display
- Back navigation to previous page

## 🌍 Internationalization

The application supports three languages:
- **English (EN)**: Default language
- **Macedonian (MK)**: Македонски
- **Albanian (SQ)**: Shqip

Language switching is available in the footer and affects all static text throughout the application.

## 🎨 Design Features

- **Color Scheme**: Orange (#f97316) accent with gray/white backgrounds
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: SVG icons for better performance
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoints

## 🔍 Search & Filter

### Search Functionality
- Real-time search as you type
- Case-insensitive matching
- Searches through guitar model names

### Filter Options
- Filter by guitar type (Electric, Acoustic, Bass, etc.)
- "All Types" option to show everything
- Dynamic filter options based on available data

## 📊 Data Flow

1. **Apollo Client** fetches data from GraphQL API
2. **React Context** manages language state
3. **Components** render data with proper loading/error states
4. **Navigation** uses Next.js App Router for seamless routing


## 📝 API Schema

The application expects the following GraphQL schema:

```graphql
type Brand {
  id: ID!
  name: String!
  logo: String
}

type GuitarModel {
  id: ID!
  name: String!
  type: String!
  price: Float!
  image: String
  brand: Brand!
}

type Specifications {
  bodyWood: String!
  neckWood: String!
  fingerboard: String!
  pickups: String!
  tuners: String!
  scaleLength: String!
  bridge: String!
}

type Musician {
  id: ID!
  name: String!
  image: String
  genre: String!
}

type GuitarDetails {
  id: ID!
  name: String!
  type: String!
  price: Float!
  image: String
  specifications: Specifications!
  musicians: [Musician!]!
  brand: Brand!
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes and follows the assignment requirements.

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify the GraphQL API is accessible
3. Ensure all dependencies are installed
4. Check network connectivity

---

**Built with ❤️ using Next.js, Apollo Client**
