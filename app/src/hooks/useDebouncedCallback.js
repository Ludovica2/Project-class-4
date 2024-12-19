import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;

/**
 * @param {*} value 
 * @param {() => Promise<any>} callbackfn 
 * @param {number} delay 
 * @returns {[any, Function]}
 */
export const useDebouncedCallback = (value, callbackfn = async () => { }, delay = DEFAULT_DELAY, options = { minValueLength: 3, emptyFallback: null }) => {
    options = { minValueLength: 3, emptyFallback: [], ...options };

    const [result, setResult] = useState(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (value.length >= options.minValueLength) {
                setResult(await callbackfn());
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    useEffect(() => {
        if (value.length < options.minValueLength) {
            setResult(options.emptyFallback);
        }
    }, [value]);

    return [result, setResult];
};

