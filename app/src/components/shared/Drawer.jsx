import { useEffect } from "react";
import { useDrawer } from "../../hooks/useDrawer"

const titleMAP = {
    review: "Reviews",
}

const Drawer = ({ children, type, showNewBtn = false, newBtnLabel = "Create", onNewClick = () => {} }) => {
    const [isOpen, setIsOpen] = useDrawer(type);

    return (
        <div className={`flex justify-end absolute top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-60 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className={`lg:w-[450px] w-screen h-screen overflow-y-auto absolute right-0 top-0 bg-slate-50 transition-all ${isOpen ? "mr-[0]" : "lg:mr-[-450px] mr-[-100%]"}`}>
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex gap-4 items-center">
                        {
                            showNewBtn && (
                                <button className="btn" onClick={() => onNewClick(setIsOpen)}>
                                    {newBtnLabel}
                                </button>
                            )
                        }
                    </div>
                    <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
                        <i className="fa-solid fa-xmark p-4 text-[30px]"></i>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Drawer