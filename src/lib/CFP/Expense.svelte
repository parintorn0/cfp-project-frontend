<script>
    import Button from "$lib/Button.svelte";
    import {onMount} from "svelte";
    import { assets, liabilities, incomes, expenses, goals } from "$lib/CFP/store.js";

    onMount(()=>{

    })
    function addExpense(){
        expenses.update(value=>{
            value.push({
                'name': '',
                'amount': '',
                'growthrate': '',
            })
            return value;
        })
    }
    function removeExpense(index){
        expenses.update(value=>{
            value.splice(index, 1);
            return value;
        })
    }
</script>

<div class="liability-type">
    รายจ่าย
    <div class="btn">
        <Button style="display: flex; align-items: center; font-size: 16px;" color={{"r": 209, "g": 146, "b": 49, "a": 0.68}}
                onClick={addExpense}
        >
            <svg fill="#000000" viewBox="-7 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus</title> <path d="M17.040 15.16h-7.28v-7.24c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v7.28h-7.24c-0.48-0.040-0.84 0.32-0.84 0.8s0.36 0.84 0.84 0.84h7.28v7.28c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-7.32h7.28c0.48 0 0.84-0.36 0.84-0.84s-0.44-0.8-0.88-0.8z"></path> </g>
            </svg>
            เพิ่มสินทรัพย์
        </Button>
    </div>
</div>

{#each $expenses as expense, index}
    <div class="container">
        <div>
            <div class="input-col">
                <div class="input-row">
                    <div class="input-field">
                        ชื่อ <input type="text" bind:value={expense.name}>
                    </div>
                </div>
                <div class="input-row">
                    <div class="input-field">
                        รายจ่ายต่อปี
                        <input type="text" bind:value={expense.amount}>
                    </div>
                    <div class="red">ใส่เป็นตัวเลข</div>
                </div>
                <div class="input-row">
                    <div class="input-row">
                        <div class="input-field">
                            อัตราการเติบโตต่อปี <input type="text" bind:value={expense.growthrate}>
                        </div>
                        <div class="red">ใส่เป็นตัวเลข</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <div class="btn">
                <Button style="display: flex; align-items: center; font-size: 16px;" color={{"r": 255, "g": 0, "b": 0, "a": 0.3}} onClick={()=>removeExpense(index)}>
                    <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"></path> </g></svg>
                    ลบสินทรัพย์
                </Button>
            </div>
        </div>
    </div>
{/each}


<style>
    .container{
        width: 100%;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
    .liability-type{
        display: flex;
        flex-direction: row;
        font-size: 36px;
        justify-content: space-between;
        width: 100%;
        padding: 0 200px
    }
    .input-col{
        display: flex;
        gap: 30px;
        align-items: flex-start;
    }
    .input-row {
        display: flex;
        flex-direction: column;
        gap: 5px
    }
    .input-field{
        display: flex;
        flex-direction: column;
    }
    .red{
        color: red;
    }
    .btn{
        margin-top: 20px;
    }
    .btn-container{
        display: flex;
        align-items: flex-end
    }
    svg {
        width: 20px;
        height: 20px;
    }
</style>