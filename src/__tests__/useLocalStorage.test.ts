import { act, renderHook } from '@testing-library/react-hooks';

import { deserializeValue, saveLocalStorageValue } from '../helper';
import { useLocalStorage } from '../useLocalStorage';

interface ITestValue {
    name: string;
}

describe('useLocalStorage hook', () => {
    const testKey = 'key.testing';
    const testValue: ITestValue[] = [];
    const testEntry: ITestValue = {
        name: 'Jest Tester',
    };

    beforeEach(() => {
        window.localStorage.removeItem(testKey);
    });

    it('should be defined', () => {
        expect(useLocalStorage).toBeDefined();
    });

    it('should return a value, set value function and a refresh function', () => {
        const {
            result: { current },
        } = renderHook(() => useLocalStorage(testKey, testValue));

        expect(current[0]).toBe(testValue);
        expect(typeof current[1]).toBe('function');
        expect(typeof current[2]).toBe('function');
    });

    it('should be able to set a new value', () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useLocalStorage(testKey, testValue),
        );

        act(() => {
            result.current[1](testValue.concat(testEntry));
        });

        const value = result.current[0];

        expect(value).toHaveLength(1);
        expect(value).toContain(testEntry);

        expect(
            deserializeValue(window.localStorage.getItem(testKey)!),
        ).toStrictEqual(value);
    });

    it('should be able to refresh its state', () => {
        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue),
        );

        expect(result.current[0]).toHaveLength(0);

        saveLocalStorageValue(testKey, [testEntry]);

        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toHaveLength(1);
        expect(result.current[0][0]).toStrictEqual(testEntry);
    });

    it('should be able to receive the current value from the local storage', () => {
        const testValue = [testEntry];
        saveLocalStorageValue(testKey, testValue);

        const {
            result: { current },
        } = renderHook(() => useLocalStorage(testKey, testValue));

        expect(current[0]).toStrictEqual(testValue);
    });
});
