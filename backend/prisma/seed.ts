import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: [{ level: 'error', emit: 'event' }] });
prisma.$on('error', (e) => {
  console.log(e);
});

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'John Doe', role: 'CLIENT', email: 'john@example.com' },
      { name: 'Jane Doe', role: 'CLIENT', email: 'jane@example.com' },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
