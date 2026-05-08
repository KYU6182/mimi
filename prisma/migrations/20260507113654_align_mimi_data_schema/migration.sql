-- AlterTable
ALTER TABLE "ModelProfile" ADD COLUMN "editorComment" TEXT;

-- CreateTable
CREATE TABLE "SalonPartner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "prefecture" TEXT,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "url" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CoverContest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monthLabel" TEXT NOT NULL,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CoverContestEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contestId" TEXT NOT NULL,
    "modelProfileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CoverContestEntry_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "CoverContest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CoverContestEntry_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrowthRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "occurredAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GrowthRecord_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagazineArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "category" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MagazineArticle_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "MagazineIssue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MagazineArticle" ("body", "category", "createdAt", "id", "issueId", "thumbnailUrl", "title") SELECT "body", "category", "createdAt", "id", "issueId", "thumbnailUrl", "title" FROM "MagazineArticle";
DROP TABLE "MagazineArticle";
ALTER TABLE "new_MagazineArticle" RENAME TO "MagazineArticle";
CREATE UNIQUE INDEX "MagazineArticle_slug_key" ON "MagazineArticle"("slug");
CREATE INDEX "MagazineArticle_issueId_idx" ON "MagazineArticle"("issueId");
CREATE TABLE "new_MagazineIssue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MagazineIssue" ("coverImageUrl", "createdAt", "description", "id", "publishedAt", "slug", "title") SELECT "coverImageUrl", "createdAt", "description", "id", "publishedAt", "slug", "title" FROM "MagazineIssue";
DROP TABLE "MagazineIssue";
ALTER TABLE "new_MagazineIssue" RENAME TO "MagazineIssue";
CREATE UNIQUE INDEX "MagazineIssue_slug_key" ON "MagazineIssue"("slug");
CREATE INDEX "MagazineIssue_publishedAt_idx" ON "MagazineIssue"("publishedAt");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'FAN',
    "nickname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "nickname", "passwordHash", "role", "updatedAt") SELECT "createdAt", "email", "id", "nickname", "passwordHash", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_WorkOpportunity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rewardText" TEXT,
    "deadline" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WorkOpportunity" ("category", "createdAt", "deadline", "description", "id", "imageUrl", "isActive", "region", "title") SELECT "category", "createdAt", "deadline", "description", "id", "imageUrl", "isActive", "region", "title" FROM "WorkOpportunity";
DROP TABLE "WorkOpportunity";
ALTER TABLE "new_WorkOpportunity" RENAME TO "WorkOpportunity";
CREATE INDEX "WorkOpportunity_category_idx" ON "WorkOpportunity"("category");
CREATE INDEX "WorkOpportunity_region_idx" ON "WorkOpportunity"("region");
CREATE INDEX "WorkOpportunity_isActive_idx" ON "WorkOpportunity"("isActive");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "SalonPartner_region_idx" ON "SalonPartner"("region");

-- CreateIndex
CREATE INDEX "SalonPartner_category_idx" ON "SalonPartner"("category");

-- CreateIndex
CREATE UNIQUE INDEX "CoverContest_slug_key" ON "CoverContest"("slug");

-- CreateIndex
CREATE INDEX "CoverContestEntry_contestId_idx" ON "CoverContestEntry"("contestId");

-- CreateIndex
CREATE INDEX "CoverContestEntry_modelProfileId_idx" ON "CoverContestEntry"("modelProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "CoverContestEntry_contestId_modelProfileId_key" ON "CoverContestEntry"("contestId", "modelProfileId");

-- CreateIndex
CREATE INDEX "GrowthRecord_modelProfileId_idx" ON "GrowthRecord"("modelProfileId");

-- CreateIndex
CREATE INDEX "GrowthRecord_occurredAt_idx" ON "GrowthRecord"("occurredAt");

-- CreateIndex
CREATE INDEX "Favorite_userId_idx" ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "Favorite_modelProfileId_idx" ON "Favorite"("modelProfileId");

-- CreateIndex
CREATE INDEX "ModelProfile_region_idx" ON "ModelProfile"("region");

-- CreateIndex
CREATE INDEX "ModelProfile_isPublished_idx" ON "ModelProfile"("isPublished");

-- CreateIndex
CREATE INDEX "ModelProfile_createdAt_idx" ON "ModelProfile"("createdAt");

-- CreateIndex
CREATE INDEX "SupportComment_modelProfileId_idx" ON "SupportComment"("modelProfileId");

-- CreateIndex
CREATE INDEX "SupportComment_userId_idx" ON "SupportComment"("userId");

-- CreateIndex
CREATE INDEX "SupportComment_status_idx" ON "SupportComment"("status");

-- CreateIndex
CREATE INDEX "Vote_modelProfileId_idx" ON "Vote"("modelProfileId");

-- CreateIndex
CREATE INDEX "Vote_voterId_idx" ON "Vote"("voterId");

-- CreateIndex
CREATE INDEX "Vote_createdAt_idx" ON "Vote"("createdAt");

-- CreateIndex
CREATE INDEX "WorkApplication_userId_idx" ON "WorkApplication"("userId");

-- CreateIndex
CREATE INDEX "WorkApplication_workOpportunityId_idx" ON "WorkApplication"("workOpportunityId");
