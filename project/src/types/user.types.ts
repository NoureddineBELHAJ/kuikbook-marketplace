export type UserType = 'CORPORATE' | 'INDIVIDUAL';

export type UserRole = 'ADMIN' | 'PROVIDER' | 'TRAVELER';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  userType: UserType;
  createdAt: string;
  updatedAt?: string;
  
  // Shared fields
  phone?: string;
  address?: string;
  
  // Individual user fields
  firstName?: string;
  lastName?: string;
  
  // Corporate user fields
  companyName?: string;
  registrationNumber?: string;
  vatNumber?: string;
  contactPerson?: string;
}