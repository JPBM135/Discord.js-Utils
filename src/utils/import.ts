import type { InjectionToken } from 'tsyringe';

export function importFactory<T, R = () => Promise<{ default: InjectionToken<T> }>>(gen: () => Promise<any>): R {
	return gen as unknown as R;
}
