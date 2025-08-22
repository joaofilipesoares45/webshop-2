import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartArrowDown, faCartShopping, faCode, faEllipsisVertical, faHeart, faHeartCircleCheck, faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { baseUrl, whatsMsg, openLink, openModal, numberForBrl } from "../../utils/functions"
import Slide from "../../components/Slide"
import "./css/index.css"
import SearchModal from "./components/SearchModal";
import { saveData } from "../../utils/save-functions";
import FavoritesModal from "./components/FavoritesModal";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import CartModal from "./components/CartModal";

const produtos = [{
    nome: "Fone de Ouvido Gamer HyperX Cloud Stinger Core",
    descricao: "Experimente um som imersivo com o HyperX Cloud Stinger Core. Com drivers de 40mm, microfone com cancelamento de ruído e design leve, ele é perfeito para longas sessões de jogo.",
    valor: 299.90,
    lista_img: ["produto 1"],
    categoria: "eletronicogamer",
    id: 0
}, {

    nome: "Câmera Digital Sony Alpha 6400",
    descricao: "Libere o fotógrafo que existe em você com a Sony Alpha 6400. Com sensor APS-C de 24.2MP, foco automático rápido e gravação de vídeo 4K, ela é ideal para capturar momentos incríveis com qualidade profissional.",
    valor: 999.00,
    lista_img: ["produto 2"],
    categoria: "camera",
    id: 1
}, {

    nome: "Smartphone Xiaomi Redmi Note 11",
    descricao: "O Redmi Note 11 é a escolha perfeita para quem busca um smartphone com ótimo custo-benefício. Com tela AMOLED de 90Hz, câmera de 50MP e bateria de longa duração, ele oferece performance e design impecáveis.",
    valor: 1499.00,
    lista_img: ["produto 3"],
    categoria: "smart",
    id: 2
}]

