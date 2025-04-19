class ClassItem extends HTMLElement {
  constructor() {
    super();

    this._card = {
      id: "NEED_ID",
      title: "NEED_TITLE",
      body: "NEED_BODY",
      createdAt: "NEED_CREATED_AT",
      archieved: false,
    };

    this._style = document.createElement("style");
  }

  setCard(value) {
    this._card["id"] = value.id;
    this._card["title"] = value.title;
    this._card["body"] = value.body;
    this._card["createdAt"] = value.createdAt;
    this._card["archieved"] = value.archieved;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        card-item {
            padding: 1rem 0.8rem;
            display: block;
            border-radius: 4px;
            box-shadow: 0 0 2px 2px #33333377;
        }

        .card__title {
            margin-block-start: 0;
            margin-block-end: 1rem;
            font-size: 1.3em;
            font-weight: bold;
        }

        p {
            margin-block-start: 0;
        }

        .date-notes {
            margin-block-start: 1rem;
        }

        .date-notes span {
          font-weight: bold;
        }
      `;
  }

  render() {
    this.updateStyle();

    this.setAttribute("data-id", this._card.id);

    this.innerHTML = `
        ${this._style.outerHTML}

        <h5 class="card__title">${this._card.title}</h5>
        <p>${this._card.body}</p>
        <div class ="date-notes">
            <i class="fa-solid fa-calendar-days"></i>
            <span>${new Date(this._card.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}</span>
        </div>
      `;
  }
}

customElements.define("card-item", ClassItem);
