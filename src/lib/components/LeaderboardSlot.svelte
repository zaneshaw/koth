<script>
    export let name = null;
    export let score = 0;

    export let nameClass = null;
</script>

<div class="flex mx-4">
    <span class="{nameClass} font-semibold mr-2 text-ellipsis overflow-hidden">{name}</span>
    <span class="ml-auto">{score}</span>
</div>