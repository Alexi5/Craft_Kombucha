const db = require('APP/db');
const Product = db.model('products');
const ProductType = db.model('producttypes');
const Review = db.model('reviews');
const User = db.model('users');

module.exports = require('express').Router()
  // Route parameter middleware for product id
  .get('/kombucha', (req, res, next) => 
    Product.findAll({
      include: [{
        model: ProductType,
        where: { category: "kombucha" },
      }],
    })
    .then(products => res.json(products))
    .catch(next))

  .get('/merch', (req, res, next) => 
    Product.findAll({
      include: [{
        model: ProductType,
        where: { category: "merch" },
      }],
    })
    .then(products => res.json(products))
    .catch(next))

  .get('/mother', (req, res, next) => 
    Product.findAll({
      include: [{
        model: ProductType,
        where: { category: "mother" },
      }],
    })
    .then(products => res.json(products))
    .catch(next))

  .param('productId', (req, res, next, productId) => {
    req.product = Product.findOne({
      where: {
        id: productId,
      },
      // Eagerly load product's type and reviews (and authors of reviews)
      include: [{
        model: ProductType,
        include: [{
          model: Review,
          include: [{all:true}]
        }]
      }]
    });
    next();
  })
  
  // Get all products
  .get('/', (req, res, next) =>
    Product.findAll({
      // Eagerly load products' type
      // (Don't need reviews if rating is stored on product model)
      include: [ProductType],
    })
    .then(products => {  
      res.json(products)})
    .catch(next))
  // Add new product
  .post('/', (req, res, next) =>
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next))
  // Get one product by ID
  .get('/:productId', (req, res, next) => {
    req.product
    .then(product => res.json(product))
    .catch(next);
  })
  // Get reviews for one product
  .get('/:productId/reviews', (req, res, next) =>
    req.product
    .then(product => res.json(product.producttype.reviews))
    .catch(next))

