import axios from "axios";
import { buildApiUrl, buildAuthUrl } from "../config/config";

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
        update: async (_id, payload, token) => {
            return (await axios({
                url: buildApiUrl(`/events/${_id}`),
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
        },
        addToRefs: async (_id, token) => {
            return (await axios({
                url: buildApiUrl(`/events/${_id}`),
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
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
        },
        updateImage: async (payload, token) => {
            return (await axios({
                url: buildApiUrl("/users/profile/avatar"),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
        getAllReviews: async (user_id, token) => {
            return (await axios({
                url: buildApiUrl(`/users/profile/reviews/${user_id}`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
        createReview: async (user_id, payload, token) => {
            return (await axios({
                url: buildApiUrl(`/users/profile/reviews/${user_id}`),
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload // { rating: number, content: string }
            })).data;
        },
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
    post: {
        get: async (post_id, token) => {
            return (await axios({
                url: buildApiUrl(`/posts/single/${post_id}`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
        getAll:async (token) => {
            return (await axios({
                url: buildApiUrl(`/posts`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
        getAllProfile:async (user_id, token) => {
            return (await axios({
                url: buildApiUrl(`/posts/all/${user_id}`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
        create: async (payload, token) => {
            return (await axios({
                url: buildApiUrl(`/posts`),
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
    },
    followers: {
        follow: async (user_id, token) => {
            return (await axios({
                url: buildApiUrl(`/users/follow`),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    user: user_id
                }
            })).data;
        },
        unfollow: async (user_id, token) => {
            return (await axios({
                url: buildApiUrl(`/users/follow`),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: {
                    user: user_id
                }
            })).data;
        },
    },
    users: {
        getUser: async (nickname, token) => {
            return (await axios({
                url: buildApiUrl(`/users/follow/${nickname}`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
    },
    notifications: {
        getAll: async (token) => {
            return (await axios({
                url: buildApiUrl(`/notifications`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
        create: async (payload, token) => {
            return (await axios({
                url: buildApiUrl(`/notifications`),
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
    },
    chat: {
        getRooms: async (token) => {
            return (await axios({
                url: buildApiUrl(`/rooms`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })).data;
        },
        createRoom: async (payload, token) => {
            return (await axios({
                url: buildApiUrl(`/rooms`),
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
        createMessage: async (room_id, payload, token) => { // { to, message }
            return (await axios({
                url: buildApiUrl(`/messages/${room_id}`),
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        }
    },
    settings: {
        getAll: async (token) => {
            return (await axios({
                url: buildApiUrl(`/settings`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
        update: async (payload, token) => {
            return (await axios({
                url: buildApiUrl(`/settings`),
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: payload,
            })).data;
        },
    },
    search: {
        find: async (query, token) => {
            return (await axios({
                url: buildApiUrl(`/search?q=${query.replace(/\s/ig, "+")}`),
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })).data;
        },
    }
}