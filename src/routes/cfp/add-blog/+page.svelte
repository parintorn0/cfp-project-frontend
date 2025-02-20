<script>
    import {onMount} from "svelte";
    import Button from "$lib/Button.svelte";

    let userType = $state(null)

    onMount(()=>{
        userType = localStorage.getItem("userType")
    })
    let image=$state(null);
    let pdf=$state(null);
    let blog_title=$state("");
    let tags=$state(['', '', '', '', '']);
    
    const upload = () => {
        const formData=new FormData()
        formData.append("title", blog_title)
        formData.append("image", image[0])
        formData.append("pdf", pdf[0])
        formData.append("user_id", localStorage.getItem("userId"))
        formData.append("tag1", tags[0])
        formData.append("tag2", tags[1])
        formData.append("tag3", tags[2])
        formData.append("tag4", tags[3])
        formData.append("tag5", tags[4])
        fetch('http://localhost:5000/upload_blog', {
            method: 'POST',
            body: formData,
        }).then((res)=>{
            res.json().then(data=>{
                alert(data.message)
            }).catch(err=>{
                alert(err)
            })
        }).catch(err=>{
            alert(err)
        })
    }
</script>
<div class="container">
    <div class="row">
        ชื่อบทความ
        <input type="text" bind:value={blog_title}>
    </div>
    <div class="row">
        อัพโหลดรูปภาพ
        <input type="file" bind:files={image}>
    </div>
    <div class="row">
        อัพโหลดบทความ (pdf)
        <input type="file" bind:files={pdf}>
    </div>
    <div class="row">
        แท็ก 1
        <input type="text" bind:value={tags[0]}>
    </div>
    <div class="row">
        แท็ก 2
        <input type="text" bind:value={tags[1]}>
    </div>
    <div class="row">
        แท็ก 3
        <input type="text" bind:value={tags[2]}>
    </div>
    <div class="row">
        แท็ก 4
        <input type="text" bind:value={tags[3]}>
    </div>
    <div class="row">
        แท็ก 5
        <input type="text" bind:value={tags[4]}>
    </div>
    <div class="row">
        <div class="btn">
            <Button onClick={upload}>อัพโหลด</Button>
        </div>
    </div>

</div>
<style>
    .btn{
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .container {
        display: flex;
        flex-direction: column;
        width: 500px;
    }
    .row{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    input[type='text'] {
        height: 40px;
    }
</style>