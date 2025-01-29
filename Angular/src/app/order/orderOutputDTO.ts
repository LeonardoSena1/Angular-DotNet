import { CustomerDTO } from "../customer/customerDTO";
import { ProductDTO } from "../product/productDTO";
import { UserDTO } from "../user/userDTO";


export interface OrdersOutput {
    id: string;
    customerId: number;
    userId: number;
    createdAt: string;
    total: number;
    customer: CustomerDTO;
    user: UserDTO;
    orderProducts: OrderProducts[];
}

export interface OrderProducts {
    id: string;
    orderId: string;
    productId: number;
    quantity: number;
    price: number;
    product: ProductDTO;
}