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

export interface JammerCategory {
  id: number;
  category_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}




export interface Feature {
  id: number;
  feature_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  image: Image; 
  title: string;
  description: string;
  imagePosition?: 'left'|'right';
}

export interface FeatureList {
  title: string;
  items: Item[];
  description: string;
}
export interface FeatureCardFirst {
  title: string;
  description: string;
  cards_one: Item[];
}

export interface ProductBanner {
  id: number;
  title: string;
  description: string;
  image: Image;
  phone_image?: Image | null;
}

export interface ServiceSupportItem {
  id: number;
  title: string;
  image: Image;
}

export interface ServiceSupport {
  id: number;
  title: string;
  description: string;
  items: ServiceSupportItem[];
}

export interface ProductSolutionItem {
  id: number;
  title: string;
  image: Image;
  link?: string;
}

export interface ProductSolutions {
  id: number;
  title: string;
  items: ProductSolutionItem[];
}

export interface Product {
  documentId: string;
  product_name: string;
  product_description: string;
  display_image?: Image;
  best_seller_image?: Image;
  secondary_images?: Image[];
  phone_secondary_images?: Image[];
  category?: Category;
  feature?: Feature;
  specification?: string;
  included?: string;
  createdAt: string;
  updatedAt: string;
  presentation: any;
  link:string;
  slug: string;
  feature_list: FeatureList;
  feature_card_first: FeatureCardFirst;
  feature_card_second: FeatureCardFirst;
  product_banner?: ProductBanner;
  service_support?: ServiceSupport;
  product_solutions?: ProductSolutions;
}

export interface UseCase{
  documentId: string;
  display_image?: { data: ApiImage | null };
  title: string;
  description: string;
  content: string;
  slug: string;
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
interface ApiUseCase{
  Title: string;
  documentId: string;
  display_image?: { data: ApiImage | null };
  description: string;
  content: string;
  slug: string;
}

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

interface ApiNewCategory {
  id: number;
  category_name: string;
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
  best_seller_image?: { data: ApiImage | null };
  secondary_images?: Array<any> | [] ;
  phone_secondary_images?: Array<any> | [] ;
  category?: ApiCategory | null ;
  feature?: ApiFeature | null ;
  link?: string;
  slug: string;
  feature_list: FeatureList;
  feature_card_first: FeatureCardFirst;
  feature_card_second: FeatureCardFirst;
  product_banner?: ProductBanner;
  service_support?: ServiceSupport;
  product_solutions?: ProductSolutions;
}

interface ApiJammer {
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
  best_seller_image?: { data: ApiImage | null };
  secondary_images?: Array<any> | [] ;
  phone_secondary_images?: Array<any> | [] ;
  jammer_category?: JammerCategory | null ;
  jammer_feature?: ApiFeature | null ;
  link?: string;
  slug?: string;
  feature_list?: FeatureList;
  feature_card_first?: FeatureCardFirst;
  feature_card_second?: FeatureCardFirst;
  product_banner?: ProductBanner;
  service_support?: ServiceSupport;
  product_solutions?: ProductSolutions;
}

interface ApiAccessories {
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
  best_seller_image?: { data: ApiImage | null };
  secondary_images?: Array<any> | [] ;
  phone_secondary_images?: Array<any> | [] ;
  accessory_category?: JammerCategory | null ;
  accessory_feature?: ApiFeature | null ;
  link?: string;
  slug: string;
  feature_list?: FeatureList;
  feature_card_first?: FeatureCardFirst;
  feature_card_second?: FeatureCardFirst;
  product_banner?: ProductBanner;
  service_support?: ServiceSupport;
  product_solutions?: ProductSolutions;
}

interface ApiBlog {
  documentId:string;
  blog_title: string;
  content: string;
  createdAt: string;
  display_image?: {data: ApiImage | null};
  slug: string;
}

interface ApiService {
  documentId:string;
  name: string;
  description: string;
  createdAt: string;
  display_image?: {data: ApiImage | null};
  service_cateogry: ServiceCategory | null;
}

interface ApiSolution {
  documentId: string;
  title: string;
  description: string;
  short_description?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  display_image?: {data: ApiImage | null};
  slug?: string;
}

export interface RadioJammer {
  documentId: string;
  product_name: string;
  product_description: string;
  display_image?: {data: ApiImage | null};
  best_seller_image?: {data: ApiImage | null};
  secondary_images?: Array<any> | [];
  phone_secondary_images?: Array<any> | [];
  specification?: string;
  link?: string; 
  presentation: string;
  jammer_category?: JammerCategory | null ;
  jammer_feature?: ApiFeature | null ;
  slug: string;
  feature_list?: FeatureList;
  feature_card_first?: FeatureCardFirst;
  feature_card_second?: FeatureCardFirst;
  product_banner?: ProductBanner;
  service_support?: ServiceSupport;
  product_solutions?: ProductSolutions;
}

export interface AccessoriesType {
  documentId: string;
  product_name: string;
  product_description: string;
  display_image?: {data: ApiImage | null};
  best_seller_image?: {data: ApiImage | null};
  secondary_images?: Array<any> | [];
  phone_secondary_images?: Array<any> | [];
  specification?: string;
  link?: string; 
  presentation: string;
  accessory_category?: JammerCategory | null ;
  accessory_feature?: ApiFeature | null ;
  slug: string;
  feature_list?: FeatureList;
  feature_card_first?: FeatureCardFirst;
  feature_card_second?: FeatureCardFirst;
  product_banner?: ProductBanner;
  service_support?: ServiceSupport;
  product_solutions?: ProductSolutions;
}

export interface BlogType {
  documentId:string,
  blog_title: string;
  content: string;
  createdAt: string;
  display_image?:{data: ApiImage | null}; 
  slug: string;
}

export interface ServiceType {
  documentId:string,
  name: string;
  description: string;
  createdAt: string;
  display_image?:{data: ApiImage | null}; 
  service_cateogry?: ServiceCategory | null;
}

export interface Solution {
  documentId: string;
  title: string;
  description: string;
  short_description?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  display_image?: {data: ApiImage | null};
  slug?: string;
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
    best_seller_image: mapApiImageToImage(apiProduct?.best_seller_image as any || null),
    secondary_images: apiProduct?.secondary_images?.map(mapApiImageToImage).filter((img:any): img is Image => img !== undefined) || [],
    phone_secondary_images: apiProduct?.phone_secondary_images?.map(mapApiImageToImage).filter((img:any): img is Image => img !== undefined) || [],
    category: mapApiCategoryToCategory(apiProduct?.category || null),
    feature: mapApiFeatureToFeature(apiProduct?.feature || null),
    presentation: apiProduct.presentation,
    link: apiProduct.link || '',
    slug: apiProduct.slug,
    feature_list: apiProduct.feature_list,
    feature_card_first: apiProduct.feature_card_first,
    feature_card_second: apiProduct.feature_card_second,
    product_banner: apiProduct.product_banner,
    service_support: apiProduct.service_support,
    product_solutions: apiProduct.product_solutions
  };
};

