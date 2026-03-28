/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: atmospheregallery
 * Interface for AtmosphereGallery
 */
export interface AtmosphereGallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  altText?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: bookingrequests
 * Interface for BookingRequests
 */
export interface BookingRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  requestedService?: string;
  /** @wixFieldType date */
  preferredDate?: Date | string;
  /** @wixFieldType text */
  message?: string;
}


/**
 * Collection ID: services
 * @catalog This collection is an eCommerce catalog
 * Interface for SpaServices
 */
export interface SpaServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType number */
  duration?: number;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  clientPhoto?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  testimonialDate?: Date | string;
}
