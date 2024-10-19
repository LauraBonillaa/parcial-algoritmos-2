import { addObserver,appState,dispatch } from "../store/store";
import ProductItem, {Attribute as ProductAttribute} from "../components/ProductItem/ProductItem";
import { getProductsState } from "../store/actions";

class Dashboard extends HTMLElement {

    
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        addObserver(this)
    }

    async connectedCallback() {
        console.log("holi");
        if (!appState.products || appState.products.length === 0) {
            const action = await getProductsState();
            dispatch(action);
            console.log('Products state after fetch:', appState.products);
        } else {
            console.log('Products already loaded:', appState.products);
        }
        
        // Asegúrate de que render se llame aquí
        this.render();
    }
    
    fetchProducts() {
        if (!appState.products || appState.products.length === 0) {
            console.log('No products available in the state.');
            return null;
        }
    
        const container = document.createElement('section');
        container.className = 'products-container';
    
        appState.products.forEach((product: any) => {
            const productItem = document.createElement('card-product') as ProductItem;
            productItem.setAttribute(ProductAttribute.uid, product.id.toString());
            productItem.setAttribute(ProductAttribute.image, product.image);
            productItem.setAttribute(ProductAttribute.name, product.title);
            productItem.setAttribute(ProductAttribute.description, product.description);
            productItem.setAttribute(ProductAttribute.category, product.category);
            productItem.setAttribute(ProductAttribute.price, product.price.toString());
            productItem.setAttribute(ProductAttribute.rating, product.rating.rate.toString());
    
            container.appendChild(productItem);
        });
    
        console.log('Products rendered:', appState.products);
        return container;
    }
    


    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``; 

            const productsTitle = this.ownerDocument.createElement('h2');
            productsTitle.textContent = 'Product List';
            this.shadowRoot.appendChild(productsTitle);

            const productsContainer = this.fetchProducts();
            if (productsContainer) {
                this.shadowRoot.appendChild(productsContainer);
            } else {
                this.shadowRoot.innerHTML += `<p>no encontre los productos :( </p>`;
            }

        

           
            
        }  
}

}

customElements.define("app-dashboard", Dashboard)