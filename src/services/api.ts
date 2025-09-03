// Define interfaces for data structures
export interface Image {
  id: number;
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: {
      url: string;
    };
    small?: {
      url: string;
    };
  };
}

export interface Category {
  id: number;
  cateogry_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feature {
  id: number;
  feature_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  documentId: string;
  product_name: string;
  product_description: string;
  display_image?: Image;
  secondary_images?: Image[];
  category?: Category;
  feature?: Feature;
  specification?: string;
  included?: string;
  createdAt: string;
  updatedAt: string;
  presentation: any;
}

export interface Project {
  id: number;
  project_name: string;
  description: string;
  image?: Image;
  createdAt: string;
  updatedAt: string;
}

// New interfaces for API response structure (assuming Strapi-like)
interface ApiImage {
  id: number;
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: { url: string; };
    small?: { url: string; };
  };
  createdAt: string;
  updatedAt: string;
}

interface ApiCategory {
  id: number;
  cateogry_name: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiFeature {
  id: number;
  feature_name: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiProduct {
  documentId: number;
  product_name: string;
  product_description: string;
  specification?: string;
  included?: string;
  createdAt: string;
  updatedAt: string;
  presentation: string;
  // Relationships will be nested under 'data'
  display_image?: { data: ApiImage | null };
  secondary_images?: Array<any> | [] ;
  category?: ApiCategory | null ;
  feature?: ApiFeature | null ;
}

interface ApiResponse<T> {
  data: T | T[];
  meta?: any; // For pagination, etc.
}

// Base URL for the API
const API_BASE_URL = 'https://api.skyelectronica.com/api';

// Get current language for API calls
const getCurrentLocale = () => {
  const regex = /en-[A-Z]{2}/g
  const locale = localStorage.getItem('i18nextLng') || 'en';
  return regex.test(locale) ? 'en' : locale;  
};

// Helper function to fetch data with error handling
async function fetchData<T>(url: string, addLocale: boolean = false, populate: boolean = false): Promise<T> {
  let finalUrl = url;
  const params = new URLSearchParams();

  if (addLocale) {
    const locale = getCurrentLocale();    
    params.append('locale', locale);
  }
  if (populate) {
    params.append('populate', '*');
  }

  const queryString = params.toString();
  if (queryString) {    
    finalUrl = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
  }
  
  try {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      // Handle 404 specifically for projects
      if (response.status === 404) {
        console.warn(`Resource not found at ${finalUrl}. Returning empty array.`);
        return [] as unknown as T;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${finalUrl}:`, error);
    throw error;
  }
}

// Utility function to map API image response to Image interface
const mapApiImageToImage = (apiImage: ApiImage | null): Image | undefined => {
  if (!apiImage) return undefined;
  return {
    id: apiImage.id,
    url: apiImage.url,
    alternativeText: apiImage.alternativeText,
    formats: apiImage.formats
  };
};

// Utility function to map API category response to Category interface
const mapApiCategoryToCategory = (apiCategory: ApiCategory | null): Category | undefined => {
  if (!apiCategory) return undefined;
  return {
    id: apiCategory.id,
    cateogry_name: apiCategory.cateogry_name,
    createdAt: apiCategory.createdAt,
    updatedAt: apiCategory.updatedAt
  };
};

// Utility function to map API feature response to Feature interface
const mapApiFeatureToFeature = (apiFeature: ApiFeature | null): Feature | undefined => {
  if (!apiFeature) return undefined;
  return {
    id: apiFeature.id,
    feature_name: apiFeature.feature_name,
    createdAt: apiFeature.createdAt,
    updatedAt: apiFeature.updatedAt
  };
};

// Utility function to map API product response to Product interface
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {  
  return {
    documentId: apiProduct.documentId.toString(), // Map API 'id' to 'documentId'
    product_name: apiProduct.product_name,
    product_description: apiProduct.product_description,
    specification: apiProduct.specification,
    included: apiProduct.included,
    createdAt: apiProduct.createdAt,
    updatedAt: apiProduct.updatedAt,
    display_image: mapApiImageToImage(apiProduct?.display_image as any || null),
    secondary_images: apiProduct?.secondary_images?.map(mapApiImageToImage).filter((img:any): img is Image => img !== undefined) || [],
    category: mapApiCategoryToCategory(apiProduct?.category || null),
    feature: mapApiFeatureToFeature(apiProduct?.feature || null),
    presentation: apiProduct.presentation
  };
};

// API service methods
export const productsApi = {
  async getProducts(): Promise<Product[]> {
    const url = `${API_BASE_URL}/products`;
    const response = await fetchData<ApiResponse<ApiProduct>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.product_name)
        .map(mapApiProductToProduct);
    }
    return []; // Should return an array for getProducts
  },

  async getProduct(id: string): Promise<Product | null> {
    const url = `${API_BASE_URL}/products/${id}`;
    try {
      const response = await fetchData<ApiResponse<ApiProduct>>(url, true, true); // addLocale=true, populate=true
      if (response.data && !Array.isArray(response.data) && response.data.product_name) {
        return mapApiProductToProduct(response.data);
      }
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
    }
    return null;
  },

  async getCategories(): Promise<Category[]> {
    const url = `${API_BASE_URL}/categories`;
    const response = await fetchData<ApiResponse<ApiCategory>>(url, true); // addLocale=true
    if (Array.isArray(response.data)) {
      return response.data
        .filter(item => item && item.cateogry_name)
        .map(item => ({
          id: item.id,
          cateogry_name: item.cateogry_name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
    }
    return [];
  },

  async getFeatures(): Promise<Feature[]> {
    const url = `${API_BASE_URL}/features`;
    const response = await fetchData<ApiResponse<ApiFeature>>(url, true); // addLocale=true
    if (Array.isArray(response.data)) {
      return response.data
        .filter(item => item && item.feature_name)
        .map(item => ({
          id: item.id,
          feature_name: item.feature_name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
    }
    return [];
  },

  async getBestSellerProducts(): Promise<Product[]> {
    // Return first two products as best sellers
    const products = await this.getProducts();    
    return products.filter(product => product && product.product_name).slice(0, 2);
  },

  async getProjects(): Promise<Project[]> {
    // This still uses the mock data logic for projects, as the user only asked for products
    // If api.skyelectronica.com has a /posts or /projects endpoint, this would need similar refactoring
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=6`; // Original mock URL
    try {
      const data = await fetchData<any[]>(url);
      return data.map(item => ({
        id: item.id,
        project_name: item.title.charAt(0).toUpperCase() + item.title.slice(1),
        description: item.body.substring(0, 120) + '...',
        image: {
          id: item.id,
          url: `https://images.pexels.com/photos/${(item.id % 6) * 100000 + 442587}/pexels-photo-${(item.id % 6) * 100000 + 442587}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1`,
          alternativeText: item.title
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.warn("Error fetching projects, returning empty array:", error);
      return [];
    }
  },
};

// Utility function to get image URL
export const getImageUrl = (image: Image, preferSmall: boolean = false): string => {
  // If preferSmall is true, prioritize small format for product cards
  if (preferSmall && image.formats?.small?.url) {    
    return `https://api.skyelectronica.com/${image.formats.small.url}`;
  }
  // Prioritize thumbnail if available, otherwise use the main URL
  // return `https://api.skyelectronica.com/${image.formats?.thumbnail?.url}` || `https://api.skyelectronica.com/${image.url}`;
  return `https://api.skyelectronica.com/${image.url}`;
};