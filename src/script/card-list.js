class CardList extends HTMLElement {
  constructor() {
    super();

    this._cardList = [];
    this._style = document.createElement("style");
  }

  setCardList(value) {
    this._cardList = value;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
            card-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
                padding: 20px;
            }

            @media (max-width: 768px) {
            card-list {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                padding: 15px;
              }
            }

            @media (max-width: 480px) {
                card-list {
                grid-template-columns: 1fr;
              }
            }
        `;
  }

  render() {
    this.updateStyle();

    const cardItemElements = this._cardList.map((item) => {
      const card = document.createElement("card-item");
      card.setCard(item);
      return card;
    });

    this.innerHTML = ``;
    this.append(this._style, ...cardItemElements);
  }
}

customElements.define("card-list", CardList);
