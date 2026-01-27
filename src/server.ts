import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

const main = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("An error accoured", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
