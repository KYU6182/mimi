/*
  Warnings:

  - Made the column `slug` on table `MagazineArticle` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagazineArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MagazineArticle_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "MagazineIssue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MagazineArticle" ("body", "category", "createdAt", "id", "issueId", "slug", "thumbnailUrl", "title", "updatedAt") SELECT "body", "category", "createdAt", "id", "issueId", "slug", "thumbnailUrl", "title", "updatedAt" FROM "MagazineArticle";
DROP TABLE "MagazineArticle";
ALTER TABLE "new_MagazineArticle" RENAME TO "MagazineArticle";
CREATE UNIQUE INDEX "MagazineArticle_slug_key" ON "MagazineArticle"("slug");
CREATE INDEX "MagazineArticle_issueId_idx" ON "MagazineArticle"("issueId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
