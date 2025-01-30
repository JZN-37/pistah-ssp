import prisma from "@/app/libs/prismadb";
import { Ad, User } from "@/types/ad";

// Fetch all ads within the given date range
export const getAds = async (startDate: string, endDate: string) => {
  return await prisma.ad.findMany({
    where: {
      adDisplayStartDate: {
        lte: new Date(endDate),
      },
      adDisplayEndDate: {
        gte: new Date(startDate),
      },
    },
    include: {
      adBoard: true,
    },
  });
};

// Create a new ad
export const createAdAsync = async (ad: Ad, createdUser: User) => {
  return await prisma.ad.create({
    data: {
      title: ad.title,
      downloadLink: ad.downloadLink,
      adBoardId: ad.adBoardId,
      adDisplayStartDate: new Date(ad.adDisplayStartDate),
      adDisplayEndDate: new Date(ad.adDisplayEndDate),
      adDuration: ad.adDuration,
      thumbnailUrl: ad.thumbnailUrl,
      remarks: ad.remarks,
      videoUrl: ad.videoUrl,
      createdById: createdUser.id,
    },
  });
};

// Delete an Ad by ID
export const deleteAd = async (id: string, userId: string) => {
  const ad = await prisma.ad.findUnique({
    where: { id },
  });

  if (!ad) {
    throw new Error("Ad not found");
  }

  if (ad.createdById !== userId) {
    throw new Error("Unauthorized to delete this ad");
  }

  return await prisma.ad.delete({ where: { id } });
};
