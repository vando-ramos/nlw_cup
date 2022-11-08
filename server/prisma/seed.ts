import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://i0.wp.com/g4esportes.com.br/wp-content/uploads/2022/04/cropped-laeeb_official_mascot_fifa_world_cup_by_akyanyme_df2t2s0-fullview.jpg',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Test Pool',
      code: 'Pool01',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-08T12:00:00.665Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-08T12:00:00.665Z',
      firstTeamCountryCode: 'BE',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()