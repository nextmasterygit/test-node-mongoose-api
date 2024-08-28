import { Router } from 'express';
import {
  create,
  list,
  update,
  updateMany,
  updateManyFast,
  remove,
  removeMany,
  removeManyFast
} from '../controller/member';

const router = Router();

router.post('/create', create);
router.put('/update/:id', update);
router.put('/update-many', updateMany);
router.put('/update-many-fast', updateManyFast);
router.delete('/remove/:id', remove);
router.delete('/remove-many', removeMany);
router.delete('/remove-many-fast', removeManyFast);
router.get('/list/:query?', list);

// Type alias for the router
type memberRouter = Router;

// Export the router with the alias
export default router as memberRouter;
