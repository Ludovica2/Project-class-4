export const getFormData = (event) => {
    return Object.fromEntries(new FormData(event.target));
}