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
        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue),
        );

        expect(result.current.value).toBe(testValue);
        expect(typeof result.current.setValue).toBe('function');
        expect(typeof result.current.refresh).toBe('function');
    });

    it('should be able to set a new value', () => {
        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue),
        );

        act(() => {
            result.current.setValue(testValue.concat(testEntry));
        });

        const value = result.current.value;
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

        expect(result.current.value).toHaveLength(0);

        saveLocalStorageValue(testKey, [testEntry]);

        act(() => {
            result.current.refresh();
        });

        expect(result.current.value).toHaveLength(1);
        expect(result.current.value[0]).toStrictEqual(testEntry);
    });

    it('should be able to receive the current value from the local storage', () => {
        let testValue = [testEntry];
        saveLocalStorageValue(testKey, testValue);

        const { result } = renderHook(() =>
            useLocalStorage(testKey, testValue),
        );

        expect(result.current.value).toStrictEqual(testValue);
    });
});
