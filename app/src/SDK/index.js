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
    }
}