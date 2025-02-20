import {assets, incomes, liabilities, expenses, goals} from "$lib/CFP/store.js";
import {get} from "svelte/store";
import {page} from "$app/state";
import {fetchData} from "$lib/CFP/fetchdata.js";
import {goto, invalidateAll} from "$app/navigation";

export const save = () => {
    // assets
    // liabilities
    // incomes
    // expenses
    // goals
    fetch('http://localhost:5000/save',{
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