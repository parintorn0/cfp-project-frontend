<script>
    import TopLeftImage from "$lib/TopLeftImage.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/state";
    let user_type = $state(null)
    let cfpInfo = $state(null)
    const fetchData = ()=>{
        fetch(`${import.meta.env.VITE_SERVER_HOST}/get_cfp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cfp_id": page.params.cfp_id
            })
        }).then(res=>{
            res.json().then(data=>{
                fetch(`${import.meta.env.VITE_SERVER_HOST}/get_cfp_image`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "cfp_id": page.params.cfp_id
                    })
                }).then(res2=>{
                    res2.blob().then(blob=>{
                        cfpInfo = {
                            "cfp_image": URL.createObjectURL(blob),
                            "data": {
                                "cfp_certificates": data['cfp_certificates'],
                                "cfp_educations": data['cfp_educations'],
                                "cfp_email": data['cfp_email'],
                                "cfp_experiences": data['cfp_experiences'],
                                "cfp_experts": data['cfp_experts'],
                                "cfp_fees": data['cfp_fees'],
                                "cfp_name": data['cfp_name'].trim().split(/\s+/).join(" "),
                                "cfp_reason": data['cfp_reason'],
                                "cfp_telephone": data['cfp_telephone'],
                                "cfp_trainings": data['cfp_trainings'],
                            }
                        }
                        console.log(cfpInfo)
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            }).catch(error=>{
                console.log(error);
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    onMount(()=>{
        user_type = localStorage.getItem("userType");
        if(!user_type){
            goto("/");
        }
        fetchData()
    })
    const addRelation = ()=>{
        fetch(`${import.meta.env.VITE_SERVER_HOST}/select_cfp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cfp_id": page.params.cfp_id,
                "user_id": localStorage.getItem("userId"),
            })
        }).then(res=>{
            if (res.status === 200){
                res.json().then(data=>{
                    alert(data.message)
                }).catch(err=>{
                    alert(err)
                })
            }
        }).catch(err=>{
            alert(err)
        })
    }
</script>

{#if user_type==='C' && cfpInfo}
    <TopLeftImage onClick={()=>goto("/home")}/>
    <div class="title-container">
        <div class="title">
            <div class="title-section title-section-left">
                {cfpInfo['data']['cfp_name']}
            </div>
            <div class="title-section title-section-right">
                <div class="title-section-right-title">
                    ติดต่อ
                </div>
                <div>
                    โทรศัพย์: {cfpInfo['data']['cfp_telephone']}
                </div>
                <div>
                    อีเมล์: {cfpInfo['data']['cfp_email']}
                </div>
            </div>
        </div>
        <img src={cfpInfo['cfp_image']} alt="">
    </div>
    <div class="contents">
        <div class="section">
            <div class="block">
                <div class="bold">คุณวุฒิวิชาชีพ/ใบอนุญาต</div>
                {#each cfpInfo['data']['cfp_certificates'] as certificate}
                    <div>
                        - {certificate}
                    </div>
                {/each}
            </div>
            <hr>
            <div class="block">
                <div class="bold">ประวัติการศึกษา</div>
                {#each cfpInfo['data']['cfp_educations'] as education}
                    <div>
                        - {education}
                    </div>
                {/each}
            </div>
            <hr>
            <div class="block">
                <div class="bold">ประวัติการอบรมที่สำคัญ</div>
                {#each cfpInfo['data']['cfp_trainings'] as training}
                    <div>
                        - {training}
                    </div>
                {/each}
            </div>
            <hr>
            <div class="block">
                <div class="bold">ประสบการณ์การทำงาน/ผลงานที่สำคัญ</div>
                {#each cfpInfo['data']['cfp_experiences'] as experience}
                    <div>
                        - {experience}
                    </div>
                {/each}
            </div>
        </div>
        <div class="section">
            <div class="block">
                <div class="bold">ความเชี่ยวชาญพิเศษ</div>
                {#each cfpInfo['data']['cfp_experts'] as expert}
                    <div>
                        - {expert}
                    </div>
                {/each}
            </div>
            <hr>
            <div class="block">
                <div class="bold">การคิดค่าบริการ</div>
                {#each cfpInfo['data']['cfp_fees'] as fee}
                    <div>
                        - {fee}
                    </div>
                {/each}
            </div>
            <hr>
            <div class="block">
                <div class="bold">
                    เหตุผลที่มาเป็นนักวางแผนการเงิน CFP
                </div>
                <div>
                    {cfpInfo['data']['cfp_reason']}
                </div>
            </div>
        </div>
    </div>
    <div class="btns">
        <div class="btn" on:click={addRelation}>
            เลือก <br> นักวางแผน
        </div>
        <div class="btn" on:click={()=>{goto("/blogs/"+cfpInfo['data']['cfp_name']) }}>
            Blogs
        </div>
    </div>
{:else}
    <div>
        <div>Unauthorized</div>
        <div>Redirect to login page...</div>
    </div>
{/if}

<style>
    .btns{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        padding: 50px;
        text-align: center;
        gap: 20px;
    }
    .btn{
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        background: #003375;
        color: #fff;
        font-size: 20px;
        border-radius: 99999px;
    }
    .bold{
        font-weight: bold;
    }
    .section{
        display: flex;
        flex-direction: column;
        width: 500px;
        text-align: center;
        gap: 30px;
    }
    .contents{
        color: black;
        padding: 100px;
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    img{
        position: absolute;
        width: 250px;
        height: 250px;
        top: 150px;
        right: calc(85% - 100px);
        border-radius: 99999px;
        object-fit: cover;
    }
    .title-container{
        margin-top: 20px;
        color: black;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .title-section{
        display: flex;
        flex-direction: column;
    }
    .title-section-left{
        font-size: 48px;
    }
    .title-section-right{
        font-size: 24px;
    }
    .title-section-right-title{
        font-size: 28px;
    }
    .title{
        padding: 25px 200px;
        width: 85%;
        background: rgba(209, 146, 49, 0.68);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 300px;
    }
</style>