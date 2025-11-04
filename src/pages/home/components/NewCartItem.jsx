import { useContext } from "react"
import { DataContext } from "../../../context/DataContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { closeModal, openModal } from "../../../utils/functions"

export default function NewCartItem() {

    const { cartShop } = useContext(DataContext)

    return (
        <div className="modal new-item-modal pointer-events-none! bg-[rgba(0,0,0,0.25)] [[open]]:[&>div.content]:animate-[var(--show-top)] [[open]]:[&>div.content]:pointer-events-auto! flex justify-center items-center">
            {cartShop.length > 0 &&
                <div className="content bg-white shadow-md p-2 rounded-md  w-full max-w-[400px] mx-2">
                    <h2 className="w-full flex justify-between items-center">Produto adicionado ao carrinho! <FontAwesomeIcon icon={faXmark} onClick={() => closeModal("new-item-modal")}/></h2>
                    <div className="flex flex-col items-center gap-1.5 my-2.5">
                        <img src={"/webshop-2/" + cartShop[cartShop.length - 1].lista_img[0] + ".jpg"} alt="" className="max-w-[80px] rounded-sm" />
                        <h3 className="text-xs">{cartShop[cartShop.length - 1].nome}</h3>
                    </div>

                    <button className="text-[.9rem] font-semibold p-2 bg-red-800 text-white hover:bg-red-950 w-full justify-center!" onClick={() => {
                        closeModal("new-item-modal")
                        openModal("cart-modal")
                    }}>Ver carrinho</button>
                </div>
            }
        </div>
    )
}