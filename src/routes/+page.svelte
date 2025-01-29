<script>
    import Button from "$lib/Button.svelte";
    import Home from "$lib/Home.svelte";
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    let emailValue = $state();
    let passwordValue = $state();

    let registerEmailValue = $state();
    let registerPasswordValue = $state();
    let registerFirstNameValue = $state();
    let registerLastNameValue = $state();
    let registerPhoneValue = $state();

    let isLogin=$state(true);

    function login(){
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": emailValue,
                "password": passwordValue,
            })
        }).then((res) => {
            res.json().then(data=>{
                console.log(data);
                alert("Login successful!");
                localStorage.setItem("userType", data['user_type']);
                localStorage.setItem("userId", data['user_id']);
                window.location.href = '/home';
            }).catch((err) => {
                console.error(err);
            })
        }).catch((err) => {
            console.error(err);
        })
    }

    function register(){
        console.log(JSON.stringify({
            "email": registerEmailValue,
            "password": registerPasswordValue,
            "name": registerFirstNameValue,
            "surname": registerLastNameValue,
            "telephone": registerPhoneValue,
        }))
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": registerEmailValue,
                "password": registerPasswordValue,
                "name": registerFirstNameValue,
                "surname": registerLastNameValue,
                "telephone": registerPhoneValue,
            })
        }).then((res) => {
            if(res.ok){
                alert("Register successful!");
                isLogin=true;
            }
        }).catch((err) => {
            console.error(err);
        })
    }
</script>

<div>
    <div class="layout">
        <TopLeftImage/>
        <Home/>
        {#if isLogin}
            <div class="login-section">
                <div class="login">เข้าสู่ระบบ</div>
                <input type="text" placeholder="Email" bind:value={emailValue}/>
                <input type="password" placeholder="รหัสผ่าน" bind:value={passwordValue}/>
                <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={login}>
                    <div class="w-full">เข้าสู่ระบบ</div>
                </Button>
                <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={()=>{isLogin=false}}>
                    <div class="w-full">สมัครสมาชิก</div>
                </Button>
            </div>
        {:else}
            <div class="login-section">
                <div class="login">สมัครสมาชิก</div>
                <input type="text" placeholder="Email" bind:value={registerEmailValue}/>
                <input type="text" placeholder="รหัสผ่าน" bind:value={registerPasswordValue}>
                <input type="text" placeholder="ชื่อ" bind:value={registerFirstNameValue}>
                <input type="text" placeholder="นามสกุล" bind:value={registerLastNameValue}>
                <input type="text" placeholder="เบอร์โทรศัพท์" bind:value={registerPhoneValue}>
                <Button class="login-btn" color={{r: 186, g: 141, b: 72, a: 0.39}} onClick={register}>
                    <div class="w-full">สมัครสมาชิก</div>
                </Button>
            </div>
        {/if}
    </div>
</div>

<style>
    .login {
        color: black;
        font-size: 25px;
    }
    .w-full {
        width: 250px;
    }
    .login-section {
        width: 400px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .layout {
        display: flex;
        justify-content: space-evenly;
        height: 100vh;
        align-items: center;
    }
</style>