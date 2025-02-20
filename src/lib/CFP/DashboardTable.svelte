<script>
    import TableBody from "$lib/CFP/TableBody.svelte";
    import {assets, expenses, liabilities, incomes} from "$lib/CFP/store.js";
    import {get} from "svelte/store";
    let rows = $state([]);
    let conditions=$state([]);
    function getTotal(arr, key) {
        return (arr || []).reduce((sum, item) => sum + parseFloat(item[key]), 0);
    }
    const calculate = () => {
        
        const totalLiquidAssets = getTotal(get(assets).filter(item => item['type'] === 'Liquid'), "amount");
        const totalShortTermLiabilities = getTotal(get(liabilities).filter(l => l.term === "Short"), "amount");
        const essentialCashflow = getTotal(get(expenses), "amount") / 12;
        const totalInvestmentAssets = getTotal(get(assets).filter(item => item['type'] === 'Investment'), "amount");
        const totalAssets = getTotal(get(assets), "amount");
        const totalLiabilities = getTotal(get(liabilities), "amount");
        const totalIncome = getTotal(get(incomes), "amount");
        const totalExpenses = getTotal(get(expenses), "amount");
        const netWorth = totalAssets - totalLiabilities;
        const savings = totalIncome - totalExpenses;
        const assetIncome = getTotal(get(incomes).filter(item => item['type'] === 'Investment'), "amount");
        const less = "น้อยกว่าเกณฑ์"
        const more = "มากกว่าเกณฑ์"
        const pass = "ผ่าน"
        conditions = [
            {
                "name": "สภาพคล่อง",
                "value": totalShortTermLiabilities === 0 ? "ไม่มีหนี้สินระยะสั้น ✅" : (totalLiquidAssets / totalShortTermLiabilities).toFixed(2),
                "valueStatus": totalShortTermLiabilities === 0 || (totalLiquidAssets / totalShortTermLiabilities)>=1?"ผ่าน" : "ไม่ผ่าน"
            },
            {
                "name": "สภาพคล่องพื้นฐาน",
                "value": (essentialCashflow > 0 ? totalLiquidAssets / essentialCashflow : 0).toFixed(2),
                "valueStatus": (essentialCashflow > 0 ? totalLiquidAssets / essentialCashflow : 0)<3?less:pass
            },
            {
                "name": "สภาพคล่องต่อความมั่งคั่งสุทธิ",
                "value": (netWorth > 0 ? (totalLiquidAssets / netWorth * 100).toFixed(2) + "%" : "0%"),
                "valueStatus": (netWorth > 0 ? (totalLiquidAssets / netWorth * 100) : 0)>=0.15?pass:less,
            },
            {
                "name": "หนี้สินต่อสินทรัพย์",
                "value": (totalAssets > 0 ? (totalLiabilities / totalAssets * 100).toFixed(2) + "%" : "0%"),
                "valueStatus": (totalAssets > 0 ? (totalLiabilities / totalAssets * 100) : 0)<50?pass:more
            },
            {
                "name": "ความมั่งคั่ง",
                "value": (totalAssets > 0 ? (netWorth / totalAssets * 100).toFixed(2) + "%" : "0%"),
                "valueStatus": (totalAssets > 0 ? (netWorth / totalAssets * 100) : 0)>=50?pass:less
            },
            {
                "name": "อัตราส่วนความอยู่รอด",
                "value": (totalExpenses > 0 ? (totalIncome / totalExpenses).toFixed(2) : "∞"),
                "valueStatus": (totalExpenses > 0 ? ((totalIncome / totalExpenses)>=1?pass:less) : pass)
            },
            {
                "name": "อัตราส่วนความมั่งคั่ง",
                "value": (totalExpenses > 0 ? (assetIncome / totalExpenses).toFixed(2) : "∞"),
                "valueStatus": totalExpenses > 0 ? (assetIncome / totalExpenses)>=1?pass:less :pass
            },
            {
                "name": "การชำระคืนหนี้ทั้งหมด",
                "value": (totalLiabilities > 0 ? (netWorth / totalLiabilities).toFixed(2) : "∞"),
                "valueStatus": totalLiabilities > 0 ? (netWorth / totalLiabilities)>=0.5?pass:less : pass
            },
            {
                "name": "การออม",
                "value": (totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(2) + "%" : "0%"),
                "valueStatus": totalIncome > 0 ? ((savings / totalIncome) * 100)>=10?pass:less: less
            },
            {
                "name": "การลงทุน",
                "value": (netWorth > 0 ? (totalInvestmentAssets / netWorth * 100).toFixed(2) + "%" : "0%"),
                "valueStatus": netWorth > 0 ? (totalInvestmentAssets / netWorth * 100)>=50?pass:less : less
            },
        ]
        rows= [
            [conditions[0]['name'], "สินทรัพย์สภาพคล่อง / หนี้สินระยะสั้น", "> 1 เท่า", conditions[0]['value']],
            [conditions[1]['name'], "สินทรัพย์สภาพคล่อง / กระแสเงินสดจำเป็นต่อเดือน", "3 - 6 เดือน", conditions[1]['value']],
            [conditions[2]['name'], "สินทรัพย์สภาพคล่อง / ความมั่งคั่งสุทธิ", "> 0.15", conditions[2]['value']],
            [conditions[3]['name'], "หนี้สินรวม / สินทรัพย์รวม", "< 50%", conditions[3]['value']],
            [conditions[4]['name'], "ความมั่งคั่งสุทธิ / สินทรัพย์รวม", "> 50%", conditions[4]['value']],
            [conditions[5]['name'], "(รายได้จากการทำงาน + รายได้จากสินทรัพย์) / รายจ่าย", "> 1", conditions[5]['value']],
            [conditions[6]['name'], "รายได้จากสินทรัพย์ / รายจ่าย", "> 1", conditions[6]['value']],
            [conditions[7]['name'], "ความมั่งคั่งสุทธิ / หนี้สินรวม", "> 0.50", conditions[7]['value']],
            [conditions[8]['name'], "(รายได้รวม - รายจ่าย) / รายได้รวม", "> 10%", conditions[8]['value']],
            [conditions[9]['name'], "สินทรัพย์ลงทุน / ความมั่งคั่งสุทธิ", "> 50%", conditions[9]['value']],
        ]
    }

    assets.subscribe(value=>{
        calculate()
    })
    liabilities.subscribe(value=>{
        calculate()
    })
    expenses.subscribe(value=>{
        calculate()
    })
    incomes.subscribe(value=>{
        calculate()
    })
    
