<script>
    import twemoji from "twemoji";
    import { onMount } from "svelte";
    import {
        auth,
        authSignIn,
        authSignOut,
    } from "./lib/services/firebase/auth";
    import {
        getUser,
        setKing,
        getKing,
        kingRef,
    } from "./lib/services/firebase/db";
    import { onAuthStateChanged } from "firebase/auth";
    import { getDoc, onSnapshot } from "firebase/firestore";
    import { DateTime } from "luxon";

    let loading = true;
    let king;
    let lastCaptureDate;
    let lastCaptureText;
    let user;
    $: signedIn = !!user;

    onMount(async () => {
        twemoji.parse(document.body);

        king = await getKing();

        setInterval(() => {
            setCapTime();
        }, 1000);
    });

    onSnapshot(kingRef, async () => {
        const kingSnap = await getDoc(kingRef);

        if (kingSnap.exists()) {
            const kingData = kingSnap.data();
            const userSnap = await getDoc(kingData.king);
            const userData = userSnap.data();

            king = userData.username;
            const sec = kingData.capturedAt.seconds;
            lastCaptureDate = DateTime.fromSeconds(sec);

            setCapTime();

            loading = false;
        } else {
            console.error("User doesn't exist!");
        }
    });

    onAuthStateChanged(auth, async (_user) => {
        user = _user ? await getUser(_user.uid) : null;
    });

    const becomeKing = async function () {
        if (signedIn && user.username != king) {
            king = await setKing(user);
        }
    };

    const setCapTime = async function () {
        lastCaptureText = lastCaptureDate.toRelative().replace(" ago", "");
    };
</script>

<main class="flex flex-col justify-between mx-auto min-h-screen text-center">
    <div class="mt-6">
        <h3>triangle100's</h3>
        <h2 class="font-semibold">king of the hill</h2>
    </div>
    <div>
        {#if !loading}
            <div class="mb-8">
                <h1>
                    <b class="text-amber-300">{king}</b> is the king
                </h1>
                <p>
                    and has been for <b>{lastCaptureText}</b>
                </p>
            </div>

            <button
                on:click={becomeKing}
                class="!shadow-[#fbbf24] hover:!text-amber-100 active:!text-amber-200"
                >👑 become the king 👑</button
            >
        {:else}
            <h1>loading...</h1>
        {/if}
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
