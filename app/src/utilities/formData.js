export const getFormData = (event) => {
    return Object.fromEntries(new FormData(event.target));
}

export const formatRatingNumner = (number) => {
    return isNaN(number.toFixed(1)) ? "0,0" : number.toFixed(1).replace(".", ",");
}