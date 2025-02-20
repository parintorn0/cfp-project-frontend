<script>
import TopRight from "$lib/TopRight.svelte";
</script>

<div>
    <TopRight/>
    <slot />
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
    div{

        font-family: "Kanit", serif;
        font-style: normal;
        color: #2c3e50;
    }
</style>

<svelte:head>
    <style>
        *{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body{
            height: 100vh;
            width: 100vw;
        }
        input[type='text'], input[type='password'], input[type='date'], select{
            background: none;
            font-size: 16px;
            border-radius: 5px;
            padding: 5px 10px;
            width: 300px;
        }
    </style>
</svelte:head>