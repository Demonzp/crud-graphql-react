const { Product } = require('../models/Product');

module.exports = async () => {
  try {
    const products = [
      new Product({
        name: 'GTX 1060 Ti',
        price: 1000.00,
      }),

      new Product({
        name: 'AMD Ryzen 1600',
        price: 1555.55,
      }),

      new Product({
        name: 'Intel Core i5-2600K',
        price: 1999.99,
      }),
    ];

    let saved = [];
    for (let i = 0; i < products.length; i++) {
        await products[i].save();
        saved.push(products[i]);
    };
  } catch (err) {
    console.error(err);
  }
};