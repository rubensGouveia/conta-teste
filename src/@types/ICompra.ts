export interface ICompra{
    estabelecimento: string;
    produtos: IProduto[];
}

export interface IProduto{ 
        codigo: string;
        nome: string;
        quantidade: number;
        unidadeMedida: string;
        valorUnitario: number;   
}