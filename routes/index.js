import { Router } from 'express';
const router = Router();

router.use('/', require('./base'));
router.use('/account', require('./account'));
router.use('/user', require('./user').default);
router.use('/users', require('./users').default);

export default router;
