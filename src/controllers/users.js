class UsersController {

  constructor(User, AuthService){
    this.User = User;
    this.AuthService = AuthService;
  }

  async get(req, res){
    try {
      const users = await this.User.find({});
      res.send(users);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async getById(req, res){

    const{
      params:{id}
    } = req;

    try {
      const user = await this.User.find({_id:id});
      res.send(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async create(req, res){
    const user = new this.User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(422).send(e.message);
    }
  }

  async update(req, res){
    const body = req.body;
    try {
      const user = await this.User.findById(req.params.id);

      user.name = body.name;
      user.email = body.email;
      user.role = body.role;

      if (body.password) {
        user.password = body.password;
      }
      await user.save();

      res.sendStatus(200);
    } catch (e) {
      res.status(422).send(e.message);
    }
  }

  async remove(req, res){
    try {
      await this.User.deleteOne({_id: req.params.id});
      res.sendStatus(204);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async authenticate(req, res) {
    const authService = new this.AuthService(this.User);
    const user = await authService.authenticate(req.body);
    if (!user) {
      return res.sendStatus(401);
    }
    const token = this.AuthService.generateToken({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
    });
    res.send({ token });
  }
}

export default UsersController;
