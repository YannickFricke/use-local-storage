import { renderHook } from '@testing-library/react-hooks';
import { useSyncedLocalStorage } from '../useSyncedLocalStorage';

describe('useSyncedLocalStorage', () => {
    const testKey = 'testing.key';
    const testValue: string[] = [];

    it('should be defined', () => {
        expect(useSyncedLocalStorage).toBeDefined();
    });

    it('should add an event listener', () => {
        const originalEventListener = window.addEventListener;
        window.addEventListener = jest.fn();

        renderHook(() => useSyncedLocalStorage(testKey, testValue));

        expect(window.addEventListener).toBeCalled();

        window.addEventListener = originalEventListener;
    });

    it('should add an event listener with two parameters', () => {
        let rawListener = undefined;

        window.addEventListener = (eventName: string, listener: any) => {
            if (eventName !== 'storage') {
                return;
            }

            rawListener = listener;
        };

        renderHook(() => useSyncedLocalStorage(testKey, testValue));

        expect(typeof rawListener === 'function').toBeTruthy();
    });
});
