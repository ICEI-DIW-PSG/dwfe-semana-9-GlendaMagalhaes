
const data = {
    produtos: [
        {
            id: 1,
            nome: "Impuros",
            preco: 29.90,
            categoria: "Séries",
            imagem: "img/impuros.jpeg",
            descricao: "Drama policial brasileiro sobre crime organizado no Rio de Janeiro.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Breaking Bad",
            preco: 49.90,
            categoria: "Séries",
            imagem: "img/breaking.jfif",
            descricao: "Professor de química descobre que tem câncer e começa a produzir metanfetamina.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Os Donos do Jogo",
            preco: 24.90,
            categoria: "Séries",
            imagem: "img/Os_donos_do_jogo.jpg",
            descricao: "Série brasileira sobre o universo do jogo do bicho no Rio de Janeiro.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "DNA do Crime",
            preco: 27.90,
            categoria: "Séries",
            imagem: "img/dna.jpg",
            descricao: "Agentes federais usam ciência forense para rastrear criminosos.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "A Colega Perfeita",
            preco: 19.90,
            categoria: "Filmes",
            imagem: "img/colega.webp",
            descricao: "Thriller psicológico sobre uma jovem cuja nova colega parece perfeita demais.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "O Agente Secreto",
            preco: 34.90,
            categoria: "Filmes",
            imagem: "img/agente.jpg",
            descricao: "Thriller político de Kleber Mendonça Filho com Wagner Moura, ambientado nos anos 70.",
            emEstoque: false
        },
        {
            id: 7,
            nome: "7 Prisioneiros",
            preco: 14.90,
            categoria: "Filmes",
            imagem: "img/7Pri.jfif",
            descricao: "Jovem vai para São Paulo em busca de emprego e cai em rede de trabalho escravo.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Os Quatro da Candelária",
            preco: 22.90,
            categoria: "Séries",
            imagem: "img/os4.jpg",
            descricao: "Baseada nos sobreviventes da Chacina da Candelária, no Rio de Janeiro de 1993.",
            emEstoque: true
        },
        {
            id: 9,
            nome: "The Rookie",
            preco: 39.90,
            categoria: "Séries",
            imagem: "img/therookie.jpg",
            descricao: "Homem de 40 anos recomeça a vida como o recruta mais velho do LAPD.",
            emEstoque: true
        },
        {
            id: 10,
            nome: "Emergência Radioativa",
            preco: 18.90,
            categoria: "Séries",
            imagem: "img/radio.jpg",
            descricao: "Inspirada no acidente com o Césio-137 em Goiânia, 1987.",
            emEstoque: true
        }
    ]
};


const productList    = document.getElementById("product-list");    
const productDetails = document.getElementById("product-details"); 
const searchInput    = document.querySelector("#search");          
const categorySelect = document.querySelector("#category");        
const btnRender      = document.querySelector("#btnRender");       


function formatPrice(preco) {
    return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


function createProductCard(produto) {
    const card = document.createElement("div");
    card.setAttribute("data-id", produto.id);      
    card.classList.add("card");                      
    card.style.border = "1px solid #333";          

    const img = document.createElement("img");
    img.setAttribute("src", produto.imagem);
    img.setAttribute("alt", produto.nome);

    const titulo = document.createElement("h2");
    titulo.classList.add("card-title");
    titulo.innerHTML = produto.nome;

    const categoria = document.createElement("p");
    categoria.innerHTML = produto.categoria;

    const preco = document.createElement("p");
    preco.innerHTML = formatPrice(produto.preco);

    const btnDetalhes = document.createElement("button");
    btnDetalhes.innerHTML = "Ver detalhes";
    btnDetalhes.addEventListener("click", function () {   
        showProductDetails(produto);
    });

    const btnDestacar = document.createElement("button");
    btnDestacar.innerHTML = "Destacar";
    btnDestacar.addEventListener("click", function () {   
        card.classList.toggle("highlight");
    });

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(categoria);
    card.appendChild(preco);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}


function renderProducts(produtos) {
    productList.innerHTML = "";   

    produtos.forEach(function (produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);  
    });

  
    const todosCards = document.querySelectorAll(".card");
    todosCards.forEach(function (card) {
        console.log("data-id:", card.getAttribute("data-id"));
    });
}


function renderCategories() {
    const categorias = ["Todas"];
    data.produtos.forEach(function (p) {
        if (!categorias.includes(p.categoria)) categorias.push(p.categoria);
    });

    categorySelect.innerHTML = "";

    categorias.forEach(function (cat) {
        const option = document.createElement("option");
        option.setAttribute("value", cat);
        option.innerHTML = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;  
}


function filterProducts() {
    const texto    = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(function (p) {
        const bateNome = p.nome.toLowerCase().includes(texto);
        const bateCat  = categoria === "Todas" || p.categoria === categoria;
        return bateNome && bateCat;
    });
}

searchInput.addEventListener("input", function () {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);