</script>

<div class="table-container">
    <table>
        <TableBody isBody={false} data={["อัตราส่วน", "วิธีการคำนวณ", "มาตรฐาน", "ผลลัพธ์"]}/>
        {#each rows as row}
            <TableBody data={row}/>
        {/each}
    </table>
</div>
<div class="conditions">
    {#each conditions as condition}
        <div class="condition">
            <div>
                {condition['name']}
            </div>
            <div class="condition-status {condition['valueStatus']==='ผ่าน'?'bg-green':'bg-red'}">
                {condition['valueStatus']}
            </div>
        </div>
    {/each}
</div>

<style>
    table{
        width: unset;
    }
    .table-container{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .conditions{
        font-size: 28px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
        text-align: center;
        padding: 0 25px;
    }
    .condition {
        display: flex;
        flex-direction: column;
        width: 350px;
    }
    .condition-status {
        padding: 10px 20px;
        border-radius: 40px;
    }
    .bg-green {
        background: #81ef81;
        color: black;
    }
    .bg-red {
        background: #ef6868;
        color: white;
    }
    table {
        border-collapse: collapse;
        font-family: sans-serif;
        letter-spacing: 1px;
        width: 1400px;
        color: black;
        border: 1px solid black;
        font-size: 16px;
    }
</style>