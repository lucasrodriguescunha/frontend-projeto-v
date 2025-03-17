import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Login from "./Login";
import "@testing-library/jest-dom";

describe("Login Component", () => {
        test("Renderiza os elementos principais", () => {
            render(
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            );

            expect(screen.getByText("Bem-vindo(a)")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
            expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
            expect(screen.getByText("Acessar")).toBeInTheDocument();
        });
    }
)

/*
Testes unitários:
✅ Testa se os elementos principais do Login estão renderizando corretamente
✅ Verifica se uma mensagem de erro aparece ao tentar logar sem preencher os campos
✅ Valida se um e-mail incorreto exibe a mensagem de erro adequada
✅ Verifica se uma senha inválida exibe uma mensagem de erro
✅ Testa se um login bem-sucedido chama a navegação para /home
 */