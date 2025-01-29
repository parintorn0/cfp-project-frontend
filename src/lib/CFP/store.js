import {writable} from "svelte/store";

export const customerList = writable([])

export const assets = writable([]);
export const liabilities = writable([]);
export const incomes = writable([]);
export const expenses = writable([]);
export const goals = writable({
    'goal': [],
    'retirement': {
        'age': '',
        'retirementage': '',
        'deadage': '',
        'inflation': '',
    }
});

// customerList.subscribe(customer => {
//     console.log(customer);
// })
assets.subscribe(asset => {
    console.log(asset);
})
// liabilities.subscribe(liability => {
//     console.log(liability);
// })
// incomes.subscribe(income => {
//     console.log(income);
// })
// expenses.subscribe(expense => {
//     console.log(expense);
// })
goals.subscribe(goal => {
    if(goal['retirement']===null){
        goals.update(value=>{
            value['retirement'] = {
                'age': '',
                'retirementage': '',
                'deadage': '',
                'inflation': '',
            };
            return value;
        });
    }
    console.log(goal);
})