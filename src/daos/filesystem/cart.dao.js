import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import ProductDaoFS from "./product.dao.js";


export default class CartDaoFS {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, "utf8");
                if(carts) return JSON.parse(carts)
                else return [];
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async createCart() {
        try {
            const newCart = {
                id: uuidv4(),
                products: []
            }

            const cartsFile = await this.getCarts();
                cartsFile.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                
            return newCart;

        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idCart) {
        try {
            const cartsFile = await this.getCarts();
            const cart = cartsFile.find(cart => cart.id == idCart);
            if (!cart) return false;
            else return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, idProduct) {
        try {
            // Look for product in Cart
            let productExist = false;
            const cartsFile = await this.getCarts();
            for (let i = 0; i < cart.products.length; i++) {
                if (cart.products[i].product == idProduct) {
                    cart.products[i].quantity += 1;
                    productExist = true;
                    break;
                }
            };

            // create new Product
            if (!productExist) {
                cart.products.push({
                    product: idProduct,
                    quantity: 1
                })
            };

            const newArray = cartsFile.filter(u => u.id != idCart)
            newArray.push(cart);;
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return cart;

        } catch (error) {
            console.log(error);
        }
    }
}