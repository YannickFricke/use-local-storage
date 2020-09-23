import { useEffect } from 'react';
import { deserializeValue, serializeValue } from './helper';
import { useLocalStorage } from './useLocalStorage';

export const useSyncedLocalStorage = <T>(
    key: string,
    initialValue: T,
): [T | null, (newValue: T) => void] => {
    const { value, setValue } = useLocalStorage<T | null>(key, initialValue);

    useEffect(() => {
        const listener = ({ key: newKey, newValue }: StorageEvent) => {
            if (newKey !== key) {
                return;
            }

            if (newValue === null) {
                return;
            }

            setValue(deserializeValue<T>(newValue));
        };

        window.addEventListener('storage', listener);

        return () => {
            window.removeEventListener('storage', listener);
        };
    }, [key]);

    return [value, setValue];
};
