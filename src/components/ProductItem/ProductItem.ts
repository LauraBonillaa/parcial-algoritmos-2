import { appState, dispatch } from "../../store/store";
import { addObserver } from "../../store/store";
import { addTask,removeTask } from "../../store/actions";

export enum Attribute {
    "uid" = "uid",
    "image" = "image",
    "name" = "name",
    "description" = "description",
    "category" = "category",
    "price" = "price",
    "rating" = "rating"
}


class ProductItem extends HTMLElement {

    uid?: number;
    image?: string;
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    rating?: number;



    static get observedAttributes() {
        return Object.keys(Attribute)
    }
    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string) {

        if (propName === Attribute.price || propName === Attribute.rating || propName === Attribute.uid) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();

    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this)
    }
    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/ProductItem/ProductItem.css">
            <section>
            <div  class="card">
            <div id="character">
            <img id="img" src="${this.image ? this.image : 'Not found'}">
            <div class="text">
            <h2 class="name">${this.name}</h2>
            <p>Description: ${this.description}</p>
            <p>Category: ${this.category}</p>
            <p>Price: $${this.price}</p>
            <p>Rating: ${this.rating}</p>
            <button id="add-button">Editar</button>
            <button id="remove-button">Eliminar</button>
            </div>
            </div>
            </div>
            
            </section>
            `;
            const deletebutton = this.shadowRoot?.querySelector('#remove-button') as HTMLButtonElement
            deletebutton.addEventListener('click',()=>{
              const idToRemove = Number(this.getAttribute("id"))
              dispatch(removeTask(idToRemove))
            })



    }
}

customElements.define('card-product', ProductItem);
export default ProductItem;