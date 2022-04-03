import { useEffect, useState } from 'react';

import {
    getOrDefault,
    hasLocalStorageValue,
    saveLocalStorageValue,
} from './helper';

/**
 * A react hook which uses the local storage of a browser to store and update values
 * @template T {T} The type of the stored value
 * @param {string} key The key of the local storage item
 * @param {T} initialValue The type of the stored value
 */
export const useLocalStorage = <T>(
    key: string,
    initialValue: T,
): [T, (newValue: T) => void, () => void] => {
    const [localValue, setLocalValue] = useState<T>(
        getOrDefault(key, initialValue),
    );
    const [currentKey, setCurrentKey] = useState('');
    const [initialized, setInitialized] = useState(false);

    const setValue = (newValue: T) => {
        saveLocalStorageValue(key, newValue);
        setLocalValue(newValue);
    };

    const refreshLocalValue = () =>
        setLocalValue(getOrDefault(key, initialValue));

    useEffect(() => {
        if (currentKey === key && initialized) {
            return;
        }

        if (!hasLocalStorageValue(key)) {
            saveLocalStorageValue(key, initialValue);
            setLocalValue(initialValue);
            return;
        } else {
            const storedValue = getOrDefault(key, initialValue);

            setLocalValue(storedValue);
        }

        setInitialized(true);
        setCurrentKey(key);
    }, [key, initialValue]);

    return [localValue, setValue, refreshLocalValue];
};
