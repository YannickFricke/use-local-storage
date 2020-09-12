import { useEffect, useState } from 'react';
import { getOrDefault, hasLocalStorageValue, saveLocalStorageValue } from './helper';

/**
 * A react hook which uses the local storage of a browser to store and update values
 * @template T {T} The type of the stored value
 * @param {string} key The key of the local storage item
 * @param {T} initialValue The type of the stored value
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [localValue, setLocalValue] = useState<T>(
        getOrDefault(key, initialValue),
    );

    const setValue = (newValue: T) => {
        saveLocalStorageValue(key, newValue);
        setLocalValue(newValue);
    };

    const refreshLocalValue = () =>
        setLocalValue(getOrDefault(key, initialValue));

    useEffect(() => {
        if (!hasLocalStorageValue(key)) {
            saveLocalStorageValue(key, initialValue);
            setLocalValue(initialValue);
            return;
        }

        const storedValue = getOrDefault(key, initialValue);

        setLocalValue(storedValue);
    }, [key, initialValue]);

    return {
        value: localValue,
        setValue,
        refresh: refreshLocalValue,
    };
};
