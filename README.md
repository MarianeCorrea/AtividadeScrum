# Aplicação Biblioteca Majokam

A biblioteca Majokam é o projeto da disciplina de Fullstack do curso de Análise e Desenvolvimento de Sistemas da faculdade Senac Palhoça, feita pelos alunos Mariane Correa, João Vitor Ventura e Sandokam Bussola.

## Tecnologias utilizadas

### Front-end
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)

### Back-end
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

## Pré-requisitos para executar o projeto
É necessário ter o Git instalado.
### Front-end
É preciso ter o Node.js instalado.

### Back-end
É preciso ter o JDK instalado na versão 21.

### IDE
Para ambos, a IDE recomendada é o VS Code, mas fica a seu cargo escolher qual utilizar

## Instalação do Projeto
### Clonando o projeto
Na pasta desejada no seu computador abra o terminal (de preferência o [git bash](https://git-scm.com/downloads)) e clone o projeto:

```bash
git clone <link_do_projeto>
```
Substituia o conteúdo nos colchetes angulares pelo link do projeto.
### Após a clonagem
Você irá se deparar com três diretórios, o diretório 'docs' contém a documentação pública do projeto, os outros dois são os repositórios do front-end e back-end separados. Abaixo estão os passos para executar separadamente ambos.
### Front-end
### Instalando dependências
Acesse a pasta front-end do projeto através do seguinte comando:
```bash
cd front-end
```
Estando no diretório do front-end especificamente, execute o seguinte npm para instalar as dependências do projeto:
```bash
npm install
```
Esse comando pode demorar alguns minutos para terminar a execução, dependendo da velocidade da sua internet. Depois disso, aparecerão uma pasta chamada 'node_modules' e um arquivo chamado 'package-lock.json', você já pode executar a aplicação:
```bash
npm start
```
### Back-end
### Instalando extensões
Caso esteja usando o VSCode como IDE para executar o back-end do projeto, recomendamos fortemente a instalação destes dois pacotes de extensões para executar aplicações Java e Spring Boot respectivamente:

[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
<br>
[Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack)

Após isso, vá até o arquivo application.properties
~~~shell
demo
    └───src
        └───main
            └───resources
                └───application.properties
~~~
E modifique as seguintes propriedades:
~~~properties
spring.datasource.username=<seu usuário do MySQL>
spring.datasource.password=<senha desse usuário>
~~~
Acessando o MySQL com este usuário no seu computador, execute o seguinte código na linha de comando/query:
~~~SQL
CREATE DATABASE db_biblioteca;
~~~
Após isso, você pode executar a aplicação, caso haja um erro de versão, provavelmente será a versão do Java, como explicado anteriormente, a versão necessária é a 21, caso você não consiga instala-la, pode a modificar no arquivo pom.xml em:
~~~shell
demo
    └───pom.xml
~~~
Lá, altere a seguinte linha de código para a versão desejada:
~~~xml
<java.version>21</java.version>
~~~
Tendo feito isso, sua aplicação deve executar normalmente.
## Contribuição

Este é um projeto simples de faculdade, não há intenção por nossa parte de expandir o sistema, portanto não vimos necessidade de contribuição, no entanto, caso queira, pode entrar em contato com um dos integrantes para falar sobre o projeto.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
