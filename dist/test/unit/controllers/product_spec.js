"use strict";

var _products = _interopRequireDefault(require("../../../src/controllers/products"));

var _sinon = _interopRequireDefault(require("sinon"));

var _product = _interopRequireDefault(require("../../../src/models/product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Controllers: Products', () => {
  const defaultProduct = [{
    __v: 0,
    _id: '56cb91bdc3464f14678934ca',
    name: 'Default product',
    description: 'product description',
    price: 100
  }];
  const defaultRequest = {
    params: {}
  };
  describe('get() products', () => {
    it('should return a list os products', async () => {
      const response = {
        send: _sinon.default.spy()
      };
      _product.default.find = _sinon.default.stub();

      _product.default.find.withArgs({}).resolves(defaultProduct);

      const productsController = new _products.default(_product.default);
      await productsController.get(defaultRequest, response);

      _sinon.default.assert.calledWith(response.send, defaultProduct);
    });
    it('should return 400 when an error occurs', async () => {
      const request = {};
      const response = {
        send: _sinon.default.spy(),
        status: _sinon.default.stub()
      };
      response.status.withArgs(400).returns(response);
      _product.default.find = _sinon.default.stub();

      _product.default.find.withArgs({}).rejects({
        message: 'Error'
      });

      const productsController = new _products.default(_product.default);
      await productsController.get(request, response);

      _sinon.default.assert.calledWith(response.send, 'Error');
    });
  });
  describe('getById()', () => {
    it('should return one product', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        send: _sinon.default.spy()
      };
      _product.default.find = _sinon.default.stub();

      _product.default.find.withArgs({
        _id: fakeId
      }).resolves(defaultProduct);

      const productsController = new _products.default(_product.default);
      await productsController.getById(request, response);

      _sinon.default.assert.calledWith(response.send, defaultProduct);
    });
  }); //describe end

  describe('create() product', () => {
    it('should save a new product successfully', async () => {
      const requestWithBody = Object.assign({}, {
        body: defaultProduct[0]
      }, defaultRequest);
      const response = {
        send: _sinon.default.spy(),
        status: _sinon.default.stub()
      };

      class fakeProduct {
        save() {}

      }

      response.status.withArgs(201).returns(response);

      _sinon.default.stub(fakeProduct.prototype, 'save').withArgs().resolves();

      const productsController = new _products.default(fakeProduct);
      await productsController.create(requestWithBody, response);

      _sinon.default.assert.calledWith(response.send);
    });
    context('when an error occurs', () => {
      it('should return 422', async () => {
        const response = {
          send: _sinon.default.spy(),
          status: _sinon.default.stub()
        };

        class fakeProduct {
          save() {}

        }

        response.status.withArgs(422).returns(response);

        _sinon.default.stub(fakeProduct.prototype, 'save').withArgs().rejects({
          message: 'Error'
        });

        const productsController = new _products.default(fakeProduct);
        await productsController.create(defaultRequest, response);

        _sinon.default.assert.calledWith(response.status, 422);
      });
    });
  });
  describe('update() product', () => {
    it('should respond with 200 when the product has been updated', async () => {
      const fakeId = 'a-fake-id';
      const updatedProduct = {
        _id: fakeId,
        name: 'Updated product',
        description: 'Updated description',
        price: 150
      };
      const request = {
        params: {
          id: fakeId
        },
        body: updatedProduct
      };
      const response = {
        sendStatus: _sinon.default.spy()
      };

      class fakeProduct {
        static updateOne() {}

      }

      const updateOneStub = _sinon.default.stub(fakeProduct, 'updateOne');

      updateOneStub.withArgs({
        _id: fakeId
      }, updatedProduct).resolves(updatedProduct);
      const productsController = new _products.default(fakeProduct);
      await productsController.update(request, response);

      _sinon.default.assert.calledWith(response.sendStatus, 200);
    });
    context('when an error occurs', () => {
      it('should return 422', async () => {
        const fakeId = 'a-fake-id';
        const updatedProduct = {
          _id: fakeId,
          name: 'Updated product',
          description: 'Updated description',
          price: 150
        };
        const request = {
          params: {
            id: fakeId
          },
          body: updatedProduct
        };
        const response = {
          send: _sinon.default.spy(),
          status: _sinon.default.stub()
        };

        class fakeProduct {
          static updateOne() {}

        }

        const updateOneStub = _sinon.default.stub(fakeProduct, 'updateOne');

        updateOneStub.withArgs({
          _id: fakeId
        }, updatedProduct).rejects({
          message: 'Error'
        });
        response.status.withArgs(422).returns(response);
        const productsController = new _products.default(fakeProduct);
        await productsController.update(request, response);

        _sinon.default.assert.calledWith(response.send, 'Error');
      });
    });
  });
  describe('delete() product', () => {
    it('should respond with 204 when the product has been deleted', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        sendStatus: _sinon.default.spy()
      };

      class fakeProduct {
        static deleteOne() {}

      }

      const deleteOneStub = _sinon.default.stub(fakeProduct, 'deleteOne');

      deleteOneStub.withArgs({
        _id: fakeId
      }).resolves();
      const productsController = new _products.default(fakeProduct);
      await productsController.remove(request, response);

      _sinon.default.assert.calledWith(response.sendStatus, 204);
    });
    context('when an error occurs', () => {
      it('should return 400', async () => {
        const fakeId = 'a-fake-id';
        const request = {
          params: {
            id: fakeId
          }
        };
        const response = {
          send: _sinon.default.spy(),
          status: _sinon.default.stub()
        };

        class fakeProduct {
          static deleteOne() {}

        }

        const deleteOneStub = _sinon.default.stub(fakeProduct, 'deleteOne');

        deleteOneStub.withArgs({
          _id: fakeId
        }).rejects({
          message: 'Error'
        });
        response.status.withArgs(400).returns(response);
        const productsController = new _products.default(fakeProduct);
        await productsController.remove(request, response);

        _sinon.default.assert.calledWith(response.send, 'Error');
      });
    });
  });
});