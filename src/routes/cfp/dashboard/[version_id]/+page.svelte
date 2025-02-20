<script>
    import {onMount} from "svelte";
    import {fetchData} from "$lib/CFP/fetchdata.js";
    import {assets, expenses, incomes, liabilities} from "$lib/CFP/store.js";
    import Chart, {registerables} from 'chart.js/auto';
    let assetInstance;
    let liabilityInstance;
    let incomeInstance;
    let expenseInstance;
    onMount(()=>{
        fetchData();
        Chart.register(...registerables); // Register all Chart.js plugins
        const assetCtx = document.getElementById('assetCanvas').getContext('2d');
        assetInstance = new Chart(assetCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: 'มูลค่าปัจจุบัน',
                    data: [],
                }],
            }
        });
        const libilitiesCtx = document.getElementById('liabilitiesCanvas').getContext('2d');
        liabilityInstance = new Chart(libilitiesCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: 'เงินต้น',
                    data: [],
                }],
            }
        });
        const incomesCtx = document.getElementById('incomeCanvas').getContext('2d');
        incomeInstance = new Chart(incomesCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: 'เงินต้น',
                    data: [],
                }],
            }
        });
        const expensesCtx = document.getElementById('expenseCanvas').getContext('2d');
        expenseInstance = new Chart(expensesCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: 'เงินต้น',
                    data: [],
                }],
            }
        });
    })
    assets.subscribe((value)=>{
        const assetNames=value.map(asset=>{
            return asset.name;
        })
        const assetAmounts=value.map(asset=>{
            return asset.amount;
        })
        if (value.length>0)
            updateChart(assetInstance, assetNames, assetAmounts);
    })
    liabilities.subscribe((value)=>{
        const liabilitiesNames=value.map(liability=>{
            return liability.name;
        })
        const liabilitiesAmounts=value.map(liability=>{
            return liability.amount;
        })
        if (value.length>0)
            updateChart(liabilityInstance, liabilitiesNames, liabilitiesAmounts);
    })
    incomes.subscribe((value)=>{
        const incomesNames=value.map(income=>{
            return income.name;
        });
        const incomesAmounts=value.map(income=>{
            return income.amount;
        });
        if (value.length>0)
            updateChart(incomeInstance, incomesNames, incomesAmounts);
    })
    expenses.subscribe((value)=>{
        const expensesNames=value.map(expense=>{
            return expense.name;
        });
        const expensesAmounts=value.map(expense=>{
            return expense.amount;
        });
        if (value.length>0)
            updateChart(expenseInstance, expensesNames, expensesAmounts);
    })
    function updateChart(chartInstance, labels, data) {
        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = data;
            chartInstance.data.datasets[0].backgroundColor=generateColors(data.length)
            chartInstance.update();
        }
    }
    function generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * (360 / count)) % 360;
            colors.push(`hsla(${hue}, 70%, 50%, 0.7)`);
        }
        return colors;
    }
    
</script>

<div class="layout">
    <div class="title">
        ภาพรวม
    </div>
    <div class="contents">
        <div class="content {$assets.length>0?'':'hidden'}">
            <div>
                <canvas id="assetCanvas"></canvas>
            </div>
            <div class="header">
                ทรัพสินย์
            </div>
        </div>
        <div class="content {$liabilities.length>0?'':'hidden'}">
            <div>
                <canvas id="liabilitiesCanvas"></canvas>
            </div>
            <div class="header">
                หนี้สิน
            </div>
        </div>
        <div class="content {$incomes.length>0?'':'hidden'}">
            <div>
                <canvas id="incomeCanvas"></canvas>
            </div>
            <div class="header">
                รายได้
            </div>
        </div>
        <div class="content {$expenses.length>0?'':'hidden'}">
            <div>
                <canvas id="expenseCanvas"></canvas>
            </div>
            <div class="header">
                รายจ่าย
            </div>
        </div>
    </div>
    <div class="title">
        สุขภาพการเงิน
    </div>
    <div class="title">
        วางแผนเกษียณ
    </div>
    <div class="title">
        การวางแผนเป้าหมาย
    </div>
</div>

<style>
    .hidden{
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
    .layout{
        padding: 0 50px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 50px;
    }
    .title{
        width: 400px;
        text-align: center;
        font-size: 36px;
        background: rgba(209, 146, 49, 0.68);
        padding: 5px 0;
        border-radius: 50px;
    }
    .contents{
        padding: 0 50px;
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 20px;
    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 32px;
        gap: 20px;
    }
</style>