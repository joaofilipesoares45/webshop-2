import { faArrowRight, faTrashAlt, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { closeModal, numberForBrl } from "../../../utils/functions"
import { saveData } from "../../../utils/save-functions"
import { DataContext } from "../../../context/DataContext"

export default function CartModal() {
    const { cartShop, setCartShop } = useContext(DataContext)

    const deleteItemCart = (item) => {
        setCartShop(saveData("local-s", "cart", undefined, "id", item.id, undefined));
    }

    const getTotal = () => {
        let total = 0
        cartShop.forEach(({valor}) => {
            total += valor
        });
        return total
    }

    return (
        <div className="modal cart-modal bg-[rgba(0,0,0,0.76)] flex justify-end [[open]]:[&>div.content]:animate-[var(--show-left)]">
            <div className="content bg-white  h-full w-full max-w-[430px] p-2.5 flex flex-col">
                <h2 className="flex justify-between items-center border-b-2 text-xl mb-2.5 pb-[7px]">Carrinho de Compras<FontAwesomeIcon icon={faXmark} onClick={() => closeModal("cart-modal")} /></h2>
                <div className="flex flex-col gap-2.5 h-full w-full overflow-y-auto no-scrollbar">
                    {cartShop.length > 0 ?
                        cartShop.map(({ nome, valor, lista_img }, index) => {
                            return (
                                <div className="item relative overflow-hidden flex animate-[var(--show-top)] justify-between gap-2 bg-[#610303e6] text-white shadow-[0_0_3px_rgb(0,0,0,.2)] rounded-sm p-[5px] hover:[&>nav]:transform-none" key={"fav" + index}>
                                    <div className="px-[5px]">
                                        <h2 className="text-[.8rem]">{nome}</h2>
                                        <p className="text-[.9rem] font-bold">{numberForBrl(valor)}</p>
                                    </div>
                                    <img src={"/webshop-2/" + lista_img[0] + ".jpg"} alt="" className="max-w-[80px] rounded-sm" />
                                    <nav className="absolute top-[5px] right-[5px] w-[80px] h-[calc(100%_-_9px)] transform-[translateX(200px)] transition-all flex flex-col justify-evenly items-center gap-1.5 rounded-sm bg-[#ffffff] text-black [&>svg]:text-[1.1rem] [&>svg]:hover:text-red-600">
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteItemCart(cartShop[index])}/>
                                    </nav>
                                </div>
                            )
                        })
                        : <span className="w-full h-full flex items-center justify-center"><p className="mb-[50px]">Nenhum produto no carrinho!!</p></span>}
                </div>
                {cartShop.length > 0 && 
                <div className="flex flex-col gap-2.5">
                    <span className="flex justify-between">Subtotal: <p>{numberForBrl(getTotal())}</p></span>
                    <button className="bg-red-600 text-white p-2.5 hover:bg-red-800! hover:text-white!">Finalizar pedido <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>}
            </div>
        </div>
    )
}