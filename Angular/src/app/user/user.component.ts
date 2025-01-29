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
import { UserService } from './userService';
import { UserDTO } from './userDTO';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
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
    UserService,
    MessageService
  ],
})
export class UserComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _spinnerService: SpinnerService
  ) { }

  creatOrEditUser: UserDTO = new UserDTO(null, null, null, null, null);
  users: UserDTO[] = [];
  visible: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._spinnerService.show();
    this._userService.getAll()
      .pipe(
        finalize(() => {
          this._spinnerService.hide();
        })
      )
      .subscribe(data => {
        this.users = data;
      });
  }

  create() {
    if (this.creatOrEditUser.nomeUsuario
      && this.creatOrEditUser.cpf
      && this.creatOrEditUser.login
      && this.creatOrEditUser.senha) {
      this._spinnerService.show();
      this.creatOrEditUser.cpf = this.creatOrEditUser.cpf.toString();
      this._userService.createOrEdit(this.creatOrEditUser)
        .subscribe(
          data => {
            this.getData();
            this._messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: '', key: 'br', life: 3000 });
            this._spinnerService.hide();
            this.closeDialog();
          },
          error => {
            console.error('Erro ao salvar usuário:', error);
            console.log('Requisição finalizada: ', this.creatOrEditUser);
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

  openModalEdit(input: UserDTO) {
    this.creatOrEditUser = new UserDTO(input.id, input.cpf, input.cpf, input.login, input.senha);
    this.showDialog();
  }

  deleteUser(id: number) {
    debugger;
    this._userService.delete(id)
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
