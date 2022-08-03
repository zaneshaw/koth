<script>
    import twemoji from "twemoji";
    import { onMount } from "svelte";
    import {
        auth,
        authSignIn,
        authSignOut,
    } from "./lib/services/firebase/auth";
    import { becomeKing, getUser } from "./lib/services/firebase/db";
    import { onAuthStateChanged } from "firebase/auth";

    let king = "squidee_";
    let kingTime = "4 hours";
    let user;
    $: signedIn = !!user;

    onMount(() => {
        twemoji.parse(document.body);
    });

    onAuthStateChanged(auth, async (_user) => {
        user = _user ? await getUser(_user.uid) : null;
    });
</script>

<main class="flex flex-col justify-between mx-auto min-h-screen text-center">
    <div class="mt-6">
        <h3>triangle100's</h3>
        <h2 class="font-semibold">king of the hill</h2>
    </div>
    <div>
        <div class="mb-8">
            <h1>
                <b>{king}</b> is the current king
            </h1>
            <p>
                and has been for <b>{kingTime}</b>
            </p>
        </div>

        <button on:click={becomeKing} class="!shadow-[#fbbf24]">👑 become the king 👑</button>
    </div>
    <div class="mb-6">
        {#if signedIn}
            <p>signed in as <b>{user.username}</b></p>
            <button on:click={authSignOut} class="mb-5">sign out</button>
        {:else}
            <button on:click={authSignIn} class="mb-5"
                >sign in with <b>github</b></button
            >
        {/if}

        <p>
            check out the <a
                href="https://github.com/squidee100/koth"
                target="_blank">source</a
            > for this project
        </p>
    </div>
</main>
