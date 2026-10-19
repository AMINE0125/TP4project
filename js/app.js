// -------------------------------------------------
// Imports
// -------------------------------------------------

import { state } from "./state.js";

import {
    fetchData
} from "./dataService.js";

import {
    renderItems,
    renderStats,
    renderDetail
} from "./view.js";


// -------------------------------------------------
// Éléments HTML
// -------------------------------------------------

const searchInput =
    document.querySelector("#searchInput");

const btnAll =
    document.querySelector("#btnAll");

const statusButtons =
    document.querySelectorAll(".status-btn");

const paidOnly =
    document.querySelector("#paidOnly");

const ordersTable =
    document.querySelector("#ordersTable");

const errorMessage =
    document.querySelector("#errorMessage");


// -------------------------------------------------
// Bouton actif
// -------------------------------------------------

const updateActiveButton = () => {

    btnAll.classList.toggle(
        "active",
        state.status === "all"
    );


    statusButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.status === state.status
        );

    });
};


// -------------------------------------------------
// Filtrage des commandes
// filter()
// -------------------------------------------------

const getVisibleItems = () => {

    return state.items.filter(item => {


        // =========================================
        // RECHERCHE CLIENT / PRODUIT
        // =========================================

        const text =
            state.search
                .toLowerCase();


        const matchesSearch =

            item.client
                .toLowerCase()
                .includes(text)

            ||

            item.product
                .toLowerCase()
                .includes(text)

            ||

            item.brand
                .toLowerCase()
                .includes(text);


        // =========================================
        // FILTRE STATUT
        // =========================================

        const matchesStatus =

            state.status === "all"

            ||

            item.status === state.status;


        // =========================================
        // FILTRE PAIEMENT
        // =========================================

        const matchesPaid =

            !state.paidOnly

            ||

            item.paid;


        // =========================================
        // RESULTAT FINAL
        // =========================================

        return (

            matchesSearch

            &&

            matchesStatus

            &&

            matchesPaid

        );

    });
};


// -------------------------------------------------
// Rendu principal
// -------------------------------------------------

const render = () => {

    const visibleItems =
        getVisibleItems();


    renderItems(
        visibleItems
    );


    renderStats(
        state.items
    );


    updateActiveButton();
};


// -------------------------------------------------
// Recherche
// -------------------------------------------------

searchInput.addEventListener(
    "input",
    event => {

        state.search =
            event.target.value.trim();


        render();

    }
);


// -------------------------------------------------
// Toutes
// -------------------------------------------------

btnAll.addEventListener(
    "click",
    () => {

        state.status =
            "all";


        render();

    }
);


// -------------------------------------------------
// Livrée / En attente / Annulée
// -------------------------------------------------

statusButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                state.status =
                    button.dataset.status;


                render();

            }
        );

    }
);


// -------------------------------------------------
// Payées uniquement
// -------------------------------------------------

paidOnly.addEventListener(
    "change",
    event => {

        state.paidOnly =
            event.target.checked;


        render();

    }
);


// -------------------------------------------------
// Bouton Voir détail
// find()
// -------------------------------------------------

ordersTable.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".details-btn"
            );


        if (!button) {
            return;
        }


        const id =
            Number(
                button.dataset.id
            );


        const item =
            state.items.find(
                item => item.id === id
            );


        if (!item) {
            return;
        }


        renderDetail(item);

    }
);


// -------------------------------------------------
// Initialisation
// -------------------------------------------------

const init = async () => {

    try {

        const items =
            await fetchData();


        state.items =
            items;


        render();

    }

    catch (error) {

        console.error(error);


        errorMessage.textContent =
            "Impossible de charger les commandes. Vérifiez data/data.json et utilisez Live Server.";


        errorMessage.classList.remove(
            "d-none"
        );

    }
};


init();