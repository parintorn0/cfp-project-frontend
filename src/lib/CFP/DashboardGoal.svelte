<script>
    import {goals, assets} from "$lib/CFP/store.js";
    import {get} from "svelte/store";

    let rows = $state([])
    let ratio = $state(null);
    let sufficiency = $state("");
    function getTotal(arr, key) {
        return (arr || []).reduce((sum, item) => sum + parseFloat(item[key]), 0);
    }
    function calculate() {
        
        const goalPort = get(goals)['portfolio'];
        const goal = get(goals)['goal'];
        const savingsPerYear = parseFloat(goal['cashflow']);
        const durationYears = parseFloat(goal['year']);
        const totalInvestment = goalPort.reduce((sum, asset) => sum + parseFloat(asset['amount']), 0);
        const weightedReturn = totalInvestment > 0 ? goalPort.reduce((sum, asset) => sum + (parseFloat(asset['amount']) * parseFloat(asset['growthrate'])), 0) / totalInvestment : 0;

        const totalLiquidAssets = getTotal(get(assets).filter(item => item['type'] === 'Liquid'), "amount");
        const totalInvestmentAssets = getTotal(get(assets).filter(item => item['type'] === 'Investment'), "amount");
        const totalCurrentInvestment = totalLiquidAssets + totalInvestmentAssets;
        const futureInvestmentValue = totalCurrentInvestment * Math.pow(1 + weightedReturn, durationYears);

        let requiredSavings;
        if (weightedReturn !== parseFloat(goal['growthrate'])) {
            requiredSavings = (parseFloat(goal['amount']) - futureInvestmentValue) / (
                (Math.pow(1 + weightedReturn, durationYears) - Math.pow(1 + parseFloat(goal['growthrate']), durationYears)) /
                (weightedReturn - parseFloat(goal['growthrate']))
            );
        } else {
            requiredSavings = Infinity;
        }
        requiredSavings = Math.max(requiredSavings, 0);

        sufficiency = requiredSavings > savingsPerYear ? "ไม่เพียงพอ" : "เพียงพอ";
        rows=[]
        rows.push(`ผลตอบแทนต่อปีของพอร์ตที่ลงทุนปัจจุบัน: ${(weightedReturn * 100).toFixed(2)}%`);
        rows.push(`เงินรวมปัจจุบันในการลงทุน: ${totalCurrentInvestment.toLocaleString()} บาท`);
        rows.push(`เงินรวมปัจจุบันในการลงทุนคิดเป็นค่าเงินในอนาคต: ${futureInvestmentValue.toLocaleString()} บาท`);
        rows.push(`เงินที่ต้องเก็บออมต่อปี: ${requiredSavings.toLocaleString()} บาท`);
        rows.push(`เงินที่ออมอยู่ต่อปีพอหรือไม่: ${sufficiency}`);
        ratio=totalCurrentInvestment/futureInvestmentValue
    }
    goals.subscribe(()=>{
        calculate();
    })
    assets.subscribe(()=>{
        calculate();
    })
</script>

<div class="container">
    <div>
        {#each rows as row}
            <div>
                {row}
            </div>
        {/each}
    </div>
    <div class="card">
        <div class="max">
            <div class="value" style="width: {700*ratio}px"></div>
        </div>
        <div class="card-status {sufficiency==='เพียงพอ'?'bg-green':'bg-red'}">
        {sufficiency}
        </div>
    </div>
</div>

<style>
    .card{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 20px;
        font-size: 28px;
    }
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 20px;
    }
    .max{
        display: flex;
        width: 700px;
        height: 30px;
        background: black;
        border-radius: 9999px;
        border: 2px solid black;
    }
    .value{
        display: flex;
        background: #81ef81;
        border-radius: 9999px 0 0 9999px;
        height: 100%;
    }

    .card-status {
        padding: 10px 20px;
        border-radius: 40px;
        width: 350px;
        text-align: center;
    }
    .bg-green {
        background: #81ef81;
        color: black;
    }
    .bg-red {
        background: #ef6868;
        color: white;
    }
</style>