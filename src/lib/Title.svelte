<script>
    export let style=""
</script>
<div style={style}>
    <slot/>
</div>

<style>
    div{
        background: rgba(209, 146, 49, 0.68);
        width: 1250px;
        text-align: center;
        padding: 25px 0;
        font-size: 40px;
        color: black;
        font-weight: bold;
        border-radius: 150px;
    }
</style>