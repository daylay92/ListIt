import authRoutes from './v1/auth';
import bucketListRoutes from './v1/bucketList';

const routes = app => {
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/bucketList', bucketListRoutes);
};

export default routes;
