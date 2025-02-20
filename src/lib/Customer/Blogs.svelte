<script>
    import Title from "$lib/Title.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    
    let {initStringFind="", initOrder="date"} = $props()
    let order = $state(initOrder);
    let ascending = $state(false);
    let blogs = $state([])
    let user_type = $state(null)
    let tags = $state([])
    let stringFind=$state(initStringFind);
    onMount(()=>{
        blogs=[]
        const unFilterTags = []
        fetch(`${import.meta.env.VITE_SERVER_HOST}/getall_blog`).then((res)=> {
            res.json().then(data=> {
                data.forEach(item => {
                    fetch(`${import.meta.env.VITE_SERVER_HOST}/get_blog_image`,{
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({"blog_id": item['blog_id']}),
                    }).then(res2 => {
                        res2.blob().then(blob=> {
                            blogs.push({
                                'blog_id': item['blog_id'],
                                'image': URL.createObjectURL(blob),
                                'title': item['title'].trim().split(/\s+/).join(" "),
                                'cfp_name': item['cfp_name'].trim().split(/\s+/).join(" "),
                                'like_count': item['like_count'],
                                'date': item['date'],
                                'tags': item['tags'],
                            })
                            item['tags'].forEach(tag => {
                                unFilterTags.push(tag);
                            })
                            tags = [...new Set(unFilterTags)].map(name => ({ name: name, show: true }));
                            console.log(blogs);
                            console.log(tags);
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
    })
    const parseDate = (dateString) => {
        const parts = dateString.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]); // Note: month is 0-indexed
    }
    const sorting = () => {
        if (ascending) {
            if (order === 'date'){
                blogs = blogs.sort((a, b) => {
                    const dateA = parseDate(a.date);
                    const dateB = parseDate(b.date);
                    return dateA - dateB;
                });
            }
            else {
                blogs = blogs.sort((a, b) => {
                    if (typeof a[order] === "number")
                        return a[order] - b[order];
                    else
                        return a[order].localeCompare(b[order])
                });
            }
        }
        else {
            if (order === 'date'){
                blogs = blogs.sort((b, a) => {
                    const dateA = parseDate(a.date);
                    const dateB = parseDate(b.date);
                    return dateA - dateB;
                });
            }
            else {
                blogs = blogs.sort((b, a) => {
                    if (typeof a[order] === "number")
                        return a[order] - b[order];
                    else
                        return a[order].localeCompare(b[order])
                });
            }
        }
    }

</script>

<div class="section">
    <div class="left">
        <input type="text" placeholder="ค้นหา" bind:value={stringFind} />
        <div class="head">เรียงลำดับจาก</div>
        <form action="">
            <input type="radio" bind:group={order} id="date" name="order" value="date" on:change={sorting}>
            <label for="html">วันที่</label><br>
            <input type="radio" bind:group={order} id="likes" name="order" value="like_count" on:change={sorting}>
            <label for="css">Likes</label><br>
            <input type="radio" bind:group={order} id="cfp_name" name="order" value="cfp_name" on:change={sorting}>
            <label for="javascript">ชื่อผู้เขียน</label><br>
            <input type="radio" bind:group={order} id="title" name="order" value="title" on:change={sorting}>
            <label for="py">ชื่อบทความ</label><br>
        </form>
        <form action="">
            <input type="radio" bind:group={ascending} id="false" name="sort" value={false} on:change={sorting}>
            <label for="css">มากไปน้อย</label><br>
            <input type="radio" bind:group={ascending} id="true" name="sort" value={true} on:change={sorting}>
            <label for="html">น้อยไปมาก</label><br>
        </form>
        <div class="head">Tags</div>
        <form action="">
            {#each tags as tag, index}
                <input type="checkbox" id={tag.name} name="tag" bind:checked={tag['show']} />
                <label for="html">{tag.name}</label><br>
            {/each}
        </form>
    </div>
    <div class="right">
        <Title>
            บทความ
        </Title>
        <div class="contents">
            {#each blogs as blog}
                {#if
                    tags
                    .filter(item => blog.tags.includes(item.name))
                    .map(item => item.show)
                    .reduce((acc, showValue) => acc || showValue, false)
                }
                    {#if blog.title.includes(stringFind) || blog.cfp_name.includes(stringFind)}
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
                                        Likes: {blog.like_count}
                                    </div>
                                    <div>
                                        Tags: {blog.tags.join(", ")}
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    .contents{
        display: flex;
        gap: 20px;
        flex-flow: row wrap;
        padding: 0 25px;
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