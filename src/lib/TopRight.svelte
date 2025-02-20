<script>
    import {base} from "$app/paths";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    let userId = $state(null);
    let userType = $state(null);
    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        userId=null
        userType=null;
        goto("/");
    }
    onMount(()=>{
        userId=localStorage.getItem("userId")
        userType=localStorage.getItem("userType")
    })
</script>
{#if userId!= null && userType!=null}
    <div class="account">
        <div class="dropdown">
            <img src="{base}/profile_icon.group.png" class="dropbtn">
            <div class="dropdown-content">
                <div on:click={logout} class="link">Logout</div>
            </div>
        </div>
    </div>
{/if}

<style>
    .link{
        background: none;
        padding: 10px 40px;
    }
    .account{
        position: absolute;
        top: 20px;
        right: 50px;
    }
    /* Dropdown Button */
    .dropbtn {
        color: white;
        padding: 16px;
        font-size: 16px;
        border: none;
        border-radius: 999999px;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {background: none;}
</style>
    