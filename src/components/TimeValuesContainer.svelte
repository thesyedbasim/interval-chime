<script lang="ts">
	import TimeSetter from './TimeValue.svelte';
</script>

<main>
	<section class="time-values">
		<TimeSetter timeType="hours" />:
		<TimeSetter timeType="minutes" />:
		<TimeSetter timeType="seconds" />
	</section>
</main>

<style lang="scss">
	.time-values {
		display: flex;
		align-items: center;
	}
</style>
