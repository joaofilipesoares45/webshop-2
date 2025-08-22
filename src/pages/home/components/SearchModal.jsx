import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal, formCaptureData } from "../../../utils/functions"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const produtos = [{
    nome: "Fone de Ouvido Gamer HyperX Cloud Stinger Core",
    descricao: "Experimente um som imersivo com o HyperX Cloud Stinger Core. Com drivers de 40mm, microfone com cancelamento de ruído e design leve, ele é perfeito para longas sessões de jogo.",
    valor: 299.90,
    lista_img: ["produto 1"],
    categoria: "eletronicogamer"
}, {

    nome: "Câmera Digital Sony Alpha 6400",
    descricao: "Libere o fotógrafo que existe em você com a Sony Alpha 6400. Com sensor APS-C de 24.2MP, foco automático rápido e gravação de vídeo 4K, ela é ideal para capturar momentos incríveis com qualidade profissional.",
    valor: 4999.00,
    lista_img: ["produto 2"],
    categoria: "camera"
}, {

    nome: "Smartphone Xiaomi Redmi Note 11",
    descricao: "O Redmi Note 11 é a escolha perfeita para quem busca um smartphone com ótimo custo-benefício. Com tela AMOLED de 90Hz, câmera de 50MP e bateria de longa duração, ele oferece performance e design impecáveis.",
    valor: 1499.00,
    lista_img: ["produto 3"],
    categoria: "smart"
}]

export default function SearchModal() {
    const listDivs = useRef(null)
    const form = useRef(null)
    const submit = (event) => {
        event.preventDefault()
    }

    const searchFun = () => {
        const { search } = formCaptureData(form.current)
        const divs = listDivs.current.querySelectorAll(".item")
        if (search) {
            divs.forEach(element => {
                const nome = element.querySelector("h2").textContent
                if (nome.toUpperCase().includes(search.toUpperCase())) {
                    element.setAttribute("visible", "")
                } else {
                    element.removeAttribute("visible")
                }
            });
        } else {
            divs.forEach(element => element.removeAttribute("visible"))
        }
    }
    return (
        <div className="modal search-modal bg-[rgba(0,0,0,0.76)]">
            <form onSubmit={submit} className="bg-white flex" autoComplete="off" ref={form}>
                <div className="w-full flex">
                    <input type="text" name="search" id="search" placeholder="O que está buscando hoje?" onKeyUp={searchFun} className="w-full p-2.5 m-2.5 border-2 border-gray-200 focus:border-gray-900" />
                </div>
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faXmark} onClick={() => closeModal("search-modal")} className="text-2xl p-2" />
                </span>
            </form>
            <div className="flex flex-col gap-2 overflow-y-auto mt-2.5" ref={listDivs}>
                {produtos.map(({ nome, lista_img }, index) => {
                    return (
                        <div className="item [[visible]]:flex [[visible]]:animate-[var(--show-top)] hidden justify-between gap-2 bg-white p-[5px]" key={"lii" + index}>
                            <h2>{nome}</h2>
                            <img src={"/webshop-2/" + lista_img[0] + ".jpg"} alt="" className="max-w-[80px]" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}