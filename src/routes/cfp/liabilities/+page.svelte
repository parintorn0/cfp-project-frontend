<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {onMount} from "svelte";
    import Navigator from "$lib/CFP/Navigator.svelte";
    import { page } from "$app/state"
    import { assets }  from '$lib/CFP/store.js'

    let userType = $state(null)
    let userId = $state(null)

    onMount(()=>{
        userType = localStorage.getItem("userType")
        userId = localStorage.getItem("userId");

    })
</script>
<div class="layout">
    {#if userType === "F"}
        <TopLeftImage />
        <Navigator selectedIndex={1}/>
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