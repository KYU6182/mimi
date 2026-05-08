import "server-only";

import { db } from "@/lib/db";
import { getJstDateString } from "@/lib/utils";

export { getJstDateString };

export async function hasVotedToday(userId: string | undefined, modelProfileId: string) {
  if (!userId) return false;
  const vote = await db.vote.findUnique({
    where: {
      voterId_modelProfileId_votedDate: {
        voterId: userId,
        modelProfileId,
        votedDate: getJstDateString()
      }
    }
  });
  return Boolean(vote);
}

export async function getVoteCount(modelProfileId: string) {
  return db.vote.count({ where: { modelProfileId } });
}

export async function voteForGirl(userId: string, modelProfileId: string) {
  const girl = await db.modelProfile.findUnique({ where: { id: modelProfileId } });
  if (!girl) throw new Error("モデルが見つかりません");
  if (girl.userId === userId) throw new Error("自分には投票できません");

  return db.vote.create({
    data: {
      voterId: userId,
      modelProfileId,
      votedDate: getJstDateString()
    }
  });
}
