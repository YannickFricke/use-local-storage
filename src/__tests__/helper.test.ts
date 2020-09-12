import {
    deserializeValue,
    getOrDefault,
    hasLocalStorageValue,
    saveLocalStorageValue,
    serializeValue,
} from '../helper';

describe('Helper', () => {
    const testKey = 'testing';
    const defaultValue = {
        test: true,
    };

    describe('getOrDefault', () => {
        beforeEach(() => {
            window.localStorage.removeItem(testKey);
        });

        it('should return the parsed value when the value is defined', () => {
            window.localStorage.setItem(testKey, serializeValue(defaultValue));

            const value = getOrDefault<typeof defaultValue>(testKey, {
                test: false,
            });

            expect(value.test).toBeTruthy();
        });

        it('should return the default value when no value is defined', () => {
            const value = getOrDefault<typeof defaultValue>(
                testKey,
                defaultValue,
            );

            expect(value).toBe(defaultValue);
        });
    });

    describe('hasLocalStorageValue', () => {
        beforeEach(() => {
            window.localStorage.removeItem(testKey);
        });

        it('should return false when the value is null', () => {
            expect(hasLocalStorageValue(testKey)).toBeFalsy();
        });

        it('should return true when the value is defined', () => {
            window.localStorage.setItem(testKey, '');

            expect(hasLocalStorageValue(testKey)).toBeTruthy();
        });
    });

    describe('saveLocalStorageValue', () => {
        beforeEach(() => {
            window.localStorage.removeItem(testKey);
        });

        it('should be able to set new items', () => {
            expect(window.localStorage.getItem(testKey)).toBeNull();

            saveLocalStorageValue(testKey, [defaultValue]);

            expect(window.localStorage.getItem(testKey)).toBe(
                JSON.stringify([defaultValue]),
            );
        });
    });

    describe('serializeValue', () => {
        it('should invoke JSON.stringify', () => {
            JSON.stringify = jest.fn();

            expect(JSON.stringify).not.toHaveBeenCalled();
            serializeValue('test');
            expect(JSON.stringify).toHaveBeenCalled();
        });
    });

    describe('deserializeValue', () => {
        it('should invoke JSON.parse', () => {
            JSON.parse = jest.fn();

            expect(JSON.parse).not.toHaveBeenCalled();
            deserializeValue('test');
            expect(JSON.parse).toHaveBeenCalled();
        });
    });
});
