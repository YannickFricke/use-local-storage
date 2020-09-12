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
        window.localStorage.setItem(key, serializeValue(defaultValue));

        return defaultValue;
    }

    return deserializeValue(window.localStorage.getItem(key) as string);
}

/**
 * Checks if the value at the given key is not null
 *
 * @param key The key of the entry
 * @returns {boolean} Returns true when the value is not null
 */
export const hasLocalStorageValue = (key: string) =>
    window.localStorage.getItem(key) !== null;

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
 * @param value The value which should be deserialized
 * @returns {T} The deserialized value
 */
export const deserializeValue = <T>(value: string): T => JSON.parse(value);
