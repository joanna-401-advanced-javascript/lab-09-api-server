'use strict';

const {app} = require('../../src/app');
const supergoose = require('./supergoose');
const mockRequest = supergoose(app);

xdescribe('Categories API', () => {
  test('Can post a new category, returns saved category', () => {
    const testCategory = {
      name: 'vacation',
      description: 'time away',
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategory)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('vacation');
      });
  });

  test('Can get existing category', () => {
    const testCategory = {
      name: 'chickpeas',
      description: 'crunchy hummus',
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategory)
      .then(response => {
        return mockRequest.get(`/api/v1/categories/${response.body._id}`)
          .then(response => {
            Object.keys(testCategory).forEach(key => {
              expect(testCategory[key]).toEqual(response.body[0][key]);
            });
          });
      });
  });

  test('Can modify existing category', () => {
    const testCategoryTwo = {
      name: 'sky',
      description: 'blue',
    };

    const updatedCategory = {
      name: 'ocean',
      description: 'wet',
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategoryTwo)
      .then(response => {
        return mockRequest.put(`/api/v1/categories/${response.body._id}`)
          .send(updatedCategory)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('ocean');
          });
      });
  });

  test('Can delete existing category', () => {
    const testCategoryThree = {
      name: 'burgers',
      description: 'buns of delight',
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategoryThree)
      .then(response => {
        return mockRequest.delete(`/api/v1/categories/${response.body._id}`)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('burgers');

            return mockRequest.get('/api/v1/categories')
              .then(response => {
                expect(response.body.count).toEqual(3);
              });
          });
      });
  });
});

describe('Products API', () => {
  test('Can post a new product, returns saved product', () => {
    const testProduct = {
      name: 'salted caramel popcorn',
      description: 'crunchy and sweet',
      price: 3.99,
      category: 'snacks',
    };

    return mockRequest.post('/api/v1/products')
      .send(testProduct)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('salted caramel popcorn');
      });
  });

  test('Can get existing products', () => {
    return mockRequest.get('/api/v1/products')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(1);
        expect(response.body.results[0].name).toEqual('salted caramel popcorn');
      });
  });

  test('Can modify existing product', () => {
    const testProductTwo = {
      name: 'birdseed',
      description: 'small and smells like nuts',
      price: 5.99,
      category: 'pet food',
    };

    const updatedProduct = {
      name: 'puppy chow',
      description: 'smelly',
      price: 6.99,
      category: 'pet food',
    };

    return mockRequest.post('/api/v1/products')
      .send(testProductTwo)
      .then(response => {
        return mockRequest.put(`/api/v1/products/${response.body._id}`)
          .send(updatedProduct)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('puppy chow');
          });
      });
  });

  test('Can delete existing product', () => {
    const testProductThree = {
      name: 'peanut butter cups',
      description: 'not good if you are allergic to nuts',
      price: 1.99,
      category: 'snacks',
    };

    return mockRequest.post('/api/v1/products')
      .send(testProductThree)
      .then(response => {
        return mockRequest.delete(`/api/v1/products/${response.body._id}`)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('peanut butter cups');

            return mockRequest.get('/api/v1/products')
              .then(response => {
                expect(response.body.count).toEqual(2);
              });
          });
      });
  });
});