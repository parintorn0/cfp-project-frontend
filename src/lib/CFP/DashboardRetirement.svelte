<script>
    import {goals} from "$lib/CFP/store.js";
    import {get} from "svelte/store";

    let rows = $state([])
    
    function calculate() {
        const retireGroup = get(goals)['retirement'];
        const expectedReturn = parseFloat(retireGroup['rate']);
        const inflationRate = parseFloat(retireGroup['inflation']);
        const currentAnnualExpenses = parseFloat(retireGroup['expense']);
        const currentAge = parseFloat(retireGroup['age']);
        const retirementAge = parseFloat(retireGroup['retirementage']);
        const lifeExpectancy = parseFloat(retireGroup['deadage']);
        
        const adjustedReturn = ((1 + expectedReturn) / (1 + inflationRate)) - 1
        const annualExpensesAtRetirement = currentAnnualExpenses * Math.pow((1 + inflationRate), (retirementAge - currentAge));
        function pvOfAnnuity(rate, nper, pmt) {
            console.log((1 - Math.pow(1 + rate, -nper)) / rate);
            return pmt * ((1 - Math.pow(1 + rate, -nper)) / rate);
        }

        const yearsInRetirement = lifeExpectancy - retirementAge;
        const totalRetirementFund = pvOfAnnuity(adjustedReturn, yearsInRetirement, annualExpensesAtRetirement);
        rows = []
        rows.push(`ผลตอบแทนที่ใช้คำนวณ: ${(adjustedReturn * 100).toFixed(2)}%`);
        rows.push(`รายจ่าย ณ วันเกษียณ ต่อปี: ${annualExpensesAtRetirement.toLocaleString()} บาท`);
        rows.push(`เงินที่ต้องมีทั้งหมด ณ วันเกษียณ: ${totalRetirementFund.toLocaleString()} บาท`);
    }
    goals.subscribe(()=>{
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
    
    <div class="cards">
        <div class="card">
            <div>
                อายุเกษียณ
            </div>
            <div class="card-status">
                {$goals['retirement']['retirementage']}
            </div>
        </div>
        <div class="card">
            <div>
                อายุปัจจุบัน
            </div>
            <div class="card-status">
                {$goals['retirement']['age']}
            </div>
        </div>
    </div>
</div>
<style>
    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .cards{
        width: 100%;
        font-size: 28px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
        text-align: center;
        padding: 0 25px;
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 350px;
    }
    .card-status {
        padding: 10px 20px;
        border-radius: 40px;
        background: #81ef81;
        color: black;
    }
</style>