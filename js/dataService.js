const loadJson = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Impossible de charger ${url}`);
    }

    return await response.json();
};


export const fetchData = async () => {
    const customers = await loadJson(
        "./data/customers.json"
    );

    const products = await loadJson(
        "./data/products.json"
    );

    const orders = await loadJson(
        "./data/orders.json"
    );

    return {
        customers,
        products,
        orders
    };
};