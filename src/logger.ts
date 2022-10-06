import Kleur from 'kleur';
import { inDebugMode } from './utils/debug.js';

Kleur.enabled = true;

function loggingPrefix(key?: string) {
	return `[${Kleur.gray(new Date().toISOString())}${key ? ` ${key}` : ''}]:`;
}

export const logger = {
	debug: (message: string, ...args: unknown[]) =>
		inDebugMode() && console.debug(Kleur.blue(`${loggingPrefix('DEBUG')} ${message}`), ...args),
	error: (message: string, error: Error, ...args: unknown[]) =>
		console.error(
			message ? Kleur.red(`${loggingPrefix('ERROR')} ${message}`) : Kleur.red(loggingPrefix('ERROR')),
			Kleur.red(`${loggingPrefix('ERROR')} ${error.name}: ${error.message ?? 'No message provided'}`),
			error,
			...args,
		),
	success: (message: string, ...args: unknown[]) =>
		console.log(Kleur.green(`${loggingPrefix('SUCCESS')} ${message}`), ...args),
	info: (message: string, ...args: unknown[]) =>
		console.info(Kleur.cyan(`${loggingPrefix('INFO')} ${message}`), ...args),
	warn: (message: string, ...args: unknown[]) =>
		console.warn(Kleur.yellow(`${loggingPrefix('WARN')} ${message}`), ...args),
};
