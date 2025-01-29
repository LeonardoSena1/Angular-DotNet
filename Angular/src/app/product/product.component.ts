import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductService } from './ProductService';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProductDTO } from './productDTO';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
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
    FormsModule
  ],
  providers: [
    ProductService,
    MessageService
  ],
})

export class ProductComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
  ) { }

  creatOrEditProduct: ProductDTO = new ProductDTO(null, null, null);

  products: ProductDTO[] = [];
  visible: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._spinnerService.show();
    this._productService.getAll()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe(data => {
        this.products = data;
      });
  }

  create() {
    if (this.creatOrEditProduct.nomeProduto
      && this.creatOrEditProduct.preco) {
      this._spinnerService.show();
      this._productService.createOrEdit(this.creatOrEditProduct)
        .subscribe(data => {
          this.getData();
          this._messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: '', key: 'br', life: 3000 });
          this._spinnerService.hide();
          this.closeDialog();
        });
    } else {
      this._messageService.add({ severity: 'error', summary: 'Campos obrigatórios', detail: 'Nome e Preço', key: 'br', life: 3000 });
      return;
    }
  }

  openModalEdit(input: ProductDTO) {
    this.creatOrEditProduct = new ProductDTO(input.id, input.nomeProduto, input.preco);
    this.showDialog();
  }

  deleteProd(id: number) {
    debugger;
    this._productService.delete(id)
      .subscribe(result => {
        this._messageService.add({ severity: 'success', summary: 'Deletado com sucesso', detail: '', key: 'br', life: 3000 });
        this.getData();
      });
  }
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
