export function formatCurrency(valeu: number){
    return valeu.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })
}