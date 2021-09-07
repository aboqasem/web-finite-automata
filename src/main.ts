import { html, render } from 'uhtml';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

render(
  app,
  html`<div class="w-screen h-screen flex items-center justify-center">
    <h1 class="text-xl md:text-4xl lg:text-6xl">Hello 👋</h1>
  </div>`,
);
