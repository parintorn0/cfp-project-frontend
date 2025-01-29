<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import Navigator from "$lib/CFP/Navigator.svelte";
    import { page } from "$app/state"
    import Expense from "$lib/CFP/Expense.svelte";
</script>

<Navigator selectedIndex={3}/>
<Expense></Expense>

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