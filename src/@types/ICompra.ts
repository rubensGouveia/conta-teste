export interface ICompra {
    estabelecimento: string;
    endereco: string
    produtos: IProduto[];
    created_at?: string
}

export interface IProduto {
    codigo: string;
    nome: string;
    quantidade: number;
    unidadeMedida: string;
    valorUnitario: number;
    valorTotal?: number;
}