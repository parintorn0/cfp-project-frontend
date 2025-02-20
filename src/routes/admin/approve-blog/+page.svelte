<script>
    import Title from "$lib/Title.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    const order = "date";
    const ascending = false;
    let blogs = $state([])
    const fetchData = () => {
        blogs = []
        fetch(`${import.meta.env.VITE_SERVER_HOST}/admin/getall_blog`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": localStorage.getItem('userId')
            })
        }).then((res)=> {
            res.json().then(data=> {
                data.forEach(item => {
                    fetch("http://localhost:5000/get_blog_image",{
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "blog_id": item['blog_id']
                        }),
                    }).then(res2 => {
                        res2.blob().then(blob=> {
                            blogs.push({
                                'blog_id': item['blog_id'],
                                'image': URL.createObjectURL(blob),
                                'title': item['title'],
                                'cfp_name': item['cfp_name'],
                                'date': item['date'],
                                'tags': item['tags'],
                            })
                            console.log(blogs);
                        }).catch(err=>{
                            console.log(err);
                        })
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            })
        }).catch(err=> {
            alert(err);
        })
    }
    onMount(()=>{
        fetchData()
    })
    
    const approval = (blog_id, approve) => {
        let approvalPath
        if (approve) 
            approvalPath = '/admin/approve_blog'
        else
            approvalPath = '/admin/decline_blog'
        fetch("http://localhost:5000"+approvalPath,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": localStorage.getItem('userId'),
                "blog_id": blog_id,
            })
        }).then((res)=> {
            if (res.status === 200) {
                res.json().then(data=> {
                    alert(data.message)
                    fetchData()
                }).catch(err=>{
                    console.log(err);
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    }
</script>

<Title>Approve Blog</Title>

<div class="contents">
    {#each blogs as blog}
        <div class="content">
            <div class="container" on:click={()=>{goto('/blog/'+blog['blog_id'])}}>
                <div class="container-head">
                    {blog.title}
                </div>
                <img src={blog.image} alt="" class="blog-img">
                <div class="container-head">
                    <div class="row">
                        <div>
                            โดย {blog.cfp_name}
                        </div>
                        <div>
                            {blog.date}
                        </div>
                    </div>
                    <div class="row-2">
                        <div>
                            Likes: 0
                        </div>
                        <div>
                            Tags: {blog.tags.join(", ")}
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            <div class="approval">
                <div class="approve" on:click={()=>approval(blog.blog_id, true)}>
                    Approve
                </div>
                <div class="decline" on:click={()=>approval(blog.blog_id, false)}>
                    Decline
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .approve{
        background: rgba(186, 141, 72, 0.39);
    }
    .decline{
        background: rgba(0, 51, 117, 0.39);
    }
    .approve , .decline{
        padding: 15px 30px;
        border-radius: 40px;
    }
    .approval{
        display: flex;
        justify-content: space-between;
    }
    .contents{
        display: flex;
        gap: 20px;
        flex-flow: row wrap;
        padding: 0 25px;
    }
    .content{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .blog-img{
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    .row{
        display: flex;
        justify-content: space-between;
    }
    .row-2{
        display: flex;
        gap: 20px;
        color: gray;
    }
    .container{
        width: 350px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .container-head{
        background: rgba(186, 141, 72, 0.39);
        color: black;
        padding: 10px;
    }
</style>