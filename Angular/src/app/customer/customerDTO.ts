export class CustomerDTO {
    id!: number | null;
    cnpj!: string | null;
    razaoSocial!: string | null;

    constructor(
        id: number | null,
        cnpj: string | null,
        razaoSocial: string | null
    ) {
        this.id = id;
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
    }
}