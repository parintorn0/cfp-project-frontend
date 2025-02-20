<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import Blog from "$lib/Customer/Blog.svelte";
    let user_type = $state(null)
    onMount(()=>{
        user_type = localStorage.getItem("userType");
    })
</script>

<TopLeftImage onClick={()=>goto("/home")}/>
<Blog/>