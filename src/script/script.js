import "./data-notes.js";
import "./note-form.js";

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

        :host {
        display: block;
        background-color: #252525;
        color: white;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;       
        }

        h2 {
            margin: 0;
            padding: 60px 16px;
            font-size: 1.5em;
            opacity: 70%;
        }

        .container-notes {
            display: flex;
            flex-direction: column;
            gap: 50px;
            justify-content:center;
        }

        .notes {
            display: flex;
            flex-direction: column;
            gap: 10px
        }

        .notes i {
            font-size: 20px;
        }
    `;
  }

  render() {
    this.updateStyle();

    const template = `
        ${this._style.outerHTML}

        <h2>Notes App</h2>
        <div class="container-notes">
            <div class="add-note notes">
                <i class="fa-solid fa-pen-to-square" style="color: #ffffff; opacity:70%;"></i>
                <span style="color: #ffffff; opacity:70%;">Add Note</span>
            </div>
            <div class="notes">
                <i class="fa-solid fa-book" style="color: #ffffff; opacity: 70%"></i>
                <span style="color: #ffffff; opacity:70%;">My Notes</span>
            </div>
        </div>
    `;

    this._shadowRoot.innerHTML = template;
  }
}

customElements.define("app-bar", AppBar);
