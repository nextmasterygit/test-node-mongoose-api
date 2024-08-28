import { Router } from 'express';
import { create, list, update, remove } from '../controller/category';

const router = Router();

router.post('/create', create);
router.put('/update/:id', update);
router.delete('/remove/:id', remove);
router.get('/list/:query?', list);

// Type alias for the router
type categoryRouter = Router;

// Export the router with the alias
export default router as categoryRouter;
