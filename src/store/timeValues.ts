import { writable } from 'svelte/store';

export const timeValue = writable({ hours: 0, minutes: 0, seconds: 5 });
