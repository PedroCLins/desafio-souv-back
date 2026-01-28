import 'dotenv/config';

import './env';
import app from './app';
import '@database';

const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
  console.log('📦 Successfully connected with database');
});
