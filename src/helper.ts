/**
 * Returns the parsed content of the localstorage item with the given id.
 * The default value will be returned when the stored value is null
 *
 * @export
 * @template T The content type
 * @param {string} key The key of the localstorage item
 * @param {T} defaultValue The default value
 * @returns {T} The parsed value or the default value
 */
export function getOrDefault<T>(key: string, defaultValue: T): T {
    if (!hasLocalStorageValue(key)) {
        return defaultValue;
    }

    return deserializeValue(window.localStorage.getItem(key) as string);
}

/**
 * Checks if the value at the given key is not null
 *
 * @param {string} key The key of the entry
 * @returns {boolean} Returns true when the value is not null
 */
export const hasLocalStorageValue = (key: string) =>
    window.localStorage.getItem(key) !== null;

/**
 * Sets the new value to the local storage item by the given key
 *
 * @template T {T} The type of the value which should be saved
 * @param {string} key The key of the local storage item
 * @param {T} value The new value
 */
export const saveLocalStorageValue = <T>(key: string, value: T) => {
    window.localStorage.setItem(key, serializeValue(value));
};

/**
 * Serializes the given value with JSON.stringify
 *
 * @param value The value which should be serialized
 * @returns {string} The serialized value
 */
export const serializeValue = (value: unknown): string => JSON.stringify(value);

/**
 * Deserializes the given value to the given generic type
 *
 * @template T {T} The type of the stored value
 * @param value The value which should be deserialized
 * @returns {T} The deserialized value
 */
export const deserializeValue = <T>(value: string): T => JSON.parse(value);
