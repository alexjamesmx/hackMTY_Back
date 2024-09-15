/*
import { faker } from '@faker-js/faker';
import { Company, Product } from "./models/models.js";

const generateCompanies = async (count) => {
  const categories = ['Tech', 'Food', 'Fashion', 'Entertainment', 'Sports'];
  const companies = Array.from({ length: count }, () => new Company({
    name: faker.company.name(),
    category: faker.helpers.arrayElement(categories),
  }));
  return await Company.create(companies);
};

const generateProducts = async (count, companies) => {
  const products = Array.from({ length: count }, () => new Product({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    company: faker.helpers.arrayElement(companies)._id,
  }));
  return await Product.create(products);
};

export const generateDummyData = async (companyCount, productCount) => {
  try {
    const companies = await generateCompanies(companyCount);
    const products = await generateProducts(productCount, companies);

    console.log(`Generated ${companies.length} companies and ${products.length} products.`);

    return { companies, products };
  } catch (error) {
    console.error('Error generating dummy data:', error);
    throw error;
  }
};

*/