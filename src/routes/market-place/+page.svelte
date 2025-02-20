<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {onMount} from "svelte";
    import MarketPlace from "$lib/Customer/MarketPlace.svelte";
    import {goto} from "$app/navigation";

    let user_type = $state(null)
    onMount(()=>{
        user_type = localStorage.getItem("userType");
        if(!user_type){
            goto("/");
        }
    })
</script>

{#if user_type==='C'}
    <TopLeftImage onClick={()=>goto("/home")}/>
    <MarketPlace/>
{:else}
    <div>
        <div>Unauthorized</div>
        <div>Redirect to login page...</div>
    </div>
{/if}