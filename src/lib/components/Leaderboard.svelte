<script>
    import LeaderboardSlot from "./LeaderboardSlot.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let styleClass;
    export let users;
    export let king = null;
</script>

<div class="{styleClass} flex flex-col w-60 bg-neutral-700 rounded p-4">
    <button on:click={() => dispatch("update")} class="absolute right-1 top-1 !p-0 !w-8 !h-8 bg-transparent">⟳</button>
    <h4 class="font-semibold mb-1">Leaderboard</h4>
    {#each users as user}
        <LeaderboardSlot
            nameClass={user.username == king && "text-amber-300"}
            name={user.username}
            score={user.score}
        />
    {:else}
        Empty
    {/each}
</div>
