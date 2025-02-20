<script>
    import {base} from "$app/paths";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    const {style, onClick} = $props()
    let blogs = $state([])
    let user_type = $state(null)
</script>

<div on:click={onClick}>
    <img src="{base}/Icon.png" style="{style}" alt="">
</div>

<style>
    div{
        position: absolute;
        top: 50px;
        left: 50px;
    }
</style>