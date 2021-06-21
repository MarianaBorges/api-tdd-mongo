class ProductsController{

  constructor(Product){
    this.Product = Product;
  }

  async get(req, res){
    try {
      const products = await this.Product.find({});
      res.send(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
  }

  async getById(req, res){
    const {
      params: { id }
    } = req;

    try {
      const product = await this.Product.find({ _id: id });
      res.send(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res){
    const product = new this.Product(req.body);
    try {
      console.log('create',res.body);
      await product.save();
      res.status(201).send(product);
    } catch (e) {
      console.log('create error',res.body);
      res.status(422).send(e.message);
    }
  }

  async update(req, res){
    try {
      await this.Product.updateOne({ _id: req.params.id}, req.body);
      res.sendStatus(200);
    } catch (e) {
      res.status(422).send(e.message);
    }

  }

  async remove(req, res){
    try {
      await this.Product.deleteOne({_id: req.params.id});
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }



}//class end
export default ProductsController;
