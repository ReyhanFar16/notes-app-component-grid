class NoteForm extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._noteList = [];
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `

    `;
  }

  render() {
    this.updateStyle();
  }
}

customElements.define("note-form", NoteForm);
