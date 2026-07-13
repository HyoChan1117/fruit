import prisma from "../prismaClient";

const RETENTION_DAYS = 7;
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000;

async function deleteExpiredAuctionResults() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

  const { count } = await prisma.auctionResult.deleteMany({
    where: { auctionDate: { lt: cutoff } },
  });

  if (count > 0) {
    console.log(`Deleted ${count} auction result(s) older than ${RETENTION_DAYS} days`);
  }
}

export function startAuctionResultCleanup() {
  deleteExpiredAuctionResults().catch((err) => console.error("Auction result cleanup failed:", err));
  setInterval(() => {
    deleteExpiredAuctionResults().catch((err) => console.error("Auction result cleanup failed:", err));
  }, CLEANUP_INTERVAL_MS);
}
