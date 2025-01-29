<script>
    import {page} from "$app/state";
    import {assets, customerList, expenses, goals, incomes, liabilities} from "$lib/CFP/store.js";
    import {onMount} from "svelte";
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {goto} from "$app/navigation";

    let { children } = $props()

    let userType = $state(null)

    onMount(()=>{
        userType = localStorage.getItem("userType")
        // customer-list
        fetch("http://localhost:5000/receive_customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: localStorage.getItem("userId")}),
        }).then(res=>{
            res.json().then((data)=>{
                data.forEach((item)=>{
                    customerList.update(list=>{
                        list.push({
                            'name': item['name'],
                            'telephone': item['telephone'],
                            'version_num': item['version_num'],
                            'date': item['date'],
                            'status': item['status'],
                            'version_id': item['version_id'],
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
            fetch("http://localhost:5000/customer_asset", {
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
            fetch("http://localhost:5000/customer_liability", {
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
                            });
                            return value;
                        });
                    })
                });
            }).catch(err => {
                console.error(err);
            })
            // incomes
            fetch("http://localhost:5000/customer_income", {
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
            fetch("http://localhost:5000/customer_expense", {
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
            fetch("http://localhost:5000/customer_goal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"version_id": page.params.version_id}),
            }).then(res => {
                res.json().then((data) => {
                    goals.update(value => {
                        value['retirement'] = data['retirement'];
                        data['goal'].forEach((goal) => {
                            value['goal'].push(goal);
                        })
                        return value;
                    })
                });
            }).catch(err => {
                console.error(err);
            })
        }
    })
</script>

{#if userType === "F"}
    <TopLeftImage style="position:absolute;" version={page.params.version_id} onClick={()=>{goto('/cfp')}}/>
    <div class="layout">
        {@render children()}
    </div>
{:else}
    Unauthorized
{/if}

<style>
    .layout {
        padding-top: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
        gap: 20px;
    }
    input {
        width: 250px;
    }
</style>