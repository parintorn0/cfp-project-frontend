<script>
    import Title from "$lib/Title.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    let order = $state("blog_count");
    let ascending = $state(false);
    let cfps = $state([])
    let user_type = $state(null)
    let stringFind=$state('');
    onMount(()=>{
        cfps=[]
        fetch("http://localhost:5000/getall_cfp").then((res)=> {
            res.json().then(data=> {
                data.forEach(item => {
                    fetch("http://localhost:5000/get_cfp_image",{
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({"cfp_id": item['cfp_id']}),
                    }).then(res2 => {
                        if (res.status === 200) {
                            res2.blob().then(blob=> {
                                cfps.push({
                                    'cfp_image': URL.createObjectURL(blob),
                                    'cfp_name': item['cfp_name'],
                                    'blog_count': item['blog_count'],
                                    'cfp_id': item['cfp_id'],
                                })
                                console.log(cfps);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            })
        }).catch(err=> {
            alert(err);
        })
    })
    const sorting = () => {
        if (ascending) {
            cfps = cfps.sort((a, b) => {
                if (typeof a[order] === "number")
                    return a[order] - b[order];
                else
                    return a[order].localeCompare(b[order])
            });
        }
        else {
            cfps = cfps.sort((b, a) => {
                if (typeof a[order] === "number")
                    return a[order] - b[order];
                else
                    return a[order].localeCompare(b[order])
            });
        }
    }

</script>

<div class="section">
    <div class="left">
        <input type="text" placeholder="ค้นหา" bind:value={stringFind} />
        <div class="head">เรียงลำดับจาก</div>
        <form action="">
            <input type="radio" bind:group={order} id="date" name="order" value="blog_count" on:change={sorting}>
            <label for="html">จำนวนบทความ</label><br>
            <input type="radio" bind:group={order} id="likes" name="order" value="cfp_name" on:change={sorting}>
            <label for="css">ชื่อนักวางแผน</label><br>
        </form>
        <form action="">
            <input type="radio" bind:group={ascending} id="false" name="sort" value={false} on:change={sorting}>
            <label for="css">มากไปน้อย</label><br>
            <input type="radio" bind:group={ascending} id="true" name="sort" value={true} on:change={sorting}>
            <label for="html">น้อยไปมาก</label><br>
        </form>
    </div>
    <div class="right">
        <Title>
            นักวางแผนการเงิน
        </Title>
        <div class="contents">
            {#each cfps as cfp}
                {#if cfp['cfp_name'].includes(stringFind)}
                    <div class="container" on:click={()=>{goto('/market-place/'+cfp['cfp_id'])}}>
                        <img src={cfp['cfp_image']} alt="" class="cfp-img">
                            <div class="col">
                                <div class="name">
                                    {cfp['cfp_name']}
                                </div>
                                <div>
                                    <div>
                                        จำนวนบทความ: {cfp['blog_count']}
                                    </div>
                                    <div>
                                        เลขคุณวุฒิ: CFPTH{cfp['cfp_id'].toString().padStart(9, '0')}
                                    </div>
                                </div>
                            </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
<style>
    .contents{
        display: flex;
        gap: 50px;
        flex-flow: row wrap;
        padding: 0 25px;
    }
    .cfp-img{
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: 999999px;
    }
    .name{
        font-weight: bold;
        font-size: 20px;
    }
    .container{
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .col{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .head{
        font-size: 20px;
        text-align: center;
    }
    .section {
        width: 100%;
        max-width: 100%;
        display: flex;
        padding: 20px;
        gap: 30px;
    }
    input[type="text"]{
        border-radius: 999px;
    }
    .left{
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .right{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>