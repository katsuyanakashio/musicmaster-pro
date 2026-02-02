import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/jwt';
import DashboardClient from './dashboard-client';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      level: true,
      exp: true,
    },
  });

  const progressCount = await prisma.progress.count({
    where: { userId: session.userId },
  });

  const completedSongs = await prisma.progress.count({
    where: {
      userId: session.userId,
      completed: true,
    },
  });

  const recentScores = await prisma.score.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      song: {
        select: {
          title: true,
          difficulty: true,
        },
      },
    },
  });

  return (
    <DashboardClient
      user={user!}
      stats={{
        progressCount,
        completedSongs,
      }}
      recentScores={recentScores}
    />
  );
}