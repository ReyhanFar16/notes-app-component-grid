class NoteForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._noteList = [];
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
    this._attachEventListeners();
  }

  _attachEventListeners() {
    const form = this._shadowRoot.querySelector("form");
    const titleInput = form.elements.title;
    const bodyInput = form.elements.body;

    titleInput.addEventListener("input", this._validationInput);
    titleInput.addEventListener("blur", this._validationInput);

    bodyInput.addEventListener("input", this._validationInput);
    bodyInput.addEventListener("blur", this._validationInput);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const isValid = form.checkValidity();

      if (isValid) {
        const newNote = {
          id: +new Date(),
          title: titleInput.value,
          body: bodyInput.value,
          createdAt: new Date().toISOString(),
        };

        console.log(`Form Submitted : ${newNote.createdAt}`);
        form.reset();
      } else {
        Array.from(form.elements).forEach((element) => {
          if (element.tagName !== "BUTTON" && !element.validity.valid) {
            element.reportValidity();
          }
        });
      }
    });
  }

  _validationInput(event) {
    const input = event.target;
    const inputName = input.id;
    input.setCustomValidity("");

    if (!input.value.trim()) {
      input.setCustomValidity("You must fill this field.");
      input.reportValidity();
    } else if (inputName === "title" && input.value.length < 5) {
      input.setCustomValidity("Title must be at least 5 characters.");
      input.reportValidity();
    } else if (inputName === "body" && input.value.length < 10) {
      input.setCustomValidity("Body must be at least 10 characters.");
      input.reportValidity();
    }

    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector(".error-message");

    if (input.validity.valid) {
      formGroup.classList.remove("invalid");
      if (errorElement) errorElement.textContent = "";
    } else {
      formGroup.classList.add("invalid");
      if (errorElement) errorElement.textContent = input.validationMessage;
      input.reportValidity();
    }
  }

  updateStyle() {
    this._style.textContent = `
      :host {
        grid-area: note-form;
        margin-left: 80px;
        padding: 20px;
        display: block;
      }

      .note-form {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        max-width: 800px;
        margin: 70px auto;
      }

      h2 {
        margin-bottom: 20px;
        color: #333;
        text-align: center;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label{
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        font-size: 1em;
      }

      input, textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        font-family: inherit;
      }

      textarea {
        height: 150px;
        resize: vertical;
      }

      .error-message {
        color: #dc3545;
        font-size: 0.8em;
        margin-top: 5px;
      }

      button {
        background-color: #252525;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        width: 100%;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #333;
      }

      @media (max-width: 768px) {
        :host {
          margin-left: 60px;
          padding: 10px;
        }
        
        .note-form {
          padding: 15px;
        }
      }

      @media (max-width: 480px) {
      :host {
        margin-left: 0;
        padding: 10px 5px;
      }
      
      .note-form {
        padding: 12px;
        margin: 20px auto;
        max-width: 95%;
      }
      
      h2 {
        font-size: 1.2rem;
        margin-bottom: 15px;
      }
      
      .form-group {
        margin-bottom: 12px;
      }
      
      .form-group label {
        font-size: 0.9em;
        margin-bottom: 5px;
      }
      
      input, textarea {
        padding: 8px;
        font-size: 14px;
      }
      
      textarea {
        height: 120px;
      }
      
      button {
        padding: 10px;
        font-size: 14px;
      }
    }
    `;
  }

  render() {
    this.updateStyle();

    const template = `
        ${this._style.outerHTML}
        
        <form class="note-form">
            <h2>Add Note</h2>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" id="title" placeholder="Title" required>
              <div class="error-message"></div>
            </div>
            <div class="form-group">
              <label for="body">Body</label>
              <textarea id="body" placeholder="Body" required></textarea>
              <div class="error-message"></div>
            </div>
            <button type="submit">Add</button>
        </form>
    `;

    this._shadowRoot.innerHTML = template;
  }
}

customElements.define("note-form", NoteForm);
