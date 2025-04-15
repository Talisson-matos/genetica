"use client"

import { Aside } from "./Aside";
import '../app/styles/globals.css';
import '../app/styles/layout/TextContent.css'
import { LuMenu, LuX } from "react-icons/lu";
import { useState, useEffect } from 'react'


const TextContent = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //requisição no banco de dados
    const [texto1, setTexto1] = useState("");


    useEffect(() => {
        fetch("api/texto1")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setTexto1(data[0].texto);
                }
            })
            .catch(error => console.error("Erro ao buscar texto1:", error));
    }, []);


    if(!texto1){
        return <img className="spinner" src="spinner.svg" alt="loading spinner" />
    }


    //menu responsivo e aside

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const sections = [
        {
            id: 'texto1',
            title: 'Hereditariedade e Variabilidade Genética',
            subtitle: [
                { id: 'texto1.1', title: 'Leis de Mendel' },
                { id: 'texto1.2', title: 'genotipo e fenotipo' },
                { id: 'texto1.3', title: 'variabilidade Genética' },
            ]
        },

        {
            id: 'texto2',
            title: 'Genômica',
            subtitle: [
                { id: 'texto2.1', title: 'Mutações Genéticas' },
                { id: 'texto2.2', title: 'Genômica Estrutural' },
                { id: 'texto2.3', title: 'Aplicação da Genômica' },
            ]
        },

        {
            id: 'texto3',
            title: 'Genética Molecular',
            subtitle: [
                { id: 'texto3.1', title: ' Estrutura do DNA e RNA' },
                { id: 'texto3.2', title: 'Processos Moleculares' },
                { id: 'texto3.3', title: 'Regulação da Expressão Gênica' },
            ]
        },

        {
            id: 'texto4',
            title: 'Epigenética',
            subtitle: [
                { id: 'texto4.1', title: 'Definição de Epigenética' },
                { id: 'texto4.2', title: 'Mecanismos Epigenéticos' },
                { id: 'texto4.3', title: 'Epigenética e Expressão Gênica' },
            ]
        },

    ];




    return (
        <div className="text_main">
            <aside className="container_main">
                <Aside sections={sections} />
            </aside>

            <main className="content">

                <button className="over_canvas" onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"} > {isMenuOpen ? <LuX /> : <LuMenu />}</button>

                <div className={`aside_mobile ${isMenuOpen ? 'open' : ''}`}><Aside sections={sections} /></div>

                <h1>Título do Artigo</h1>

                <section>
                    <div dangerouslySetInnerHTML={{ __html: texto1 }} />

                </section>


            </main>
        </div>
    );
};

export default TextContent;


