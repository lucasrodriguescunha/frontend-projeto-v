import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
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

    test("Exibe erro ao tentar logar sem preencher os campos", () => {
        render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Acessar"));

        expect(screen.getByText("Por favor, preencha o e-mail e a senha.")).toBeInTheDocument();
    });

    test("Exibe erro ao inserir um e-mail inválido", () => {
        render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("E-mail"), {target: {value: "emailinvalido"}});
        fireEvent.change(screen.getByPlaceholderText("Senha"), {target: {value: "Senha123!"}});
        fireEvent.click(screen.getByText("Acessar"));

        expect(screen.getByText("Por favor, insira um e-mail válido.")).toBeInTheDocument();
    });

    test("Exibe erro ao inserir uma senha inválida", () => {
        render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("E-mail"), {target: {value: "teste@teste.com"}});
        fireEvent.change(screen.getByPlaceholderText("Senha"), {target: {value: "123456"}});
        fireEvent.click(screen.getByText("Acessar"));

        expect(screen.getByText("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.")).toBeInTheDocument();
    });

    test("Realiza login com sucesso e navega para /home", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => mockNavigate,
        }));

        render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("E-mail"), {target: {value: "teste@teste.com"}});
        fireEvent.change(screen.getByPlaceholderText("Senha"), {target: {value: "Senha123!"}});
        fireEvent.click(screen.getByText("Acessar"));

        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
