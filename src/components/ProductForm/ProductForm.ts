import { ProductItem } from "../../types/product";
import { appState, dispatch } from "../../store/store";
import { addTask } from "../../store/actions";

class TaskForm extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
           <h1>Tasks</h1>
           <form class="task-form">
           <input type="text" id="product-id" placeholder="Product ID">
           <input type="text" id="product-img" placeholder="Image Link" required>
           <input type="text" id="product-name" placeholder="Name" required>
           <input type="text" id="product-price" placeholder="Price" required>
           <input type="text" id="product-category" placeholder="Category" required>
           <input type="text" id="product-description" placeholder="Description" required>
           <button type="submit" id="add-button">Agregar</button>
           </form>
           
           `
        }

        const taskForm = this.shadowRoot?.querySelector('.task-form') as HTMLFormElement
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const productID = this.shadowRoot?.querySelector('#product-id') as HTMLInputElement
            const productid = productID.value
            const productImg = this.shadowRoot?.querySelector('#product-img') as HTMLInputElement
            const productimg = productImg.value
            const productName = this.shadowRoot?.querySelector('#product-name') as HTMLInputElement
            const productname = productName.value
            const productPrice = this.shadowRoot?.querySelector('#product-price') as HTMLInputElement
            const productprice = Number(productPrice.value)
            const productCategory = this.shadowRoot?.querySelector('#product-category') as HTMLInputElement
            const productcategory = productCategory.value
            
            const newTask: ProductItem = {
                id:Date.now(),
                image:productimg,
                title: productname,
                price: productprice,
                category: productcategory



               

            }
            dispatch(addTask(newTask))
            console.log(appState)
        })
    }




}
customElements.define('task-form', TaskForm)
export default TaskForm