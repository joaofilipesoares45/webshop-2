import { faCartShopping, faHeartBroken, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { closeModal, numberForBrl, openModal } from "../../../utils/functions"
import { saveData } from "../../../utils/save-functions"
import { DataContext } from "../../../context/DataContext"

export default function FavoritesModal() {
    const { favorites, setFavorites, setCartShop } = useContext(DataContext)

    const deleteFavorite = (item) => {
        setFavorites(saveData("local-s", "favorites", undefined, "id", item.id, undefined));
    }

    const addCart = (item) => {
        setCartShop(saveData("local-s", "cart", "kasd", 0, 0, item))
        deleteFavorite(item)
        closeModal("favorites-modal")
        openModal("cart-modal")
    }

    return (
        <div className="modal favorites-modal bg-[rgba(0,0,0,0.76)] flex justify-end [[open]]:[&>div.content]:animate-[var(--show-left)]">
            <div className="content bg-white  h-full w-full max-w-[430px] p-2.5 flex flex-col">
                <h2 className="flex justify-between items-center border-b-2 text-xl mb-2.5 pb-[7px]">Favoritos <FontAwesomeIcon icon={faXmark} onClick={() => closeModal("favorites-modal")} /></h2>
                <div className="flex flex-col gap-2.5 h-full w-full overflow-y-auto no-scrollbar">
                    {favorites.length > 0 ?
                        favorites.map(({ nome, valor, lista_img }, index) => {
                            return (
                                <div className="item relative overflow-hidden flex animate-[var(--show-top)] justify-between gap-2 bg-[#b71414e6] text-white shadow-[0_0_3px_rgb(0,0,0,.2)] rounded-sm p-[5px] hover:[&>nav]:transform-none" key={"fav" + index}>
                                    <div className="px-[5px]">
                                        <h2 className="text-[.8rem]">{nome}</h2>
                                        <p className="text-[.9rem] font-bold">{numberForBrl(valor)}</p>
                                    </div>
                                    <img src={"/webshop-2/" + lista_img[0] + ".jpg"} alt="" className="max-w-[80px] rounded-sm" />
                                    <nav className="absolute top-[5px] right-[5px] w-[80px] h-[calc(100%_-_9px)] transform-[translateX(200px)] transition-all flex flex-col justify-evenly items-center gap-1.5 rounded-sm bg-[#ffffff] text-black [&>svg]:text-[1.1rem] [&>svg]:hover:text-red-600">
                                        <FontAwesomeIcon icon={faCartShopping} onClick={() => addCart(favorites[index])}/>
                                        <FontAwesomeIcon icon={faHeartBroken} onClick={() => deleteFavorite(favorites[index])} />
                                    </nav>
                                </div>
                            )
                        })
                        : <span className="w-full h-full flex items-center justify-center"><p className="mb-[50px]"> Nenhum item adicionado aos favoritos!!</p></span>}
                </div>
            </div>
        </div>
    )
}