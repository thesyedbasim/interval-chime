<script lang="ts">
	import TimeValuesContainer from './components/TimeValuesContainer.svelte';
	import { timeValue } from './store/timeValues';
	import type { TimeInterval } from './types/timeInterval';

	const bellsAudio = new Audio('bells.mp3');

	let timeInterval: TimeInterval;

	timeValue.subscribe((value) => {
		if (value.hours < 0) timeValue.set({ ...value, hours: 0 });
		if (value.minutes < 0) timeValue.set({ ...value, minutes: 0 });
		if (value.seconds < 0) timeValue.set({ ...value, seconds: 0 });

		timeInterval = value;
	});

	$: timeIntervalInMilliSeconds =
		timeInterval.hours * 60 * 60 * 1000 +
		timeInterval.minutes * 60 * 1000 +
		timeInterval.seconds * 1000;

	const handlePlayChime = () => {
		bellsAudio.play();
	};

	let timer: NodeJS.Timer;

	const startTimeInterval = () => {
		timer = setInterval(() => {
			handlePlayChime();
		}, timeIntervalInMilliSeconds);
	};

	const stopTimeInterval = () => {
		clearInterval(timer);
		timer = undefined;
	};
</script>

<main>
	<p>How often do you want to play the chime?</p>
	<TimeValuesContainer />
	{#if !timer}
		<button class="green" on:click={startTimeInterval}>Start Chime</button>
	{:else}
		<button class="red" on:click={stopTimeInterval}>Stop Chime</button>
	{/if}
</main>

<style lang="scss">
	main {
		width: 65%;
		margin-left: auto;
		margin-right: auto;
		height: 100vh;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, max-content);
		justify-items: center;
		align-content: center;
		row-gap: 1.5rem;

		font-size: 2rem;

		@media screen and (max-width: 375px) {
			width: 90%;
		}
	}

	p {
		font-size: 1.5rem;
		text-align: center;
	}

	button {
		padding: 1.3rem 2.3rem;
		border-radius: 1rem;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;

		background-color: var(--bg-color);
		color: var(--color);

		&.green {
			--bg-color: #3cb043;
			--color: white;
		}

		&.red {
			--bg-color: tomato;
			--color: white;
		}
	}
</style>
