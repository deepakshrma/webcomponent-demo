export function register(name, clz) {
  !customElements.get(name) && customElements.define(name, clz);
}

class Component extends HTMLElement {
  static styles = undefined;
  #state = {};
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#bindState();
  }
  #bindState() {
    const that = this;
    const handler = {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        that.#render({ ...target });
        return target;
      },
    };
    this.state = new Proxy(this.#state, handler);
  }

  get props() {
    const props = this.getAttributeNames().reduce((acc, name) => {
      acc[name] = this.getAttribute(name);
      return acc;
    }, {});
    return props;
  }
  async onMount() {}
  async fetchData() {
    return {};
  }
  async connectedCallback() {
    const data = await this.fetchData();
    this.state.data = data;
  }
  async #render() {
    let view = await this.render();
    if (typeof this.constructor.styles !== "undefined") {
      const style = [].concat(this.constructor.styles).join("\n");
      view = `
        <style>${style}</style>
        ${view}
      `;
    }
    this.shadowRoot.innerHTML = view;
    // Run after render HTML
    this.onMount();
  }
  async render() {
    console.warn("Render method is not implemented");
    return "";
  }
}

export default Component;
