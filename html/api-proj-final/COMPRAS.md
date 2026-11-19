# Carrinho e compras

## Fluxo
- O carrinho fica no navegador, em `localStorage`, na chave `carrinho_compras`.
- Cada item guarda o ID do veículo e dados de apresentação. O servidor nunca confia no preço enviado pelo navegador.
- A finalização envia somente os IDs e a forma de pagamento. A API consulta os preços no MySQL e registra compra e itens em uma transação.
- Veículos vendidos recebem o ID da compra em `carro.idCompra` e deixam de aparecer na listagem.

## Rotas

### Finalizar compra
`POST /compras`

Cabeçalho: `Authorization: Bearer <token>`

Corpo:
```json
{
  "itens": [{ "idCarro": 1 }, { "idCarro": 2 }],
  "formaPagamento": "PIX"
}
```

Formas aceitas: `PIX`, `Cartão de crédito`, `Financiamento` e `À vista`.

### Histórico do usuário autenticado
`GET /compras`

Cabeçalho: `Authorization: Bearer <token>`

A resposta contém as compras do usuário autenticado e seus respectivos veículos. O ID do cliente é obtido exclusivamente do JWT.

## Páginas
- `/carrinho.html`: revisar/remover veículos e finalizar a compra.
- `/compras.html`: consultar o histórico de compras.
- `/carros.html`: adicionar veículos ao carrinho.

## Banco de dados
A migration cria, sem apagar tabelas existentes:
- `compra`: cliente, data, total e forma de pagamento.
- `compra_item`: veículos e preço unitário registrado no momento da compra.

Execute `npm start` para rodar a migration e iniciar a API. Faça backup do banco antes de executar migrations em ambientes com dados importantes.

## Teste manual
1. Faça login e mantenha o token salvo pelo fluxo existente.
2. Em `carros.html`, adicione um ou mais veículos ao carrinho.
3. Em `carrinho.html`, selecione a forma de pagamento e finalize.
4. Consulte `compras.html` ou chame `GET /compras` com o mesmo token.
5. Tente finalizar novamente com um veículo já vendido: a API deve responder HTTP 409.
