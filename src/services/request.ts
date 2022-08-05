import axios from 'axios';
import { getEnv } from 'utility/Utils';

const publicAdminBffClient = axios.create({
  baseURL: getEnv('BFF_API'),
});

const adminBffClient = axios.create({
  baseURL: getEnv('BFF_API'),
});

// eslint-disable-next-line
export { publicAdminBffClient, adminBffClient };
