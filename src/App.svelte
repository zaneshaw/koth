<script>
    import twemoji from "twemoji";
    import { onMount } from "svelte";
    
    let king = "squidee_";
    let kingTime = "4 hours";

    const beKing = function() {
        console.log("asdasd");
    }

    onMount(() => {
        twemoji.parse(document.body);
    });
</script>

<main class="flex flex-col justify-between mx-auto min-h-screen text-center">
    <div class="mt-6">
        <h3>triangle100's</h3>
        <h2 class="font-semibold">king of the hill</h2>
    </div>
    <div>
        <h1><span class="font-semibold">{king}</span> is the current king</h1>
        <p>and has been for <span class="font-semibold">{kingTime}</span></p>

        <button on:click={beKing} class="my-8">👑 become the king 👑</button>
    </div>
    <div>
        <p>
            check out the <a
                href="https://github.com/sveltejs/kit#readme"
                target="_blank">source</a
            > for this project
        </p>
    </div>
</main>
