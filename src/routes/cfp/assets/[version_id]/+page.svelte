<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {onMount} from "svelte";
    import Navigator from "$lib/CFP/Navigator.svelte";
    import Asset from "$lib/CFP/Asset.svelte";
    import { page } from "$app/state"
    import { assets }  from '$lib/CFP/store.js'

    let userType = $state(null)
    let userId = $state(null)

    onMount(()=>{
        userType = localStorage.getItem("userType")
        userId = localStorage.getItem("userId");
        fetch("http://localhost:5000/customer_asset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"version_id": page.params.version_id}),
        }).then(res=>{
            res.json().then((data)=>{
                data.forEach((item)=>{
                    assets.update((value)=>{
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
        }).catch(err=>{
            console.error(err);
        })
    })
</script>
<div class="layout">
    {#if userType === "F"}
        <TopLeftImage style="position: absolute"/>
        <Navigator selectedIndex={0}/>
        <Asset type="Liquid"></Asset>
        <Asset type="Private"></Asset>
        <Asset type="Investment"></Asset>
        <Asset type="Other"></Asset>
    {:else}
        Unauthorized
    {/if}
</div>

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