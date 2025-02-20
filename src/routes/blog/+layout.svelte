<script>
    import {onMount} from "svelte";
    let { children } = $props()
    import {goto} from "$app/navigation";
    import Blogs from "$lib/Customer/Blogs.svelte";
    let user_type = $state(null)
    onMount(()=>{
        user_type = localStorage.getItem("userType");
        if(!user_type){
            goto("/");
        }
    })
</script>

<div class="layout">
    {@render children()}
</div>

<style>
    .layout {
        padding: 10% 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
        gap: 20px;
    }
</style>