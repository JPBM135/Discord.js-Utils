import process from 'node:process';

export function resolveEnv(key: string, throwError: true): string;
export function resolveEnv(key: string, throwError?: false): string | undefined;
export function resolveEnv(key: string, throwError?: boolean): string | undefined {
	const value = process.env[key];
	if (value === undefined && throwError) {
		throw new Error(`Environment variable ${key} is not set`);
	}

	return value;
}
