-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MODEL', 'FAN', 'ADMIN');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "WorkCategory" AS ENUM ('CAFE', 'SALON', 'NAIL', 'APPAREL', 'COSMETIC', 'MODEL', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FAN',
    "nickname" TEXT,
    "region" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "prefecture" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "instagram" TEXT,
    "bio" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "editorComment" TEXT,
    "styleTags" TEXT NOT NULL,
    "interestTags" TEXT NOT NULL,
    "mainImageUrl" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "profileBoosted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModelProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "modelProfileId" TEXT NOT NULL,
    "votedDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelProfileId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "CommentStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagazineIssue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "coverImageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MagazineIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagazineArticle" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MagazineArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOpportunity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "WorkCategory" NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rewardText" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workOpportunityId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalonPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "prefecture" TEXT,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "url" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalonPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverContest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "monthLabel" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoverContest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverContestEntry" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "modelProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoverContestEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthRecord" (
    "id" TEXT NOT NULL,
    "modelProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrowthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionFeature" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegionFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopSpot" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopSpot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ModelProfile_userId_key" ON "ModelProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ModelProfile_slug_key" ON "ModelProfile"("slug");

-- CreateIndex
CREATE INDEX "ModelProfile_region_idx" ON "ModelProfile"("region");

-- CreateIndex
CREATE INDEX "ModelProfile_isPublished_idx" ON "ModelProfile"("isPublished");

-- CreateIndex
CREATE INDEX "ModelProfile_createdAt_idx" ON "ModelProfile"("createdAt");

-- CreateIndex
CREATE INDEX "Vote_modelProfileId_idx" ON "Vote"("modelProfileId");

-- CreateIndex
CREATE INDEX "Vote_voterId_idx" ON "Vote"("voterId");

-- CreateIndex
CREATE INDEX "Vote_createdAt_idx" ON "Vote"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_modelProfileId_votedDate_key" ON "Vote"("voterId", "modelProfileId", "votedDate");

-- CreateIndex
CREATE INDEX "Favorite_userId_idx" ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "Favorite_modelProfileId_idx" ON "Favorite"("modelProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_modelProfileId_key" ON "Favorite"("userId", "modelProfileId");

-- CreateIndex
CREATE INDEX "SupportComment_modelProfileId_idx" ON "SupportComment"("modelProfileId");

-- CreateIndex
CREATE INDEX "SupportComment_userId_idx" ON "SupportComment"("userId");

-- CreateIndex
CREATE INDEX "SupportComment_status_idx" ON "SupportComment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "MagazineIssue_slug_key" ON "MagazineIssue"("slug");

-- CreateIndex
CREATE INDEX "MagazineIssue_publishedAt_idx" ON "MagazineIssue"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "MagazineArticle_slug_key" ON "MagazineArticle"("slug");

-- CreateIndex
CREATE INDEX "MagazineArticle_issueId_idx" ON "MagazineArticle"("issueId");

-- CreateIndex
CREATE INDEX "WorkOpportunity_category_idx" ON "WorkOpportunity"("category");

-- CreateIndex
CREATE INDEX "WorkOpportunity_region_idx" ON "WorkOpportunity"("region");

-- CreateIndex
CREATE INDEX "WorkOpportunity_isActive_idx" ON "WorkOpportunity"("isActive");

-- CreateIndex
CREATE INDEX "WorkApplication_userId_idx" ON "WorkApplication"("userId");

-- CreateIndex
CREATE INDEX "WorkApplication_workOpportunityId_idx" ON "WorkApplication"("workOpportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkApplication_userId_workOpportunityId_key" ON "WorkApplication"("userId", "workOpportunityId");

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

-- AddForeignKey
ALTER TABLE "ModelProfile" ADD CONSTRAINT "ModelProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportComment" ADD CONSTRAINT "SupportComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportComment" ADD CONSTRAINT "SupportComment_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MagazineArticle" ADD CONSTRAINT "MagazineArticle_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "MagazineIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkApplication" ADD CONSTRAINT "WorkApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkApplication" ADD CONSTRAINT "WorkApplication_workOpportunityId_fkey" FOREIGN KEY ("workOpportunityId") REFERENCES "WorkOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverContestEntry" ADD CONSTRAINT "CoverContestEntry_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "CoverContest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverContestEntry" ADD CONSTRAINT "CoverContestEntry_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthRecord" ADD CONSTRAINT "GrowthRecord_modelProfileId_fkey" FOREIGN KEY ("modelProfileId") REFERENCES "ModelProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

