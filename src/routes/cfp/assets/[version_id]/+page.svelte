<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import Navigator from "$lib/CFP/Navigator.svelte";
    import Asset from "$lib/CFP/Asset.svelte";
    import { page } from "$app/state"

</script>

<Navigator selectedIndex={0}/>
<Asset type="Liquid"></Asset>
<Asset type="Private"></Asset>
<Asset type="Investment"></Asset>
<Asset type="Other"></Asset>

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