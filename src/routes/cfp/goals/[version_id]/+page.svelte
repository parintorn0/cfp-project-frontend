<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import Navigator from "$lib/CFP/Navigator.svelte";
    import { page } from "$app/state"
    import Goal from "$lib/CFP/Goal.svelte";
</script>

<TopLeftImage style="position: absolute" version={page.params.version_id}/>
<Navigator selectedIndex={4}/>
<Goal></Goal>

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