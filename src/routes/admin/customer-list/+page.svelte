<script>
    import Title from "$lib/Title.svelte";
    import {customerList} from "$lib/Admin/store.js";
    import {onMount} from "svelte";
    import {fetchData} from "$lib/Admin/fetchdata.js";
    onMount(()=>{
        fetchData()
    })
</script>

<Title>รายชื่อลูกค้า</Title>

<table>
    <thead>
        <tr>
            <td>ชื่อ</td>
            <td>วันที่เริ่มปรึกษา</td>
            <td>นักวางแผนที่ดูแล</td>
            <td>เบอร์โทร</td>
        </tr>
    </thead>
    <tbody>
    {#each $customerList as data}
        <tr>
            <td>{data.customer_name}</td>
            <td>{data.date}</td>
            <td>{data.cfp_name}</td>
            <td>{data.telephone}</td>
        </tr>
    {/each}
    </tbody>
</table>

<style>
    .status-container {
        display: flex;
        gap: 40px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .status {
        display: flex;
        padding: 5px 20px;
        background: lightgreen;
        border-radius: 25px;
        width: 125px;
        align-items: center;
        justify-content: center;
    }
    .edit-view{
        display: flex;
        gap: 20px;
    }
    button {
        all: unset;
    }
    svg {
        width: 20px;
        height: 20px;
    }
    .layout {
        padding: 10%;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        gap: 20px;
        overflow: scroll;
    }
    table {
        border-collapse: collapse;
        font-family: sans-serif;
        font-size: 0.8rem;
        letter-spacing: 1px;
        width: 90%;
        color: black;
        border: 1px solid black;
    }
    thead > tr > td {
        border-bottom: 1px solid black;
    }
    td{
        padding: 15px;
        text-align: center;
    }
    thead{
        background-color: rgba(229, 211, 184, 1);
        font-weight: bold;
    }
    thead > tr > td:first-child {
        width: 30%;
        text-align: left
    }
    thead > tr > td:nth-child(2) {
        width: 10%;
    }
    thead > tr > td:nth-child(3) {
        width: 30%;
    }
    thead > tr > td:nth-child(4) {
        width: 10%;
    }
    tbody > tr > td:first-child {
        text-align: left
    }
</style>