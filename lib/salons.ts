import "server-only";

import { db } from "@/lib/db";
import { normalizeRegion } from "@/lib/utils";

export async function getSalonPartnersByRegion(region: string) {
  return db.salonPartner.findMany({
    where: {
      region: normalizeRegion(region),
      isActive: true
    },
    orderBy: { createdAt: "desc" }
  });
}
