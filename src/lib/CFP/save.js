import {assets, incomes, liabilities, expenses, goals} from "$lib/CFP/store.js";
import {get} from "svelte/store";
import {page} from "$app/state";
import {fetchData} from "$lib/CFP/fetchdata.js";
import {goto} from "$app/navigation";

export const save = () => {
    fetch(`${import.meta.env.VITE_SERVER_HOST}/save`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'assets': get(assets),
            'incomes': get(incomes),
            'liabilities': get(liabilities),
            'expenses': get(expenses),
            'goals': get(goals),
            'version_id': page.params.version_id,
        }),
    }).then(res =>{
        if(res.ok){
            alert("Saved");
            fetchData();
            goto('/cfp').then(_ => {})
        }
        else{
            res.json().then(data=>{
                alert(data.message);
            })
        }
    })
}
export const saveAs = () => {
    // assets
    // liabilities
    // incomes
    // expenses
    // goals
    fetch(`${import.meta.env.VITE_SERVER_HOST}/save_as`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'assets': get(assets),
            'incomes': get(incomes),
            'liabilities': get(liabilities),
            'expenses': get(expenses),
            'goals': get(goals),
            'version_id': page.params.version_id,
        }),
    }).then(res =>{
        if(res.ok){
            alert("Saved");
            fetchData();
            goto('/cfp').then(_ => {})
        }
        else{
            res.json().then(data=>{
                alert(data.message);
            })
        }
    })
}