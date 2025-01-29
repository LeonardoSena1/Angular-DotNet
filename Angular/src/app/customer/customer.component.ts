import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { SplitButtonModule } from 'primeng/splitbutton';

import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CustomerService } from './customerService';
import { CustomerDTO } from './customerDTO';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
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
    PasswordModule
  ],
  providers: [
    CustomerService,
    MessageService
  ],
})
export class CustomerComponent implements OnInit {
  creatOrEditCustomer: CustomerDTO = new CustomerDTO(null, null, null);
  customers: CustomerDTO[] = [];
  visible: boolean = false;

  constructor(
    private _customerService: CustomerService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._spinnerService.show();
    this._customerService.getAll()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe(data => {
        this.customers = data;        
      });
  }

  create() {
    if (this.creatOrEditCustomer.cnpj
      && this.creatOrEditCustomer.razaoSocial) {
      this._spinnerService.show();
      this._customerService.createOrEdit(this.creatOrEditCustomer)
        .subscribe(
          data => {
            this.getData();
            this._messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: '', key: 'br', life: 3000 });
            this._spinnerService.hide();
            this.closeDialog();
          },
          error => {
            console.error('Erro ao salvar Customer:', error);
            console.log('Requisição finalizada: ', this.creatOrEditCustomer);
            this._messageService.add({ severity: 'error', summary: 'Erro ao salvar', detail: error.message, key: 'br', life: 5000 });
            this._spinnerService.hide();
          },
          () => {

          }
        );

    } else {
      this._messageService.add({ severity: 'error', summary: 'Campos obrigatórios', detail: '', key: 'br', life: 3000 });
      return;
    }
  }

  openModalEdit(input: CustomerDTO) {
    this.creatOrEditCustomer = new CustomerDTO(input.id, input.cnpj, input.razaoSocial);
    this.showDialog();
  }

  deleteCustomer(id: number) {
    debugger;
    this._customerService.delete(id)
      .subscribe(result => {
        this._messageService.add({ severity: 'success', summary: 'Deletado com sucesso', detail: '', key: 'br', life: 3000 });
        this.getData();
      });
  }

  showDialog() {    
    this.visible = true;
  }

  closeDialog() {
    this.creatOrEditCustomer = new CustomerDTO(null, null, null);
    this.visible = false;
  }
}