const mapApiRadioJammerToJammer = (apiJammer: ApiJammer): RadioJammer => {    
  return {
    documentId: apiJammer.documentId.toString(),
    product_name: apiJammer.product_name,
    product_description: apiJammer.product_description,
    display_image: apiJammer.display_image,
    best_seller_image: apiJammer.best_seller_image,
    secondary_images: apiJammer.secondary_images,
    phone_secondary_images: apiJammer.phone_secondary_images,
    specification: apiJammer.specification,
    link: apiJammer.link || '',
    presentation: apiJammer.presentation,
    jammer_category: apiJammer.jammer_category,
    jammer_feature: apiJammer.jammer_feature,
    slug: apiJammer.slug || '',
    feature_list: apiJammer.feature_list,
    feature_card_first: apiJammer.feature_card_first,
    feature_card_second: apiJammer.feature_card_second,
    product_banner: apiJammer.product_banner,
    service_support: apiJammer.service_support,
    product_solutions: apiJammer.product_solutions
  }
}

const mapApiAccessoriesToAccessories = (apiAccessories: ApiAccessories): AccessoriesType => {      
  return {
    documentId: apiAccessories.documentId.toString(),
    product_name: apiAccessories.product_name,
    product_description: apiAccessories.product_description,
    display_image: apiAccessories.display_image,
    best_seller_image: apiAccessories.best_seller_image,
    secondary_images: apiAccessories.secondary_images,
    phone_secondary_images: apiAccessories.phone_secondary_images,
    specification: apiAccessories.specification,
    link: apiAccessories.link || '',
    presentation: apiAccessories.presentation,
    accessory_category: apiAccessories.accessory_category,
    accessory_feature: apiAccessories.accessory_feature,
    slug: apiAccessories.slug || '',
    feature_list: apiAccessories.feature_list,
    feature_card_first: apiAccessories.feature_card_first,
    feature_card_second: apiAccessories.feature_card_second,
    product_banner: apiAccessories.product_banner,
    service_support: apiAccessories.service_support,
    product_solutions: apiAccessories.product_solutions
  }
}

