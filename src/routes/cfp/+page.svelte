<script>
    import Title from "$lib/Title.svelte";
    import {customerList} from "$lib/CFP/store.js";
</script>

<Title>รายชื่อลูกค้า</Title>

<table>
    <thead>
    <tr>
        <td>ชื่อ</td>
        <td>เวอร์ชั่น</td>
        <td>วันที่เริ่มปรึกษา</td>
        <td>เบอร์โทร</td>
        <td></td>
    </tr>
    </thead>
    <tbody>
    {#each $customerList as data}
        <tr>
            <td>{data.name}</td>
            <td>{data.version_num}</td>
            <td>{data.date}</td>
            <td>{data.telephone}</td>
            <td>
                <div class="status-container">
                    <div class="edit-view">
                        <button on:click={()=>{window.location.href='/cfp/assets/'+data.version_id}}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g>
                            </svg>
                        </button>
                        <button>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                            </svg>
                        </button>
                    </div>
                    <div class="status">
                        {data.status}
                    </div>
                </div>
            </td>
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
        width: 20%;
    }
    thead > tr > td:nth-child(4) {
        width: 10%;
    }
    thead > tr > td:nth-child(5) {
        width: 30%;
    }
    tbody > tr > td:first-child {
        text-align: left
    }
</style>