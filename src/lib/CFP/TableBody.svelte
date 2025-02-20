<script>
    export let data = []
    export let isBody=true;
</script>
{#if isBody}
    <tbody>
        <tr>
            {#each data as d}
                <td>
                    {d}
                </td>
            {/each}
        </tr>
    </tbody>
{:else}
    <thead>
        <tr>
            {#each data as d}
                <td>
                    {d}
                </td>
            {/each}
        </tr>
    </thead>
{/if}

<style>
    thead > tr > td {
        border-bottom: 1px solid black;
    }
    td{
        padding: 15px;
        text-align: center;
    }
    tbody{
        width: unset;
    }
    thead{
        background-color: rgba(229, 211, 184, 1);
        font-weight: bold;
        width: unset;
    }
    thead > tr > td:first-child, tbody > tr > td:first-child {
        text-align: left;
        width: 50px;
    }
    tr > td:nth-child(2) {
        width: 0;
    }
    tr > td:nth-child(3) {
        width: 0
    }
    tr > td:nth-child(4) {
        width: 0
    }
</style>