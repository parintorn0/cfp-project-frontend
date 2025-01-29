<script>
    import Navigator from "$lib/CFP/Navigator.svelte";
    import Liability from "$lib/CFP/Liability.svelte";
</script>

    <Navigator selectedIndex={1}/>
    <Liability></Liability>

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