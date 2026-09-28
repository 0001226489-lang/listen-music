const formulario = document.getElementById("cadastroForm");

const imagem = document.getElementById("imagem");
const preview = document.getElementById("preview");

imagem.addEventListener("change", function () {

    const arquivo = imagem.files[0];

    if (arquivo) {

        const leitor = new FileReader();

        leitor.onload = function (evento) {
            preview.src = evento.target.result;
            preview.style.display = "block";
        };

        leitor.readAsDataURL(arquivo);
    }

});

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const endereco = document.getElementById("endereco").value;
    const cpf = document.getElementById("cpf").value;

    if (senha.length < 6) {
        alert("A senha precisa ter pelo menos 6 caracteres.");
        return;
    }

  

    if (!email || !nome || !data || !endereco || !cpf) {
        alert("Preencha todos os campos.");
        return;
    }

    const dados = `
DADOS DO USUÁRIO

Nome: ${nome}
E-mail: ${email}
Senha: ${senha}
Data de nascimento: ${data}
Endereço: ${endereco}
cpf: ${cpf}
`;

    const arquivo = new Blob(
        [dados],
        { type: "text/plain;charset=utf-8" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);
    link.download = "cadastro_usuario.txt";

    link.click();

    URL.revokeObjectURL(link.href);

    alert("Cadastro realizado com sucesso!");

    formulario.reset();

    preview.src = "";
    preview.style.display = "none";
});
