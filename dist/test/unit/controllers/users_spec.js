"use strict";

var _users = _interopRequireDefault(require("../../../src/controllers/users"));

var _sinon = _interopRequireDefault(require("sinon"));

var _user = _interopRequireDefault(require("../../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Controller: Users', () => {
  const defaultUser = [{
    __v: 0,
    _id: '56cb91bdc3464f14678934ca',
    nome: 'Default user',
    email: 'user@gmail.com',
    password: 'password',
    role: 'user'
  }];
  const defaultRequest = {
    params: {}
  };
  describe('get() users', () => {
    it('should return a list of users', async () => {
      const response = {
        send: _sinon.default.spy()
      };
      _user.default.find = _sinon.default.stub();

      _user.default.find.withArgs({}).resolves(defaultUser);

      const usersController = new _users.default(_user.default);
      await usersController.get(defaultRequest, response);

      _sinon.default.assert.calledWith(response.send, defaultUser);
    });
    it('should return 400 when an error occurs', async () => {
      const request = {};
      const response = {
        send: _sinon.default.spy(),
        status: _sinon.default.stub()
      };
      response.status.withArgs(400).returns(response);
      _user.default.find = _sinon.default.stub();

      _user.default.find.withArgs({}).rejects({
        message: 'Error'
      });

      const usersController = new _users.default(_user.default);
      await usersController.get(request, response);

      _sinon.default.assert.calledWith(response.send, 'Error');
    });
  });
  describe('getById()', () => {
    it('should call send with com one user', async () => {
      const fakeId = 'a-fake-id'; //simula o id que deve vir com a request

      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        send: _sinon.default.spy()
      };
      _user.default.find = _sinon.default.stub();

      _user.default.find.withArgs({
        _id: fakeId
      }).resolves(defaultUser);

      const usersController = new _users.default(_user.default);
      await usersController.getById(request, response);

      _sinon.default.assert.calledWith(response.send, defaultUser);
    });
  });
  describe('create() user', () => {
    it('should call send with a new user', async () => {
      const requestWithBody = Object.assign({}, {
        body: defaultUser[0]
      }, defaultRequest);
      const response = {
        send: _sinon.default.spy(),
        status: _sinon.default.stub()
      };

      class fakeUser {
        save() {}

      }

      response.status.withArgs(201).returns(response);

      _sinon.default.stub(fakeUser.prototype, 'save').withArgs().resolves();

      const usersController = new _users.default(fakeUser);
      await usersController.create(requestWithBody, response);

      _sinon.default.assert.calledWith(response.send);
    });
    context('when an error occurs', () => {
      it('should return 422', async () => {
        const response = {
          send: _sinon.default.spy(),
          status: _sinon.default.stub()
        };

        class fakeUser {
          save() {}

        }

        response.status.withArgs(422).returns(response);

        _sinon.default.stub(fakeUser.prototype, 'save').withArgs().rejects({
          message: 'Error'
        });

        const usersController = new _users.default(fakeUser);
        await usersController.create(defaultRequest, response);

        _sinon.default.assert.calledWith(response.status, 422);
      });
    });
  });
  describe('update() user', () => {
    it('should respond with 200 when the user has been update', async () => {
      const fakeId = 'a-fake-id';
      const updatedUser = {
        _id: fakeId,
        name: 'Updated User',
        email: 'user@gmail.com',
        password: 'password',
        role: 'user'
      };
      const request = {
        params: {
          id: fakeId
        },
        body: updatedUser
      };
      const response = {
        sendStatus: _sinon.default.spy()
      };

      class fakeUser {
        static findById() {}

        save() {}

      }

      const fakeUserInstance = new fakeUser();

      const saveSpy = _sinon.default.spy(fakeUser.prototype, 'save');

      const findByIdStub = _sinon.default.stub(fakeUser, 'findById');

      findByIdStub.withArgs(fakeId).resolves(fakeUserInstance);
      const usersController = new _users.default(fakeUser);
      await usersController.update(request, response);

      _sinon.default.assert.calledWith(response.sendStatus, 200);

      _sinon.default.assert.calledOnce(saveSpy);
    });
    context('when an error occurs', () => {
      it('should return 422', async () => {
        const fakeId = 'a-fake-id';
        const updatedUser = {
          _id: fakeId,
          name: 'Updated User',
          email: 'user@gmail.com',
          password: 'password',
          role: 'user'
        };
        const request = {
          params: {
            id: fakeId
          },
          body: updatedUser
        };
        const response = {
          send: _sinon.default.spy(),
          status: _sinon.default.stub()
        };

        class fakeUser {
          static findById() {}

        }

        const findByIdStub = _sinon.default.stub(fakeUser, 'findById');

        findByIdStub.withArgs(fakeId).rejects({
          message: 'Error'
        });
        response.status.withArgs(422).returns(response);
        const usersController = new _users.default(fakeUser);
        await usersController.update(request, response);

        _sinon.default.assert.calledWith(response.send, 'Error');
      });
    });
  });
  describe('delete() user', () => {
    it('should respond with 204 when the user has been deleted', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        sendStatus: _sinon.default.spy()
      };

      class fakeUser {
        static remove() {}

      }

      const removeStub = _sinon.default.stub(fakeUser, 'remove');

      removeStub.withArgs({
        _id: fakeId
      }).resolves([1]);
      const usersController = new _users.default(fakeUser);
      await usersController.remove(request, response);

      _sinon.default.assert.calledWith(response.sendStatus, 204);
    });
    context('whe an error occurs', () => {
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

        class fakeUser {
          static remove() {}

        }

        const removeStub = _sinon.default.stub(fakeUser, 'remove');

        removeStub.withArgs({
          _id: fakeId
        }).rejects({
          message: 'Error'
        });
        response.status.withArgs(400).returns(response);
        const usersController = new _users.default(fakeUser);
        await usersController.remove(request, response);

        _sinon.default.assert.calledWith(response.send, 'Error');
      });
    });
  });
});