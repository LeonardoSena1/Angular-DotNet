export class ProductDTO {
    id: number | null;
    nomeProduto: string | null;
    preco: number | null;

    constructor(id: number | null, nomeProduto: string | null, preco: number | null) {
        this.id = id;
        this.nomeProduto = nomeProduto;
        this.preco = preco;
    }
}