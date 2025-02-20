import {page} from "$app/state";
import {cfpCustomerList, cfpList, customerList} from "$lib/Admin/store.js";

export const fetchData = () => {
    customerList.set([])
    cfpList.set([])
    cfpCustomerList.set(null)
    fetch(`${import.meta.env.VITE_SERVER_HOST}/admin/receive_customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": localStorage.getItem("userId")
        })
    }).then((res)=> {
        res.json().then(data=>{
            data.forEach(item=>{
                customerList.update(value =>{
                    value.push({
                        "cfp_name": item.cfp_name,
                        "customer_name": item.customer_name,
                        "date": item.date,
                        "telephone": item.telephone,
                    })
                    return value
                })
            })
        });
    })
    fetch(`${import.meta.env.VITE_SERVER_HOST}/cfp_list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": localStorage.getItem("userId")
        })
    }).then((res)=> {
        res.json().then(data=>{
            data.forEach(item=>{
                cfpList.update(value =>{
                    value.push({
                        "cfp_id": item.cfp_id,
                        "cfp_name": item.cfp_name,
                        "telephone": item.telephone,
                        "customer_count": item.customer_count,
                    })
                    return value
                })
            })
        });
    })
    // customer-list
    fetch(`${import.meta.env.VITE_SERVER_HOST}/receive_customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cfp_id: page.params.cfp_id,
            user_id: localStorage.getItem("userId")
        }),
    }).then(res=>{
        res.json().then((data)=>{
            cfpCustomerList.set(data)
        });
    }).catch(err=>{
        console.error(err);
    })
}