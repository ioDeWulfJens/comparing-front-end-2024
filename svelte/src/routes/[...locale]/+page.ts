import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch("/tasks");
    const tasks = await res.json();
    return { tasks };
}