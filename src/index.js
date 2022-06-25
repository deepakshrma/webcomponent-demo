class App extends HTMLElement {
  async connectedCallback() {
    this.attachShadow({ mode: "open" });
    const name = this.getAttribute("name") ?? "John Doe";
    this.shadowRoot.innerHTML = `
      <style>.title { text-align: center; } </style>
      <h1 class="title">Welcome ${name}</h1>
    `;
  }
}

customElements.define("dv-app", App);