const mapApiBlogsToBlogs = (apiBlogs: ApiBlog): BlogType => {
  return {
    documentId: apiBlogs.documentId,
    blog_title: apiBlogs.blog_title,
    content: apiBlogs.content,
    createdAt: apiBlogs.createdAt,
    display_image: apiBlogs.display_image,
    slug: apiBlogs.slug
  }
}

const mapServicesToServices = (apiService: ApiService): ServiceType => {
  return {
    documentId: apiService.documentId,
    name: apiService.name,
    description: apiService.description,
    createdAt: apiService.createdAt,
    display_image: apiService.display_image,
    service_cateogry: apiService.service_cateogry,
  }
}

const mapUseCasesToUseCases = (apiService: ApiUseCase): UseCase => {
  return {
    documentId: apiService.documentId,
    title: apiService.Title,
    description: apiService.description,    
    display_image: apiService.display_image,
    content: apiService.content,
    slug: apiService.slug
  }
}

const mapApiSolutionToSolution = (apiSolution: ApiSolution): Solution => {
  return {
    documentId: apiSolution.documentId.toString(),
    title: apiSolution.title,
    description: apiSolution.description,
    short_description: apiSolution.short_description,
    content: apiSolution.content,
    createdAt: apiSolution.createdAt,
    updatedAt: apiSolution.updatedAt,
    display_image: apiSolution.display_image,
    slug: apiSolution.slug
  }
}

// const mapApiSolutionToSolution = (apiSolution: ApiSolution): Solution => {
//   return {
//     documentId: apiSolution.documentId.toString(),
//     title: apiSolution.title,
//     description: apiSolution.description,
//     content: apiSolution.content,
//     createdAt: apiSolution.createdAt,
//     updatedAt: apiSolution.updatedAt,
//     display_image: apiSolution.display_image,
//     slug: apiSolution.slug
//   }
// }


const mapForDroneChildren = (data:Product[]) => {
  return data.map((items) => {
    return {
      id: items.product_name,
      children: items.product_name,
      href: `https://skyeletronica.com/drones/${items.slug}`
    }
  })  
}

const mapForAccessoryChildren = (data:AccessoriesType[]) => {
  return data.map((items) => {
    return {
      id: items.product_name,
      children: items.product_name,
      href: `https://skyeletronica.com/accessories/${items.slug}`
    }
  })  
}

const mapForRadioJamChildren = (data:RadioJammer[]) => {
  return data.map((items) => {
    return {
      id: items.product_name,
      children: items.product_name,
      href: `https://skyeletronica.com/accessories/${items.slug}`
    }
  })  
}

const mapForBlogChildren = (data:BlogType[]) => {
  return data.map((items) => {
    return {
      id: items.blog_title,
      children: items.blog_title,
      href: `https://skyeletronica.com/blog/${items.slug}`
    }
  })  
}

const mapForUseCaseChildren = (data:any[]) => {
  return data.map((items) => {
    return {
      id: items.title,
      children: items.title,
      href: `https://skyeletronica.com/use-cases/${items.documentId}`
    }
  })  
}



