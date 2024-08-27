import { Router } from 'express';
import { create, list } from '../controller/member';

const router = Router();

router.post('/create', create);
router.get('/list/:query?', list);

// Type alias for the router
type memberRouter = Router;

// Export the router with the alias
export default router as memberRouter;
