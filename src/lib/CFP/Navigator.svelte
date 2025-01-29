<script>
    import Button from "$lib/Button.svelte";
    export let selectedIndex;
    const unSelectedColor={"r": 209, "g": 146, "b": 49, "a": 0.68}
    const selectedColor={"r": 209, "g": 146, "b": 49, "a": 0.98}
    const style="width: 200px;"
    const navigate = (path) => {
        window.location.href = path;
    }
</script>

<div>
    <Button color={selectedIndex===0?selectedColor:unSelectedColor} style={style} onClick={()=>{navigate('/cfp/assets')}}>
        สินทรัพย์
    </Button>
    <Button color={selectedIndex===1?selectedColor:unSelectedColor} style={style}>
        หนี้สิน
    </Button>
    <Button color={selectedIndex===2?selectedColor:unSelectedColor} style={style}>
        รายได้
    </Button>
    <Button color={selectedIndex===3?selectedColor:unSelectedColor} style={style}>
        รายจ่าย
    </Button>
    <Button color={selectedIndex===4?selectedColor:unSelectedColor} style={style}>
        เป้าหมาย
    </Button>
</div>