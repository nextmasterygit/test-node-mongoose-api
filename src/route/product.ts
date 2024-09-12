import { Router } from 'express';
import { create, createSession, list } from '../controller/product';

const router = Router();

router.post('/create', create);
router.post('/create-session', createSession);
router.get('/list/:query?', list);

// Type alias for the router
type productRouter = Router;

// Export the router with the alias
export default router as productRouter;
