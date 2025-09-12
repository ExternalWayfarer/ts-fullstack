import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({ log: [{ level: 'error', emit: 'event' }] });
prisma.$on('error', (e) => {
  console.log(e);
});

async function main() {
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' }
  });

  const iphone = await prisma.product.create({
    data: {
      name: 'iPhone 15',
      description: 'newest iPhone',
      price: 80000,
      stock: 10,
      imageUrl: 'https://example.com/iphone.jpg'
    }
  });


  await prisma.productCategory.create({
    data: {
      productId: iphone.id,
      categoryId: electronics.id
    }
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
