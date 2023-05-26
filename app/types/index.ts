import { Listing, Reservation, User } from '@prisma/client'

export type SafeListing = Omit<
    Listing,
    'createdAt'
> & {
    createdAt: string
}

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};


export type SafeUser = Omit<
    User,
    'emailVerified' | 'createdAt' | 'updatedAt'> & {
        createdAt: string,
        updatedAt: string,
        emailVerified: string | null
    }