// API service methods
export const productsApi = {
  async getBestSellers(): Promise<Product[]> {
    const url = `${API_BASE_URL}/products?filters=\[is_best_seller\]\[$eq\]=true&filters\[is_best_seller\]\[$notNull\]=true`;
    const response = await fetchData<ApiResponse<ApiProduct>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.product_name)
        .map(mapApiProductToProduct);
    }
    return []; // Should return an array for getProducts
  },



  async getProducts(): Promise<Product[]> {
    const url = `${API_BASE_URL}/products?pagination[limit]=50`;
    const response = await fetchData<ApiResponse<ApiProduct>>(url, true, true); // addLocale=true, populate=true    
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.product_name)
        .map(mapApiProductToProduct);
    }
    return []; // Should return an array for getProducts
  },

  async getProduct(id: string): Promise<Product | null> {
    const url = `${API_BASE_URL}/products?filters[slug][$eq]=${id}&populate[display_image]=true&populate[secondary_images]=true&populate[presentation]=true&populate[category]=true&populate[product_banner][populate][image]=true&populate[product_banner][populate][phone_image]=true&populate[feature_list][populate][items][populate][image]=true&populate[feature_card_first][populate][cards_one][populate][image]=true&populate[feature_card_second][populate][cards_one][populate][image]=true&populate[product_solutions][populate][items][populate][image]=true&populate[service_support][populate][items][populate][image]=true`;    
    try {
      const response = await fetchData<ApiResponse<any>>(url, true); // addLocale=true
      if (response.data.at(0) && Array.isArray(response.data) && response.data[0].product_name) {
        return mapApiProductToProduct(response.data[0]);
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
    const products = await this.getBestSellers(); 
    ;    
    return products.filter(product => product && product.product_name);
  },

  async getRadioJammers(): Promise<RadioJammer[]> {
    const url = `${API_BASE_URL}/radio-jammings`;
    const response = await fetchData<ApiResponse<ApiProduct>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.product_name)
        .map(mapApiRadioJammerToJammer);
    }
    return []; // Should return an array for getProducts
  },

  async getRadioJammer(id: string): Promise<RadioJammer | null> {
    const url = `${API_BASE_URL}/radio-jammings?filters[slug][$eq]=${id}&populate[display_image]=true&populate[secondary_images]=true&populate[presentation]=true&populate[jammer_category]=true`;
    try {
      const response = await fetchData<ApiResponse<any>>(url, true); // addLocale=true
      if (response.data[0] && Array.isArray(response.data) && response.data[0].product_name) {
        return mapApiRadioJammerToJammer(response.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching jammer ${id}:`, error);
    }
    return null;
  },

  async getAccessoryCategories(): Promise<JammerCategory[] | null>{
    const url = `${API_BASE_URL}/acessory-categories`;
    const response = await fetchData<ApiResponse<JammerCategory>>(url, true); // addLocale=true
    if (Array.isArray(response.data)) {
      return response.data
        .filter(item => item && item.category_name)
        .map(item => ({
          id: item.id,
          category_name: item.category_name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
    }
    return [];
  },

  async getAccessoryFeatures(): Promise<Feature[]> {
    const url = `${API_BASE_URL}/accessory-features`;
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

  async getAccessory(id: string): Promise<AccessoriesType | null> {
    const url = `${API_BASE_URL}/gimbals-acessories?filters[slug][$eq]=${id}&populate[display_image]=true&populate[secondary_images]=true&populate[presentation]=true&populate[accessory_category]=true`;
    try {
      const response = await fetchData<ApiResponse<any>>(url, true); // addLocale=true
      if (response.data && Array.isArray(response.data) && response.data[0].product_name) {
        return mapApiAccessoriesToAccessories(response.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching accessory ${id}:`, error);
    }
    return null;
  },

  async getJammerCategories(): Promise<JammerCategory[] | null>{
    const url = `${API_BASE_URL}/jammer-categories`;
    const response = await fetchData<ApiResponse<ApiNewCategory>>(url, true); // addLocale=true
    if (Array.isArray(response.data)) {         
      return response.data
        .filter(item => item && item.category_name)
        .map(item => ({
          id: item.id,
          category_name: item.category_name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
    }
    return [];
  },

  async getJammerFeatures(): Promise<Feature[]> {
    const url = `${API_BASE_URL}/jammer-features`;
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

  async getAccessories(): Promise<AccessoriesType[]> {
    const url = `${API_BASE_URL}/gimbals-acessories`;
    const response = await fetchData<ApiResponse<ApiAccessories>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.product_name)
        .map(mapApiAccessoriesToAccessories);
    }
    return []; // Should return an array for getProducts
  },

  async getBlogs(): Promise<BlogType[]> {
    const url = `${API_BASE_URL}/blogs`;
    const response = await fetchData<ApiResponse<ApiBlog>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.blog_title)
        .map(mapApiBlogsToBlogs);
    }
    return []; // Should return an array for getProducts
  },

  async getBlog(id: string): Promise<BlogType | null> {
    const url = `${API_BASE_URL}/blogs?filters[slug][$eq]=${id}`;
    try {
      const response = await fetchData<ApiResponse<any>>(url, true, true); // addLocale=true, populate=true
      if (response.data && Array.isArray(response.data) && response.data[0].blog_title) {        
        return mapApiBlogsToBlogs(response.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
    }
    return null;
  },

  async getServices(): Promise<ServiceType[]> {    
    const url = `${API_BASE_URL}/services`;
    const response = await fetchData<ApiResponse<ApiService>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
        .filter(item => item && item.name)
        .map(mapServicesToServices);
    }
    return []; // Should return an array for getProducts
  },


  async getService(id: string): Promise<ServiceType | null> {
    const url = `${API_BASE_URL}/services/${id}`;
    try {
      const response = await fetchData<ApiResponse<ApiService>>(url, true, true); // addLocale=true, populate=true
      if (response.data && !Array.isArray(response.data) && response.data.name) {        
        return mapServicesToServices(response.data);
      }
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
    }
    return null;
  },


  async getServiceCategories(): Promise<ServiceCategory[] | null>{
    const url = `${API_BASE_URL}/service-cateogries`;
    const response = await fetchData<ApiResponse<ServiceCategory>>(url, true); // addLocale=true
    if (Array.isArray(response.data)) {         
      return response.data
        .filter(item => item && item.name)
        .map(item => ({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
    }
    return [];
  },


  async getUseCase(id: string): Promise<UseCase | null> {
    const url = `${API_BASE_URL}/use-cases?filters[slug][$eq]=${id}`;
    try {
      const response = await fetchData<ApiResponse<any>>(url, true, true); // addLocale=true, populate=true      
      if (response.data[0] && Array.isArray(response.data) && response.data[0].Title) {        
        return mapUseCasesToUseCases(response.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching use-case ${id}:`, error);
    }
    return null;
  },


  async getUseCases(): Promise<UseCase[] | null>{
    const url = `${API_BASE_URL}/use-cases`;
    const response = await fetchData<ApiResponse<ApiUseCase>>(url, true, true); // addLocale=true, populate=true
    if (Array.isArray(response.data)) {      
      return response.data
      .filter(item => item && item.Title)
      .map(mapUseCasesToUseCases);      
    }
    return []; // Should return an array for getProducts
  },

  async getSolutions(): Promise<Solution[]> {
    const url = `${API_BASE_URL}/solutions`;
    const response = await fetchData<ApiResponse<ApiSolution>>(url, true, true);
    if (Array.isArray(response.data)) {
      return response.data
        .filter(item => item && item.title)
        .map(mapApiSolutionToSolution)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by time, last to first
    }
    return [];
  },

  async getSolution(id: string): Promise<Solution | null> {
    const url = `${API_BASE_URL}/solutions/${id}`;
    try {
      const response = await fetchData<ApiResponse<ApiSolution>>(url, true, true);
      if (response.data && !Array.isArray(response.data) && response.data.title) {
        return mapApiSolutionToSolution(response.data);
      }
    } catch (error) {
      console.error(`Error fetching solution ${id}:`, error);
    }
    return null;
  },

  async getSolutionBySlug(slug: string): Promise<Solution | null> {
    const url = `${API_BASE_URL}/solutions?filters[slug][$eq]=${slug}`;
    try {
      const response = await fetchData<ApiResponse<ApiSolution>>(url, true, true);
      if (response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].title) {
        return mapApiSolutionToSolution(response.data[0]);
      }
    } catch (error) {
      console.error(`Error fetching solution by slug ${slug}:`, error);
    }
    return null;
  },

  async fetchAll(): Promise<any|null>{
    const drones = await this.getProducts();
    const accessory = await this.getAccessories();
    const radioJams = await this.getRadioJammers();
    const blogs = await this.getBlogs();
    const useCases:any = await this.getUseCases();
    const result = 
    [
      {
        heading: "Drones",
        id: "drones",
        items: mapForDroneChildren(drones)
      },
      {
        heading: "Accessories & Gimbals",
        id: "accessories",
        items: mapForAccessoryChildren(accessory)
      },
      {
        heading: "Signal Suites",
        id: "radioJam",
        items: mapForRadioJamChildren(radioJams)
      },
      {
        heading: "Use Cases",
        id: "use-cases",
        items: mapForUseCaseChildren(useCases)
      },
      {
        heading: "Blogs",
        id: "blogs",
        items: mapForBlogChildren(blogs)
      },
    ]
    return result;
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