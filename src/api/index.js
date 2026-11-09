import { USE_MOCK } from '../config';
import * as mock from './mockApi';
import * as real from './steamApi';
export { auth } from './auth';
export const getAccount = (USE_MOCK ? mock : real).getAccount;
