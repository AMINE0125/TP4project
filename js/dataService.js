// -------------------------------------------------
// Chargement des commandes
// -------------------------------------------------

export const fetchData = async () => {

    const response = await fetch("./data/data.json");

    if (!response.ok) {
        throw new Error("Impossible de charger les commandes.");
    }

    const items = await response.json();

    return items;
};