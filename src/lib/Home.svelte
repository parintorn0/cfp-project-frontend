<script>
    import Button from "$lib/Button.svelte";
    export let haveBtn = false
</script>

<div class="container">
    <div class="welcome">ยินดีต้อนรับสู่แพลตฟอร์มวางแผนการเงิน</div>
    ที่นี่ เราเชื่อว่าการวางแผนการเงินที่ดีคือกุญแจสำคัญสู่ความมั่นคงและอิสรภาพทางการเงินในทุกช่วงชีวิตของคุณ สำรวจบทความและคำแนะนำจากผู้เชี่ยวชาญทางการเงินที่เข้าใจในเป้าหมายและความต้องการเฉพาะตัวของคุณ พร้อมทั้งสามารถติดต่อพูดคุยกับนักการเงินมืออาชีพได้โดยตรง เพื่อช่วยคุณวางแผนการเงินที่ตอบโจทย์ ทั้งในเรื่องการออม การลงทุน หรือการวางแผนเพื่อวัยเกษียณ เริ่มต้นก้าวแรกสู่อนาคตทางการเงินที่มั่นคงและมั่งคั่งไปพร้อมกับเรา
    {#if haveBtn}
        <div class="button-container">
            <Button>
                อ่านบทความ
            </Button>
            <Button>
                ค้นหานักวางแผน
            </Button>
        </div>
    {/if}
</div>

<style>

    .button-container{
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 50px;
    }
    .container {
        width: 800px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
    .welcome {
        font-size: 30px;
    }
</style>