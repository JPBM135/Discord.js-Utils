import { EnvironmentKeys } from '../constants.js';
import { resolveEnv } from './resolveEnv.js';

export function inDebugMode() {
	return Boolean(resolveEnv(EnvironmentKeys.Debug));
}
