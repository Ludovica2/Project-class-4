import axios from "axios";
import { buildApiUrl, buildAuthUrl } from "../config/confing";

export default {
    auth: {
        /**
         * @param {object} payload
         * @param {string} payload.email
         * @param {string} payload.password
         * @returns {Promise<{ token: string, user: object }>}
         */
        login: async (payload) => {
            return (await axios({
                url: buildAuthUrl("/token?role=user"),
                method: "POST",
                data: payload,
            })).data;
        },
        /**
         * @param {object} payload
         * @param {string} payload.email
         * @param {string} payload.password
         * @returns {Promise<{ token: string, user: object }>}
         */
        loginBusiness: async (payload) => {
            return (await axios({
                url: buildAuthUrl("/token?role=business"),
                method: "POST",
                data: payload,
            })).data;
        },
        /**
         * @param {object} payload
         * @param {string} payload.first_name
         * @param {string} payload.last_name
         * @param {string} payload.email
         * @param {string} payload.password
         * @param {boolean} payload.is_terms_accepted
         * @param {object} [payload.metadata]
         * @param {"user"|"business"} payload.role
         * @returns {Promise<{ user: object }>}
         */
        register: async (payload) => {
            return (await axios({
                url: buildApiUrl("/users"),
                method: "POST",
                data: payload,
            })).data;
        },
        /**
         * @param {object} payload
         * @param {string} payload.first_name
         * @param {string} payload.last_name
         * @param {string} payload.email
         * @param {string} payload.password
         * @param {boolean} payload.is_terms_accepted
         * @param {object} [payload.metadata]
         * @param {"user"|"business"} payload.role
         * @returns {Promise<{ user: object }>}
         */
        registerBusiness: async (payload) => {
            return (await axios({
                url: buildApiUrl("/business"),
                method: "POST",
                data: payload,
            })).data;
        },
    },
    events: {
        getAll: async (token) => {
            return (await axios({
                url: buildApiUrl("/events"),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })).data;
        },
        create: async (payload, token) => {
            return (await axios({
                url: buildApiUrl(`/events`),
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
        update: async (payload, token) => {
            return (await axios({
                url: buildApiUrl(`/events/${payload._id}`),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
        delete: async (_id, token) => {
            return (await axios({
                url: buildApiUrl(`/events/${_id}`),
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        }
    }
}