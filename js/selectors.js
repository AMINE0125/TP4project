import { state } from "./state.js";


export const getCustomer = (customerId) => {
    return state.customers.find(
        customer => customer.id === customerId
    );
};


export const getProduct = (productId) => {
    return state.products.find(
        product => product.id === productId
    );
};


export const getOrderDetails = (order) => {
    const customer = getCustomer(order.customerId);

    const items = order.items.map(item => {
        const product = getProduct(item.productId);

        const lineTotal =
            product.price * item.quantity;

        return {
            product,
            quantity: item.quantity,
            lineTotal
        };
    });

    let total = 0;

    items.forEach(item => {
        total += item.lineTotal;
    });

    return {
        order,
        customer,
        items,
        total
    };
};


export const getFilteredOrders = () => {

    return state.orders.filter(order => {

        const customer =
            getCustomer(order.customerId);

        const matchesSearch =
            customer.name
                .toLowerCase()
                .includes(
                    state.search.toLowerCase()
                );

        const matchesStatus =
            state.status === "all" ||
            order.status === state.status;

        const matchesCategory =
            state.category === "all" ||
            order.items.some(item => {

                const product =
                    getProduct(item.productId);

                return (
                    product.category ===
                    state.category
                );
            });

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
        );
    });
};


export const getStatistics = () => {

    const totalCustomers =
        state.customers.length;

    const totalProducts =
        state.products.length;

    const totalOrders =
        state.orders.length;

    let totalAmount = 0;

    state.orders.forEach(order => {

        const details =
            getOrderDetails(order);

        totalAmount += details.total;
    });

    return {
        totalCustomers,
        totalProducts,
        totalOrders,
        totalAmount
    };
};


export const getCategories = () => {

    return state.products.map(
        product => product.category
    ).filter(
        (category, index, categories) =>
            categories.indexOf(category) === index
    );
};