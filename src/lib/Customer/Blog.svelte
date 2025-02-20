<script>
    import Title from "$lib/Title.svelte";
    import {onMount} from "svelte";
    import {page} from "$app/state";
    let blogData = $state(null)
    const fetchData = () => {
        fetch(`${import.meta.env.VITE_SERVER_HOST}/get_blog`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "blog_id": page.params.blog_id,
                "user_id": localStorage.getItem("userId")
            })
        }).then(res=>{
            res.json().then(data=>{
                fetch(`${import.meta.env.VITE_SERVER_HOST}/get_blog_image`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "blog_id": page.params.blog_id,
                    })
                }).then(res2=>{
                    res2.blob().then(image=>{
                        fetch(`${import.meta.env.VITE_SERVER_HOST}/get_blog_pdf`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "blog_id": page.params.blog_id,
                            })
                        }).then(res3=>{
                            res3.blob().then(pdf=>{
                                fetch(`${import.meta.env.VITE_SERVER_HOST}/get_cfp_image`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        "cfp_id": data["cfp_id"]
                                    })
                                }).then(res4=>{
                                    res4.blob().then(cfp_image=>{
                                        blogData={
                                            "cfp_name": data["cfp_name"],
                                            "like_count": data["like_count"],
                                            "date": data["date"],
                                            "tags": data["tags"],
                                            "title": data["title"],
                                            "image": URL.createObjectURL(image),
                                            "pdf": URL.createObjectURL(pdf),
                                            "cfp_image": URL.createObjectURL(cfp_image),
                                            "is_liked": data["is_liked"]
                                        }
                                    })
                                })
                            })
                        }).catch(err=>{
                            alert(err.message)
                        })
                    })
                }).catch(err=>{
                    alert(err.message)
                })
                blogData=data;
            }).catch(err=>{
                alert(err.message);
            })
        }).catch(err=> {
            alert(err.message);
        })
    }
    onMount(()=>{
        fetchData();
    })
    const like = () => {
        fetch(`${import.meta.env.VITE_SERVER_HOST}/like_blog`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "blog_id": page.params.blog_id,
                "user_id": localStorage.getItem("userId"),
            })
        }).then(res=>{
            if (res.status === 200){
                res.json().then(data=>{
                    alert(data.message);
                    fetchData()
                })
            }
        }).catch(err=>{
            alert(err.message);
        })
    }
</script>

{#if blogData}
    <div class="title">
        <Title style="border-bottom-left-radius: 0;border-bottom-right-radius: 0; width: 100%;">
            <div>{blogData['title']}</div>
            <div class="row">
                <div>{blogData['date']}</div>
                <div>Tags: {blogData['tags'].join(', ')}</div>
            </div>
        </Title>
        <div class="cfp">
            <div class="cfp-name">
                {blogData.cfp_name}
            </div>
            <img class="cfp-image" src={blogData['cfp_image']} alt="">
        </div>
    </div>
    <img src={blogData['image']} alt="">
    <div class="like" on:click={like}>{blogData['is_liked']?"Liked":"Like"}: {blogData['like_count']}</div>
    <div>
        <embed src={blogData['pdf']} width="1200" height="1000"
           type="application/pdf">
    </div>
{/if}


<style>
    .title{
        width:100%;
    }
    .cfp{
        position: absolute;
        margin-top: -20px;
    }
    .cfp-image{
        position: absolute;
        width: 75px;
        height: 75px;
        border-radius: 999999px;
        margin-left: -10px;
        margin-top: -20px;
        object-fit: cover;
    }
    .cfp-name{
        background: #003375;
        color: #fff;
        padding: 5px 75px 5px 150px;
        justify-self: start;
        align-items: baseline;
        border-radius: 0 999px 999px 0;
        width: 400px;
        position: absolute;
    }
    .like{
        background: #FF005C;
        padding: 10px 60px;
        font-size: 25px;
        border-radius: 999px;
        color: white;
    }
    img{
        height:800px;
        width:900px;
    }
    .row{
        display: flex;
        justify-content: center;
        gap: 20px;
        font-size: 25px;
        font-weight: normal;
    }
</style>