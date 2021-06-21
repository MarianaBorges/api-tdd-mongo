import AuthService from '../../../src/services/auth';
import bcrypt from 'bcrypt';
import Util from 'util';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import config from 'config';

const hashSync = Util.promisify(bcrypt.hash);

describe('Service: Auth', () =>{
  context('authenticate', () =>{
    it('should authenticate an user', async ()=>{
      const fakeUserModel = {
        findOne: sinon.stub()
      };
      const user = {
        name: 'Jhon',
        email: 'jhondoe@mail.com',
        password: '123456'
      };

      const authService = new AuthService(fakeUserModel);
      const hashedPassword = await hashSync('123456',10);
      const userFromDatabase = {
        ...user,
        password: hashedPassword
      };
      fakeUserModel.findOne.withArgs({email: 'jhondoe@mail.com'}).resolves(userFromDatabase);

      const res = await authService.authenticate(user);
      expect(res).to.eql(userFromDatabase);
    });

    it('should return false when the password does not match', async () =>{
      const user = {
        email: 'jhondoe@mail.com',
        password: '123456'
      };
      const fakeUserModel = {
        findOne: sinon.stub()
      };
      fakeUserModel.findOne.resolves({email: user.email, password:'aFakeHashedPassword'});
      const authService = new AuthService(fakeUserModel);
      const response = await authService.authenticate(user);
      expect(response).to.be.false;
    });
  });
  context('generateToken', () =>{
    it('should generate a jwt token from a payload', () =>{
      const payload = {
        name: 'Jhon',
        email: 'jhondoe@mail.com',
        password: '123456'
      };
      const expectedToken = jwt.sign(payload, config.get('auth.key'),{
        expiresIn: config.get('auth.tokenExpiresIn')
      });
      const generatedToken = AuthService.generateToken(payload);
      expect(generatedToken).to.eql(expectedToken);
    });
  });
});
