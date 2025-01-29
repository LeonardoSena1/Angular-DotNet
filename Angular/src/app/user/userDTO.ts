export class UserDTO {
    id!: number | null;
    nomeUsuario!: string | null;
    cpf!: string | null;
    login!: string | null;
    senha!: string | null;

    constructor(id: number | null,
        nomeUsuario: string | null,
        cpf: string | null,
        login: string | null,
        senha: string | null,
    ) {
        this.id = id;
        this.nomeUsuario = nomeUsuario;
        this.cpf = cpf;
        this.login = login;
        this.senha = senha;
    }
}