import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';
import { OrderService } from './orderService';
import { OrdersOutput } from './orderOutputDTO';
import { finalize } from 'rxjs';
import { CreateOrderDto, OrderProductDto } from './createOrderDto';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CustomerDTO } from '../customer/customerDTO';
import { UserDTO } from '../user/userDTO';
import { ProductService } from '../product/ProductService';
import { ProductDTO } from '../product/productDTO';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  imports: [
    HttpClientModule,
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    SplitButtonModule,
    ToastModule,
    FormsModule,
    AutoCompleteModule
  ],
  providers: [
    OrderService,
    ProductService,
    MessageService
  ],
})
export class OrderComponent implements OnInit {

  constructor(
    private _orderService: OrderService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService,
    private _productService: ProductService,
  ) { }

  createOrderDto: CreateOrderDto = new CreateOrderDto();
  order: OrdersOutput[] = [];
  visible: boolean = false;


  filterTextCustomer = 'all';
  selectedItemCustomer!: CustomerDTO | undefined;
  customer!: CustomerDTO[];

  filterTextUser = 'all';
  selectedItemUser!: UserDTO | undefined;
  User!: UserDTO[];
  orders: ProductDTO[] = [];

  productsToOrder: OrderProductDto[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._spinnerService.show();
    this._orderService.getAll()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe(data => {
        this.order = data;
      }, error => {
        console.error('Erro order:', error);
        console.log('Requisição finalizada: ', this.order);
        this._messageService.add({ severity: 'error', summary: 'Erro ao salvar', detail: error.message, key: 'br', life: 5000 });
        this._spinnerService.hide();
      },
        () => {

        }
      );
  }

  getAllProducts() {
    this._spinnerService.show();
    this._productService.getAll()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe(data => {
        this.orders = data;
      }, error => {
        console.error('Erro ao salvar produto:', error);
        this._messageService.add({ severity: 'error', summary: 'Erro ao salvar', detail: error.message, key: 'br', life: 5000 });
        this._spinnerService.hide();
      },
        () => {

        }
      );
  }

  create() {
    if (this.selectedItemUser?.id
      && this.selectedItemCustomer?.id
      && this.productsToOrder.length >= 1) {
      this._spinnerService.show();

      this.createOrderDto.customerId = this.selectedItemCustomer.id;
      this.createOrderDto.userId = this.selectedItemUser.id;
      this.createOrderDto.products = this.productsToOrder;

      this._orderService.createOrEdit(this.createOrderDto)
        .subscribe(data => {
          this.getData();
          this._messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: '', key: 'br', life: 3000 });
          this._spinnerService.hide();
          this.closeDialog();
        },
          error => {
            console.error('Erro ao salvar pedido:', error);
            this._messageService.add({ severity: 'error', summary: 'Erro ao salvar', detail: error.message, key: 'br', life: 5000 });
            this._spinnerService.hide();
          },
          () => {

          }
        );
    } else {
      this._messageService.add({ severity: 'error', summary: 'Campos obrigatórios', detail: 'Campos obrigatorios', key: 'br', life: 3000 });
      return;
    }
  }

  selectProductsToOrder(productId: number, quantity: number) {
    if (!quantity) {
      this._messageService.add({ severity: 'error', summary: 'Selecine uma quantidade', detail: '', key: 'br', life: 5000 });
      return;
    }

    if (quantity <= 0) {
      this._messageService.add({ severity: 'error', summary: 'Selecine uma quantidade valida', detail: '', key: 'br', life: 5000 });
      return;
    }

    const existingProductIndex = this.productsToOrder.findIndex(p => p.productId === productId);

    if (existingProductIndex !== -1) {
      this.productsToOrder[existingProductIndex].quantity = quantity;
    } else {
      this.productsToOrder.push({ productId, quantity });
    }

    this._messageService.add({ severity: 'success', summary: 'OK', detail: '', key: 'br', life: 5000 });
  }

  changeQuantity(productId: number, action: string) {
    const product = this.orders.find(p => p.id === productId);
    if (product) {
      if (!product.quantity) {
        product.quantity = 0;
      }
      if (action === 'increase') {
        product.quantity++;
      } else if (action === 'decrease') {
        product.quantity--;
        if (product.quantity == 0) {
          product.quantity = null;
        }
      }
    }
  }

  filterCustomers(event: AutoCompleteCompleteEvent) {
    this.filterTextCustomer = event.query.toLowerCase();

    if (!this.filterTextCustomer) {
      this.filterTextCustomer = 'all';
    }

    this.getCustomers();
  }

  getCustomers() {
    this._orderService
      .getAllCustomerForLookupTable(this.filterTextCustomer)
      .subscribe((result) => {
        console.log("result, ", result)
        this.customer = result;
      });
  }

  filterUser(event: AutoCompleteCompleteEvent) {
    this.filterTextUser = event.query.toLowerCase();

    if (!this.filterTextUser) {
      this.filterTextUser = 'all';
    }

    this.getUser();
  }

  getUser() {
    this._orderService
      .getAllUserForLookupTable(this.filterTextUser)
      .subscribe((result) => {
        console.log("result, ", result)
        this.User = result;
      });
  }

  deleteOrder(id: number) {
    debugger;
    this._orderService.delete(id)
      .subscribe(result => {
        this._messageService.add({ severity: 'success', summary: 'Deletado com sucesso', detail: '', key: 'br', life: 3000 });
        this.getData();
      });
  }


  showDialog() {
    this.getAllProducts();
    this.visible = true;
  }

  closeDialog() {
    this.clear();
    
    this.visible = false;
  }

  clear() {
    this.createOrderDto = new CreateOrderDto();
    this.filterTextCustomer = 'all';
    this.selectedItemCustomer = undefined;
    this.filterTextUser = 'all';
    this.selectedItemUser = undefined;

    this.productsToOrder = [];
  }
}
