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
- **Infinite Scroll**: Dynamic loading of more models as user scrolls
- **Loading States**: Graceful loading and error handling
- **Modern UI**: Clean, professional design inspired by the provided Figma mockups

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **GraphQL**: Apollo Client
- **State Management**: React Context for language switching
- **Styling**: Tailwind CSS with custom design system
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
├── app/                           # Next.js App Router pages
│   ├── (pages)/                   # Route groups for better organization
│   │   └── brands/                # Brand-related pages
│   │       ├── page.tsx           # Home page (Brands listing)
│   │       ├── [brandId]/         # Brand models page
│   │       │   └── page.tsx
│   │       └── [brandId]/[modelId]/ # Guitar details page
│   │           └── page.tsx
│   ├── layout.tsx                 # Root layout with providers
│   ├── globals.css                # Global styles and design system
│   └── favicon.ico
├── components/                    # Reusable components
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx            # Navigation header
│   │   └── Footer.tsx            # Footer with language switcher
│   ├── ui/                       # UI components
│   │   ├── LoadingState.tsx      # Loading spinner
│   │   ├── ErrorState.tsx        # Error display
│   │   └── LanguageSwitcher.tsx  # Language selection
│   ├── home/                     # Home page components
│   │   ├── HeroSection.tsx       # Hero banner
│   │   ├── BrandsSection.tsx     # Brands grid
│   │   ├── FeaturesSection.tsx   # Features showcase
│   │   └── MobileAppSection.tsx  # Mobile app promotion
│   └── guitar/                   # Guitar-specific components
│       ├── GuitarCard.tsx        # Individual guitar card
│       ├── GuitarGrid.tsx        # Guitar grid layout
│       ├── GuitarDetails.tsx     # Guitar details view
│       └── MusicianCard.tsx      # Musician information
├── lib/                          # Utilities and configurations
│   ├── apollo/                   # Apollo Client setup
│   │   └── client.ts
│   ├── graphql/                  # GraphQL queries
│   │   └── queries.ts
│   └── i18n/                     # Internationalization
│       └── translations.ts
├── types/                        # TypeScript type definitions
│   ├── guitar/                   # Guitar-related types
│   │   └── index.ts
│   ├── brand/                    # Brand-related types
│   │   └── index.ts
│   ├── common/                   # Common types
│   │   └── index.ts
│   └── index.ts                  # Main type exports
├── contexts/                     # React contexts
│   └── LanguageContext.tsx       # Language management
└── providers/                    # React providers
    └── ApolloProvider.tsx        # Apollo Client provider
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
- **Custom Search & Filter Interface**:
  - Left side: Filter dropdown with Electric, Acoustic, Bass options
  - Right side: Search input with real-time filtering
  - Vertical divider separating sections
  - Clean, professional design with icons
- Infinite scroll for dynamic loading
- Back navigation to home

### 3. Guitar Details Page (`/brands/[id]/[modelId]`)
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
- **Custom UI Components**: Professional search/filter interface

## 🔍 Search & Filter

### Custom Search & Filter Interface
- **Filter Section**:
  - Funnel icon for visual clarity
  - Dropdown with Electric, Acoustic, Bass options
  - Chevron indicator for dropdown
  - "Filter by type" placeholder
- **Search Section** :
  - Magnifying glass icon
  - Real-time search as you type
  - "Search by name" placeholder
  - Case-insensitive matching
- **Design Elements**:
  - Single container with rounded corners
  - Vertical divider separating sections
  - Consistent spacing and typography
  - Professional, clean appearance

### Infinite Scroll
- Loads more models as user scrolls
- Smooth loading indicators
- Results counter showing progress
- Replaces traditional pagination

## 📊 Data Flow

1. **Apollo Client** fetches data from GraphQL API
2. **React Context** manages language state
3. **Components** render data with proper loading/error states
4. **Navigation** uses Next.js App Router for seamless routing

## 🎯 Footer Layout

### Professional Footer Design
- **Left Side**: Company info, pages, product, and contact links
- **Right Side**: Social media icons and language switcher
- **Bottom**: Copyright information
- **Responsive**: Stacks on mobile for better usability

## 📝 API Schema

The application expects the following GraphQL schema:

```graphql
type Brand {
  id: ID!
  name: String!
  origin: String!
  image: String
  categories: [String!]!
}

type GuitarModel {
  id: ID!
  name: String!
  type: String!
  price: Float!
  image: String
  description: String!
  specs: Specifications!
  musicians: [Musician!]!
}

type Specifications {
  bodyWood: String!
  neckWood: String!
  fingerboardWood: String!
  pickups: String!
  tuners: String!
  scaleLength: String!
  bridge: String!
}

type Musician {
  name: String!
  musicianImage: String
  bands: [String!]!
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

**Built with ❤️ using Next.js, Apollo Client, and TypeScript**
