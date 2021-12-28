<script lang="ts">
	import { timeValue } from '../store/timeValues';

	export let timeType: string;

	let currentLocalTimeValue: number;

	timeValue.subscribe((value) => {
		currentLocalTimeValue = value[timeType];
	});

	const updateTimeValue = () => {
		timeValue.update((value) => ({
			...value,
			[timeType]: currentLocalTimeValue
		}));
	};
</script>

<main>
	<input
		type="number"
		bind:value={currentLocalTimeValue}
		on:change={updateTimeValue}
	/>
</main>

<style lang="scss">
	input[type='number'] {
		border: 2px solid #d1d1d1;
		border-radius: 1.3rem;
		height: 5rem;
		width: 5rem;
		font-size: 3rem;
		text-align: center;
		padding: 0;
		margin: 0.5rem;

		&:focus {
			outline: none;
			border: 2px solid #8a8a8a;
		}
	}
</style>
