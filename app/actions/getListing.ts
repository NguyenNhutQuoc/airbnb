import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListing(params : IListingsParams) {
    try {
        const {
            userId,
            roomCount, 
            guestCount, 
            bathroomCount, 
            locationValue,
            startDate,
            endDate,
            category,
          } = params;

          console.log("Category: ", category);
      
          let query: any = {};
      
          if (userId) {
            query.userId = userId;
          }
      
          if (category) {
            query.category = category;
          }
      
          if (roomCount) {
            query.roomCount = {
              gte: +roomCount
            }
          }
      
          if (guestCount) {
            query.guestCount = {
              gte: +guestCount
            }
          }
      
          if (bathroomCount) {
            query.bathroomCount = {
              gte: +bathroomCount
            }
          }
      
          if (locationValue) {
            query.locationValue = locationValue;
          }
      
          if (startDate && endDate) {
            query.NOT = {
              reservations: {
                some: {
                  OR: [
                    {
                      endDate: { gte: startDate },
                      startDate: { lte: startDate }
                    },
                    {
                      startDate: { lte: endDate },
                      endDate: { gte: endDate }
                    }
                  ]
                }
              }
            }
          }
        const listing = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return listing.map((listItem) => ({
            ...listItem,
            createdAt: listItem.createdAt.toISOString(),
        }));
    } catch (error: any) {
        throw new Error(error)
    }
}