<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import Home from "$lib/Home.svelte";
    import {onMount} from "svelte";
    import Button from "$lib/Button.svelte";
    import {goto} from "$app/navigation";
    let user_type = $state(null)
    onMount(()=>{
        user_type = localStorage.getItem("userType");
        if(!user_type){
            goto("/");
        }
    })
</script>

<div>
    <div class="layout">
        {#if user_type==='C'}
            <TopLeftImage onClick={()=>{goto('/home')}}/>
            <Home haveBtn/>
        {:else if user_type==='A'}
            <Home/>
            <div class="admin-section">
                <img src="Icon.png" alt="">
                <div class="button-group">
                    <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={()=>{goto('/admin/approve-blog')}}>
                        <div class="w-full">Approve Blog</div>
                    </Button>
                    <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={()=>{goto('/admin/cfp-list')}}>
                        <div class="w-full">ตรวจสอบการทำงานของนักวางแผน</div>
                    </Button>
                    <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={()=>{goto('/admin/customer-list')}}>
                        <div class="w-full">ตรวจสอบข้อมูลลูกค้า</div>
                    </Button>
                </div>
            </div>
        {:else if user_type==='F'}
            <Home/>
            <div class="admin-section">
                <img src="Icon.png" alt="">
                <div class="button-group">
                    <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={()=>{
                        window.location.href = '/cfp';
                    }}>
                        <div class="w-full">ดูลูกค้า</div>
                    </Button>
                    <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={()=>{
                        window.location.href = '/cfp/add-blog';
                    }}>
                        <div class="w-full">เขียนบทความ</div>
                    </Button>
                </div>
            </div>
        {:else}
            <div>
                <div>Unauthorized</div>
                <div>Redirect to login page...</div>
            </div>
        {/if}
    </div>
</div>

<style>
    .layout {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        height: 100vh;
        align-content: space-around;
    }
    .admin-section {
        width: 300px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        padding-top: 150px;
        gap: 150px;
        align-items: center;
    }
    .button-group {
        display: flex;
        flex-direction: column;
        gap: 80px;
    }
</style>