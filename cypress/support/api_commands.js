
Cypress.Commands.add('apiLogin', (user, password) => { 
    cy.api({
        method: 'POST',
        url: '165.227.93.41/lojinha/v2/login',            
        body: {
            "usuarioLogin": user,
            "usuarioSenha": password
        },
        failOnStatusCode: false
    }).then(response => { return response })
  
})
Cypress.Commands.add('apiCreateUser', (usuarioNome, usuarioLogin, usuarioSenha) => { 
    cy.api({
        method: 'POST',
        url: '165.227.93.41/lojinha/v2/usuarios',            
        body: {
            "usuarioNome": usuarioNome,
            "usuarioLogin": usuarioLogin,
            "usuarioSenha": usuarioSenha
        },
        failOnStatusCode: false
    }).then(response => { return response })
  
})
Cypress.Commands.add('apiPostProduct', (token, produtoNome, produtoValor, produtoCores) => { 
    cy.api({
        method: 'POST',
        url: 'http://165.227.93.41/lojinha/v2/produtos',   
        headers: { 'token': token },         
        body: {
            "produtoNome": produtoNome,
            "produtoValor": produtoValor,
            "produtoCores": produtoCores,        
            "produtoUrlMock": " ",    
            "componentes": [
              {
                "componenteNome": " ",
                "componenteQuantidade": 1
              }
            ]
          },
        failOnStatusCode: false
    }).then(response => { return response })
  
})
Cypress.Commands.add('apiGetAllProducts', (token) => { 
    cy.api({
        method: 'GET',
        url: 'http://165.227.93.41/lojinha/v2/produtos', 
        headers: { 'token': token },
        failOnStatusCode: false
    }).then(response => { return response })
  
})
Cypress.Commands.add('apiGetAllProducts', (token) => { 
    cy.api({
        method: 'GET',
        url: 'http://165.227.93.41/lojinha/v2/produtos', 
        headers: { 'token': token },
        failOnStatusCode: false
    }).then(response => { return response })
  
})
Cypress.Commands.add('apiGetProductsById', (token, produtoId) => { 
    cy.api({
        method: 'GET',
        url: `http://165.227.93.41/lojinha/v2/produtos/${produtoId}`, 
        headers: { 'token': token },
        failOnStatusCode: false
    }).then(response => { return response })
  
})
Cypress.Commands.add('apiPutProduct', (token, productId, produtoNome, produtoValor, produtoCores) => { 
    cy.api({
        method: 'PUT',
        url: `http://165.227.93.41/lojinha/v2/produtos/${productId}`,   
        headers: { 'token': token },         
        body: {
            "produtoNome": produtoNome,
            "produtoValor": produtoValor,
            "produtoCores": produtoCores,        
            "produtoUrlMock": " ",    
            "componentes": [
              {
                "componenteNome": " ",
                "componenteQuantidade": 1
              }
            ]
          },
        failOnStatusCode: false
    }).then(response => { return response })
  
})

Cypress.Commands.add('apiDeleteData', (token) => { 
    cy.api({
        method: 'DELETE',
        url: 'http://165.227.93.41/lojinha/v2/dados', 
        headers: { 'token': token },
        failOnStatusCode: false
    }).then(response => { return response })
  
})


