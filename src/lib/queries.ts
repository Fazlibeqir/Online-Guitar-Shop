import { gql } from '@apollo/client';

export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      origin
      image
      categories
    }
  }
`;

export const GET_MODELS = gql`
  query GetModels($brandId: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $brandId, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export const GET_GUITAR_DETAILS = gql`
  query GetGuitarDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

export const GET_GUITARS_BY_BRAND = gql`
  query GetGuitarsByBrand($brandId: ID!) {
    findGuitarsByBrand(brandId: $brandId) {
      id
      name
      model
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
    }
  }
`;

// Default sort configuration
export const DEFAULT_SORT = {
  field: 'name',
  order: 'ASC'
}; 