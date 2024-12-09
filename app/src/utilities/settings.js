export const getSocialActive = (social) => {
    return Object.entries(social).filter(([_, {isActive}]) => isActive).map(([_, s]) => s);
}