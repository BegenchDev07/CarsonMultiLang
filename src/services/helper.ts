// utils/slugify.ts

// Convert title → slug (spaces → underscores, keep dashes)
export function slugify(title: string) {
    return title      
      .replace(/\s+/g, '_')        // spaces → underscores
      .replace(/[^\w-_]+/g, '')    // remove non-word chars except underscore and dash
      .replace(/__+/g, '_')        // collapse multiple underscores
      .replace(/^_+/, '')          // trim starting underscore
      .replace(/_+$/, '');         // trim ending underscore
  }
  
  // Convert slug → readable text (underscores → spaces, keep dashes)
  export function unslugify(slug: string) {
    if (!slug) return '';
    return slug
      .replace(/_/g, ' ')          // underscores → spaces
      .trim();
  }
  