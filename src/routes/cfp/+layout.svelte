<script>
    import {page} from "$app/state";
    import {assets, customerList, expenses, goals, incomes, liabilities} from "$lib/CFP/store.js";
    import {onMount} from "svelte";
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {goto} from "$app/navigation";
    import {fetchData} from "$lib/CFP/fetchdata.js";
    import TopRight from "$lib/TopRight.svelte";

    let { children } = $props()

    let userType = $state(null)

    onMount(()=>{
        userType = localStorage.getItem("userType")
        fetchData();
    })
</script>

{#if userType === "F" || userType === "A"}
    <TopLeftImage style="position:absolute;" version={page.params.version_id} onClick={()=>{
        goto('/home')
    }}/>
    <div class="layout">
        {@render children()}
        <div style="padding:50px;">
        </div>
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