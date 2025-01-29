import {writable} from "svelte/store";

export const assets = writable([]);
export const liabilities = writable([]);
export const incomes = writable([]);
export const expenses = writable([]);
export const goals = writable([]);

assets.subscribe(asset => {
    console.log(asset);
})
liabilities.subscribe(liability => {
    console.log(liability);
})
incomes.subscribe(income => {
    console.log(income);
})
expenses.subscribe(expense => {
    console.log(expense);
})
goals.subscribe(goal => {
    console.log(goal);
})