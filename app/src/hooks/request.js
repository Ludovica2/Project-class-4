import axios from "axios";
import { useEffect, useRef, useState } from "react"

const DEFAULT_QUERY_OPTIONS = {
    headers: {},
    selector: null,
    enableCache: true,
}

const DEFAULT_REQUEST_OPTIONS = {
    method: "POST",
    headers: {},
    data: {},
    enableCache: true,
}

// GET
export const useQuery = (url, options = { ...DEFAULT_QUERY_OPTIONS }) => {
    options = { ...DEFAULT_QUERY_OPTIONS, ...options };
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const cache = useRef({
        data: {},
        expires_at: null,
    });
    
    const request = async (payload = { data: {}, headers: {} }) => {
        payload = { data: {}, headers: {}, ...payload };
        const { selector, enableCache, ...axiosOptions } = options;

        if (enableCache && cache.current.expires_at >= new Date().getTime()) {
            if (cache.current.data[url]) {
                setData(cache.current.data[url]);
            }
        } else {
            cache.current.data = {};
        }


        if (error) setError(false);
        if (data) setData(null);

        try {
            const response = await axios({
                url, ...axiosOptions, data: payload.data, headers: payload.headers,
            });

            setData(selector ? response.data[selector] : response.data);

            if (enableCache) {
                cache.current.data[url] = selector ? response.data[selector] : response.data;
                cache.current.expires_at = new Date().getTime() + (60 * 1000);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        request();
    }, [url]);

    return {
        data, error, loading: !data, reload: request
    }
}

// GET, POST, PUT, PATCH, DELETE
export const useRequest = (url, options = { ...DEFAULT_REQUEST_OPTIONS }) => {
    options = { ...DEFAULT_QUERY_OPTIONS, ...options };
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const cache = useRef({
        data: {},
        expires_at: null,
    });

    const request = async (payload = { data: {}, headers: {} }) => {
        payload = { data: {}, headers: {}, ...payload };
        const { selector, enableCache, ...axiosOptions } = options;

        if (enableCache && cache.current.expires_at >= new Date().getTime()) {
            if (cache.current.data[url]) {
                setData(cache.current.data[url]);
            }
        } else {
            cache.current.data = {};
        }

        if (error) setError(false);
        if (data) setData(null);

        try {
            const response = await axios({
                url, ...axiosOptions, data: payload.data, headers: payload.headers,
            });

            setData(selector ? response.data[selector] : response.data);

            if (enableCache) {
                cache.current.data[url] = selector ? response.data[selector] : response.data;
                cache.current.expires_at = new Date().getTime() + (60 * 1000);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return {
        data, error, loading: !data, request
    }
}