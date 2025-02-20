<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {goto} from "$app/navigation";
    import Blogs from "$lib/Customer/Blogs.svelte";
    import {page} from "$app/state";
</script>

<TopLeftImage onClick={()=>goto("/home")}/>
<Blogs initStringFind={page.params.cfp_name} initOrder={page.params.cfp_name?"cfp_name":"date"}/>


<style>
    
</style>