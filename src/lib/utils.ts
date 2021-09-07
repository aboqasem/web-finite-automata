export const element = <T = HTMLElement>(id: string) => document.getElementById(id) as T | null;