export default function Home() {
    const { favorites, setFavorites, cartShop, setCartShop } = useContext(DataContext)

    const newFavorite = (item) => {
        setFavorites(saveData("local-s", "favorites", 'vbnv', 0, 0, item))
    }

    const addCart = (item) => {
        setCartShop(saveData("local-s", "cart", "kasd", 0, 0, item))
    }

    const inFav = (item) => {
        const test = favorites.filter(({ id }) => id === item.id)
        if (test.length > 0) {
            return false
        } else {
            return true
        }
    }

    const inCart = (item) => {
        const test = cartShop.filter(({ id }) => id === item.id)
        if (test.length > 0) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className="page home">
            <SearchModal />
            <FavoritesModal />
            <CartModal />
            <header className="text-red-700 p-[12px] bg-white sticky top-0 flex justify-between items-center gap-2.5 shadow-sm z-1">
                <button id="logo" className="font-extrabold w-full text-3xl cursor-default!"><a href={baseUrl} className="text-red-700! w-fit cursor-pointer">WebShop <FontAwesomeIcon icon={faShoppingCart} /></a></button>

                <div id="options" className="flex gap-2.5">
                    <div className="relative sm:flex items-center w-full max-w-[350px] hidden">
                        <input type="text" placeholder="Buscar..." className="bg-white p-[8px_15px] text-red-950 w-[100%] text-sm rounded-[17px]! shadow-[0_0_5px_rgb(0,0,0,.3)] placeholder-red-700" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-2 text-red-950" />
                    </div>

                    <div className="flex items-center gap-2.5">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="sm:hidden!" onClick={() => openModal("search-modal")} />
                        <FontAwesomeIcon icon={faHeart} onClick={() => openModal('favorites-modal')} />
                        <div className="relative flex justify-center">
                            {cartShop.length > 0 && <span className="absolute right-[-5.5px] top-[-8.5px] ml-[2px] text-[.6rem] h-fit pointer-events-none">{cartShop.length}</span>}
                            <FontAwesomeIcon icon={faShoppingCart} onClick={() => openModal("cart-modal")} />
                        </div>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>

                <div id="categories" className="flex justify-center w-full gap-10 text-nowrap text-[.70rem] border-t-2 pt-[12px] border-red-400">
                    <button className="hover:underline">PC gamer</button>
                    <button className="hover:underline">Acessorios</button>
                    <button className="hover:underline">Smartphones</button>
                    <button className="hover:underline">Monitores</button>
                </div>
            </header>
            <main>
                <section className="banner relative p-[15px] sm:pt-[30px] bg-red-500 mt-4">
                    <Slide len={3}>
                        {[1, 2, 3].map((item) => {
                            return (
                                <div className="item flex w-full max-w-[1000px] items-center justify-between gap-[10px] md:gap-[25px] md:p-[50px] p-[10px] rounded-sm bg-white shadow-[0_0_5px_rgb(0,0,0,.3)]" key={"img" + item}>
                                    <div>
                                        <h1 className="font-bold text-sm sm:text-4xl text-red-900">Contagem regressiva para a <br /> Mega-promoção de ferias!!</h1>
                                        <p className="font-medium text-sm sm:text-2xl mt-2.5">Descontos incriveis de até <span className="font-extrabold text-xl sm:text-4xl ml-1 text-red-600">60% off</span></p>
                                    </div>
                                    <img src={"/webshop-2/imagem " + item + ".jpg"} alt="" className="w-[100%] max-w-[150px] rounded-md md:max-w-[200px] sm:max-w-[250px]" />
                                </div>
                            )
                        })}
                    </Slide>
                </section>

                <section className="promo bg-gray-800 my-3.5 p-2.5">
                    <h2 className="text-2xl text-bold text-white">Promos da semana</h2>
                    <hr className="my-[3px_10px] border-[1.5px] border-white" />
                    <div className="flex gap-2.5 overflow-x-auto pb-2.5">
                        {produtos.map(({ nome, lista_img, descricao, valor }, index) => {
                            return (
                                <div className="item flex flex-col items-center justify-between min-w-[200px] max-w-[100px] p-[10px] bg-white rounded-md relative shadow-[0_0_5px_rgb(0,0,0,.3)]" key={"img" + index}>
                                    <img src={"/webshop-2/" + lista_img[0] + ".jpg"} alt="" className=" rounded-md" />
                                    <div>
                                        <h4 className="text-[.8rem] font-bold">{nome}</h4>
                                        <p>{numberForBrl(valor)}</p>
                                        <p className="text-[.6rem] truncate w-45">{descricao}</p>
                                    </div>
                                    <nav className="absolute flex flex-col gap-1.5 top-[5px] right-[5px] text-white text-sm [&>svg]:bg-red-600 [&>svg]:p-[9px_7px] [&>svg]:rounded-full">
                                        {inFav(produtos[index]) ?
                                            <FontAwesomeIcon icon={faHeart} onClick={() => newFavorite(produtos[index])} /> :
                                            <FontAwesomeIcon icon={faHeartCircleCheck} />}

                                        {inCart(produtos[index]) ?
                                            <FontAwesomeIcon icon={faCartShopping} onClick={() => addCart(produtos[index])} /> :
                                            <FontAwesomeIcon icon={faCartArrowDown} />}
                                    </nav>
                                </div>
                            )
                        })}
                    </div>

                </section>
                <footer>

                </footer>
            </main>
            <footer className="bottom-page">
                <h2><FontAwesomeIcon icon={faCode} /><span>Desenvolvedor</span>João Filipe Viana</h2>
                <div className="info">
                    <p>Links: </p>
                    <nav>
                        <FontAwesomeIcon icon={faGithub} onClick={openLink} link="https://github.com/joaofilipesoares45/" />
                        <FontAwesomeIcon icon={faLinkedin} onClick={openLink} link="https://www.linkedin.com/in/joão-filipe-viana-63abb1263/" />
                        <FontAwesomeIcon icon={faInstagram} onClick={openLink} link="https://www.instagram.com/lippe_viana_01/" />
                        <FontAwesomeIcon icon={faWhatsapp} onClick={() => whatsMsg("86988667039", "Olá, vim pelo Portfólio!")} />
                    </nav>
                </div>
            </footer>
        </div>
    )
}