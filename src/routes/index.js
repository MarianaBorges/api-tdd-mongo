import express from 'express';
import productsRoute from './products';
import usersRoutes from './users';

const router = express.Router();

router.use('/products', productsRoute);
router.use('/users', usersRoutes);
router.get('/', () => res.send('Hello World'));

export default router;
