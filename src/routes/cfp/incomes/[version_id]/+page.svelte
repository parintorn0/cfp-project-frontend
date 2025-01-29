<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {onMount} from "svelte";
    import Navigator from "$lib/CFP/Navigator.svelte";
    import Income from "$lib/CFP/Income.svelte";
    import { page } from "$app/state"

    let userType = $state(null)

    onMount(()=>{
        userType = localStorage.getItem("userType")
    })

</script>

<Navigator selectedIndex={2}/>
<Income type="Salary"></Income>
<Income type="Investment"></Income>
<Income type="Other"></Income>

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