<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import Blogs from "$lib/Customer/Blogs.svelte";
    import {page} from "$app/state";
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
    <Blogs initStringFind={page.params.cfp_name} initOrder={page.params.cfp_name?"cfp_name":"date"}/>
{:else}
    <div>
        <div>Unauthorized</div>
        <div>Redirect to login page...</div>
    </div>
{/if}

<style>
    
</style>