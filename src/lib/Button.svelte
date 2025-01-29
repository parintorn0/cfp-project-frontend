<script>
    export let onClick = () => {

    }
    export let color = {r: 255, g: 154, b: 0, a: 0.7};
    export let style = ""
</script>

<button on:click={onClick} style="background: rgba({color.r}, {color.g}, {color.b}, {color.a}); {style}">
    <slot/>
</button>

<style>
    button {
        border: none;
        border-radius: 50px;
        font-size: 18px;
        padding: 10px 20px;
    }
</style>