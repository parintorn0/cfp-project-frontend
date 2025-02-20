<script>
    import Button from "$lib/Button.svelte";
    import {goto} from "$app/navigation";
    import { page } from "$app/state"
    import {base} from "$app/paths";
    import {save, saveAs} from "$lib/CFP/save.js"
    export let selectedIndex;
    const unSelectedColor={"r": 209, "g": 146, "b": 49, "a": 0.68}
    const selectedColor={"r": 209, "g": 146, "b": 49, "a": 0.98}
    const style="width: 200px;"
    const cfpPage=['assets','liabilities','incomes','expenses','goals']
    const navigate = (path) => {
        goto(path+page.params.version_id)
    }
    const goLeft = () =>{
        navigate('/cfp/'+(cfpPage[(selectedIndex-1)])+'/')
    }
    const goRight = () =>{
        navigate('/cfp/'+(cfpPage[(selectedIndex+1)])+'/')
    }
    const arrowStyle = "width:30px;height:30px;display:initial;"
    const arrowButtonStyle = "padding:20px;border-radius:25px;width:50px;height:50px;display:flex;align-items:center;justify-content:center;background: rgba(209,146,49,1);"
</script>

<div class="layout">
    <div class="save">
        <div class="save-button">
            <Button onClick={save}
                    style="border-radius: 50px; width: 50px; height: 50px; padding: 0; display: flex; align-items: center; justify-content: center; padding: 5px">
                <svg fill="#000000" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd"> <path d="M65.456 48.385c10.02 0 96.169-.355 96.169-.355 2.209-.009 5.593.749 7.563 1.693 0 0-1.283-1.379.517.485 1.613 1.67 35.572 36.71 36.236 37.416.665.707.241.332.241.332.924 2.007 1.539 5.48 1.539 7.691v95.612c0 7.083-8.478 16.618-16.575 16.618-8.098 0-118.535-.331-126.622-.331-8.087 0-16-6.27-16.356-16.1-.356-9.832.356-118.263.356-126.8 0-8.536 6.912-16.261 16.932-16.261zm-1.838 17.853l.15 121c.003 2.198 1.8 4.003 4.012 4.015l120.562.638a3.971 3.971 0 0 0 4-3.981l-.143-90.364c-.001-1.098-.649-2.616-1.445-3.388L161.52 65.841c-.801-.776-1.443-.503-1.443.601v35.142c0 3.339-4.635 9.14-8.833 9.14H90.846c-4.6 0-9.56-4.714-9.56-9.14s-.014-35.14-.014-35.14c0-1.104-.892-2.01-1.992-2.023l-13.674-.155a1.968 1.968 0 0 0-1.988 1.972zm32.542.44v27.805c0 1.1.896 2.001 2 2.001h44.701c1.113 0 2-.896 2-2.001V66.679a2.004 2.004 0 0 0-2-2.002h-44.7c-1.114 0-2 .896-2 2.002z"></path> <path d="M127.802 119.893c16.176.255 31.833 14.428 31.833 31.728s-14.615 31.782-31.016 31.524c-16.401-.259-32.728-14.764-32.728-31.544s15.735-31.963 31.91-31.708zm-16.158 31.31c0 9.676 7.685 16.882 16.218 16.843 8.534-.039 15.769-7.128 15.812-16.69.043-9.563-7.708-16.351-15.985-16.351-8.276 0-16.045 6.52-16.045 16.197z"></path> </g> </g></svg>
            </Button>
            บันทึก
        </div>
        <div class="save-button">
            <Button onClick={saveAs}
                    style="border-radius: 50px; width: 50px; height: 50px; padding: 0; display: flex; align-items: center; justify-content: center; padding: 5px">
                <svg fill="#000000" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd"> <path d="M65.456 48.385c10.02 0 96.169-.355 96.169-.355 2.209-.009 5.593.749 7.563 1.693 0 0-1.283-1.379.517.485 1.613 1.67 35.572 36.71 36.236 37.416.665.707.241.332.241.332.924 2.007 1.539 5.48 1.539 7.691v95.612c0 7.083-8.478 16.618-16.575 16.618-8.098 0-118.535-.331-126.622-.331-8.087 0-16-6.27-16.356-16.1-.356-9.832.356-118.263.356-126.8 0-8.536 6.912-16.261 16.932-16.261zm-1.838 17.853l.15 121c.003 2.198 1.8 4.003 4.012 4.015l120.562.638a3.971 3.971 0 0 0 4-3.981l-.143-90.364c-.001-1.098-.649-2.616-1.445-3.388L161.52 65.841c-.801-.776-1.443-.503-1.443.601v35.142c0 3.339-4.635 9.14-8.833 9.14H90.846c-4.6 0-9.56-4.714-9.56-9.14s-.014-35.14-.014-35.14c0-1.104-.892-2.01-1.992-2.023l-13.674-.155a1.968 1.968 0 0 0-1.988 1.972zm32.542.44v27.805c0 1.1.896 2.001 2 2.001h44.701c1.113 0 2-.896 2-2.001V66.679a2.004 2.004 0 0 0-2-2.002h-44.7c-1.114 0-2 .896-2 2.002z"></path> <path d="M127.802 119.893c16.176.255 31.833 14.428 31.833 31.728s-14.615 31.782-31.016 31.524c-16.401-.259-32.728-14.764-32.728-31.544s15.735-31.963 31.91-31.708zm-16.158 31.31c0 9.676 7.685 16.882 16.218 16.843 8.534-.039 15.769-7.128 15.812-16.69.043-9.563-7.708-16.351-15.985-16.351-8.276 0-16.045 6.52-16.045 16.197z"></path> </g> </g></svg>
            </Button>
            บักทึกใหม่
        </div>
    </div>

    {#if selectedIndex!==0}
        <div>
            <Button color="" style={arrowButtonStyle} onClick={goLeft}>
                <img class="rotate" style={arrowStyle} src="{base}/arrow_circle_right.png" alt="">
            </Button>
        </div>
    {/if}
    <Button color={selectedIndex===0?selectedColor:unSelectedColor} style={style} onClick={()=>{navigate('/cfp/assets/')}}>
        สินทรัพย์
    </Button>
    <Button color={selectedIndex===1?selectedColor:unSelectedColor} style={style} onClick={()=>{navigate('/cfp/liabilities/')}}>
        หนี้สิน
    </Button>
    <Button color={selectedIndex===2?selectedColor:unSelectedColor} style={style} onClick={()=>{navigate('/cfp/incomes/')}}>
        รายได้
    </Button>
    <Button color={selectedIndex===3?selectedColor:unSelectedColor} style={style} onClick={()=>{navigate('/cfp/expenses/')}}>
        รายจ่าย
    </Button>
    <Button color={selectedIndex===4?selectedColor:unSelectedColor} style={style} onClick={()=>{navigate('/cfp/goals/')}}>
        เป้าหมาย
    </Button>
    {#if selectedIndex!==4}
        <div class="btn-container">
            <Button color="" style={arrowButtonStyle} onClick={goRight}>
                <img style={arrowStyle} src="{base}/arrow_circle_right.png" alt="">
            </Button>
        </div>
    {/if}
</div>

<style>
    .layout{
        display: flex;
        gap: 20px;
    }
    .rotate{
        rotate: 180deg;
    }
    .save{
        position: absolute;
        top: 30%;
        right: 100px;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .save-button{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>