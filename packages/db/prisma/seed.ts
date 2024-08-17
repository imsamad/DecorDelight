const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
// @ts-ignore
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          phoneNumber: faker.datatype.number({
            min: 1000000000,
            max: 9999999999,
          }),
          password: faker.internet.password(),
          username: faker.internet.userName(),
          fullName: faker.name.fullName(),
          image: faker.image.avatar(),
          emailVerified: faker.datatype.boolean() ? new Date() : null,
          phoneNumberVerified: faker.datatype.boolean() ? new Date() : null,
          isBlocked: faker.datatype.boolean(),
          isAdmin: faker.datatype.boolean(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    )
  );

  // Seed Products
  const products = await Promise.all(
    Array.from({ length: 15 }).map(() =>
      prisma.product.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: {
            amount: parseFloat(faker.commerce.price()),
            currency: faker.helpers.arrayElement(["USD", "INR"]),
          },
          dimension: {
            weight: faker.datatype.float({ min: 0.1, max: 10.0 }),
            length: faker.datatype.float({ min: 0.1, max: 100.0 }),
            width: faker.datatype.float({ min: 0.1, max: 100.0 }),
            height: faker.datatype.float({ min: 0.1, max: 100.0 }),
          },
          slug: faker.lorem.slug(),
          quantityInStock: faker.datatype.number({ min: 1, max: 100 }),
          userId: faker.helpers.arrayElement(users).id,
          status: faker.helpers.arrayElement(["DRAFT", "PUBLISHED"]),
        },
      })
    )
  );

  // Seed CartItems
  await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.cartItem.create({
        data: {
          quantity: faker.datatype.number({ min: 1, max: 10 }),
          userId: faker.helpers.arrayElement(users).id,
          productId: faker.helpers.arrayElement(products).id,
        },
      })
    )
  );
  // let ords: any = [];
  // // Seed Orders
  // await Promise.all(
  //   Array.from({ length: 10 }).map(async () => {
  //     const orderItems = await Promise.all(
  //       Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }).map(
  //         () => {
  //           const product = faker.helpers.arrayElement(products);
  //           return {
  //             productId: product.id, // Use correct field name
  //             priceAtThatTime: product.price, // Nest this inside `create` to align with Prisma's expected format

  //             quantity: faker.datatype.number({ min: 1, max: 5 }),
  //           };
  //         }
  //       )
  //     );
  //     const order = {
  //       items: {
  //         create: orderItems, // Use `create` to correctly nest related models
  //       },
  //       totalAmount: orderItems.reduce(
  //         (sum, item) => sum + item.priceAtThatTime.amount * item.quantity,
  //         0
  //       ),
  //       itemsPrice: orderItems.reduce(
  //         (sum, item) => sum + item.priceAtThatTime.amount * item.quantity,
  //         0
  //       ),
  //       shippingPrice: faker.datatype.number({ min: 5, max: 20 }),
  //       taxPrice: faker.datatype.number({ min: 5, max: 20 }),
  //       paidAt: faker.datatype.boolean() ? new Date() : null,
  //       paidJson: faker.datatype.boolean() ? faker.datatype.json() : null,
  //       address: {
  //         // @ts-ignore
  //         create: {
  //           city: faker.address.city(),
  //           state: faker.address.state(),
  //           country: faker.address.country(),
  //           pincode: faker.address.zipCode(),
  //           longitude: faker.address.longitude(),
  //           latitude: faker.address.latitude(),
  //         },
  //       },
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };
  //     ords.push(order);
  //   })
  // );

  // console.log("ords: ", JSON.stringify(ords, null, 4));
  // await prisma.order.create({
  //   data: ords[0],
  // });
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
