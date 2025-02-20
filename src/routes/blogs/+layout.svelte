<script>
    let { children } = $props()
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