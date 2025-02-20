import {customerList, expenses, goals, incomes, assets, liabilities} from "$lib/CFP/store.js";
import {page} from "$app/state";

export const fetchData = () => {
    customerList.set([])
    assets.set([])
    liabilities.set([])
    incomes.set([])
    expenses.set([])
    goals.set({
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
    })
    let reqJson = {
        user_id: localStorage.getItem("userId"),
    }
    if (page.params.cfp_id){
        reqJson['cfp_id'] = page.params.cfp_id
    }
    // customer-list
    fetch(`${import.meta.env.VITE_SERVER_HOST}/receive_customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqJson),
    }).then(res=>{
        res.json().then((data)=>{
            data.forEach((item)=>{
                customerList.update(list=>{
                    list.push({
                        'customer_id': item['customer_id'],
                        'name': item['name'],
                        'telephone': item['telephone'],
                        'status': item['status'],
                        'versions_info': item['versions_info'].sort((a, b) => a.version_num - b.version_num),
                    })
                    return list;
                })
            })
        });
    }).catch(err=>{
        console.error(err);
    })
    if(page.params.version_id) {
        // assets
        fetch(`${import.meta.env.VITE_SERVER_HOST}/customer_asset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"version_id": page.params.version_id}),
        }).then(res => {
            res.json().then((data) => {
                assets.set([]);
                data.forEach((item) => {
                    assets.update((value) => {
                        value.push({
                            'name': item['name'],
                            'subtype': item['subtype'],
                            'growthrate': item['growthrate'],
                            'amount': item['amount'],
                            'type': item['type'],
                        });
                        return value;
                    });
                })
            });
        }).catch(err => {
            console.error(err);
        })
        // liabilities
        fetch(`${import.meta.env.VITE_SERVER_HOST}/customer_liability`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"version_id": page.params.version_id}),
        }).then(res => {
            res.json().then((data) => {
                liabilities.set([]);
                data.forEach((item) => {
                    liabilities.update((value) => {
                        value.push({
                            'name': item['name'],
                            'amount': item['amount'],
                            'rate': item['rate'],
                            'start': item['start'],
                            'end': item['end'],
                            'duration': item['duration'],
                            'term': item['term'],
                        });
                        return value;
                    });
                })
            });
        }).catch(err => {
            console.error(err);
        })
        // incomes
        fetch(`${import.meta.env.VITE_SERVER_HOST}/customer_income`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"version_id": page.params.version_id}),
        }).then(res => {
            res.json().then((data) => {
                incomes.set([]);
                data.forEach((item) => {
                    incomes.update((value) => {
                        value.push({
                            'name': item['name'],
                            'amount': item['amount'],
                            'growthrate': item['growthrate'],
                            'type': item['type'],
                        });
                        return value;
                    });
                })
            });
        }).catch(err => {
            console.error(err);
        })
        // expenses
        fetch(`${import.meta.env.VITE_SERVER_HOST}/customer_expense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"version_id": page.params.version_id}),
        }).then(res => {
            res.json().then((data) => {
                expenses.set([]);
                data.forEach((item) => {
                    expenses.update((value) => {
                        value.push({
                            'name': item['name'],
                            'amount': item['amount'],
                            'growthrate': item['growthrate'],
                        });
                        return value;
                    });
                })
            });
        }).catch(err => {
            console.error(err);
        })
        // goals
        fetch(`${import.meta.env.VITE_SERVER_HOST}/customer_goal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"version_id": page.params.version_id}),
        }).then(res => {
            res.json().then((data) => {
                goals.update(value => {
                    if (data['retirement'])
                        value['retirement'] = data['retirement'];
                    else
                        value['retirement'] = {"age": "",
                            "deadage": "",
                            "expense": "",
                            "inflation": "",
                            "rate": "",
                            "retirementage": ""
                        };
                    if (data['goal'])
                        value['goal'] = data['goal'];
                    else
                        value['goal'] = {
                            "amount": "",
                            "cashflow": "",
                            "growthrate": "",
                            "name": "",
                            "year": ""
                        }
                    value['portfolio'] = data['portfolio'];
                    return value;
                })
            });
        }).catch(err => {
            console.error(err);
        })
    }
}