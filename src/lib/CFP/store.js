import {writable} from "svelte/store";

export const customerList = writable([]);

export const assets = writable([]);
export const liabilities = writable([]);
export const incomes = writable([]);
export const expenses = writable([]);
export const goals = writable({
    'goal': {
        "amount": "",
        "name": "",
        "year": "",
        "cashflow": "",
        "growthrate": "",
    },
    'retirement': {
        'age': '',
        'retirementage': '',
        'deadage': '',
        'inflation': '',
        'expense': '',
        'rate': '',
    },
    'portfolio': [],
});

const assetsData = writable({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
});