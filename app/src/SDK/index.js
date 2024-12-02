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
    profile: {
        update: async (payload, token) => {
            return (await axios({
                url: buildApiUrl("/users/profile"),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        }
    },
    account: {
        updatePassword: async (payload, token) => {
            return (await axios({
                url: buildApiUrl("/users/password"),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
        updateEmail: async (payload, token) => {
            return (await axios({
                url: buildApiUrl("/users/email"),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
        updateNickname: async (payload, token) => {
            return (await axios({
                url: buildApiUrl("/users/nickname"),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        }
    },
}