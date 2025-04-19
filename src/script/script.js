import "./data-notes.js";
import "./note-form.js";
import "./card-list.js";
import "./card-item.js";

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("tab-changed", (event) => {
    const tabName = event.detail.tab;
    const noteForm = document.querySelector("note-form");
    const cardList = document.querySelector("card-list");

    if (tabName === "add-note") {
      noteForm.style.display = "block";
      noteForm.style.gridArea = "note-form";
      cardList.style.display = "none";
    } else if (tabName === "my-notes") {
      noteForm.style.display = "none";
      cardList.style.display = "grid";
      cardList.style.margin = "80px";
      cardList.style.gridArea = "note-form";
    }
  });
});

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._style = document.createElement("style");
    this.activeTab = "add-note";
  }

  connectedCallback() {
    this.render();
    this._attachEventListeners();
  }

  _attachEventListeners() {
    const addNoteBtn = this._shadowRoot.querySelector(".add-note");
    const myNotesBtn = this._shadowRoot.querySelector(".my-notes");

    addNoteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.activeTab = "add-note";
      this._updateTab();
      this._notifyTabChange("add-note");
    });

    myNotesBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.activeTab = "my-notes";
      this._updateTab();
      this._notifyTabChange("my-notes");
    });
  }

  _updateTab() {
    const tabs = this._shadowRoot.querySelectorAll(".nav-item");
    tabs.forEach((item) => {
      if (item.classList.contains(this.activeTab)) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  _notifyTabChange(tabName) {
    const event = new CustomEvent("tab-changed", {
      detail: { tab: tabName },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  updateStyle() {
    this._style.textContent = `
        @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

        :host {
        display: block;
        background-color: #252525;
        color: white;
        text-align: center;
        width: 100%;
        height: 100%;     
        grid-area: app-bar;  
        }

        h2 {
            margin: 0;
            padding: 60px 16px;
            font-size: 1.5em;
            opacity: 0.7;
        }

        .nav-container {
            display: flex;
            flex-direction: column;
            gap: 50px;
            padding-top: 30px;
            justify-content:center;
        }

        .nav-item {
            opacity: 0.7;
            width: 70%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 12px 0;
            margin: 0 auto;
            border-radius: 10px;
            transistion: all 0.3s ease;
        }

        .nav-item:hover{
            cursor: pointer;
            opacity: 1;
            background-color: rgba(255,255,255,0.1);
        }

        .nav-item i {
            font-size: 20px;
        }

        
    `;
  }

  render() {
    this.updateStyle();

    const template = `
        ${this._style.outerHTML}

        <h2>Notes App</h2>
        <div class="nav-container">
            <div class="nav-item add-note">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Add Note</span>
            </div>
            <div class="nav-item my-notes">
                <i class="fa-solid fa-book"></i>
                <span>My Notes</span>
            </div>
        </div>
    `;

    this._shadowRoot.innerHTML = template;
  }
}

customElements.define("app-bar", AppBar);
