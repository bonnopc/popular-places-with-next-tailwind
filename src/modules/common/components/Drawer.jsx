import { useEffect, useRef } from "react";
import Button from "./Button";
import LeftArrowIcon from "assets/svg/left_arrow.svg"

export function DrawerAction({
    children, ...restProps
}){
    return (
        <section
            className="py-4 px-8 flex justify-end sticky bottom-0 w-full border-t-2 bg-white"
            {...restProps}
        >
            { children }
        </section>
    )
}

export function DrawerContent({
    children, onClose, ...restProps
}){
    return (
        <>
            <section
                className="p-12 flex-grow"
                {...restProps}
            >
                <div className="mb-8">
                    <Button
                        variant="secondary"
                        hideXMargin
                        onClick={onClose}
                    >
                        <LeftArrowIcon className="mr-2 fill-current"/>
                        Back
                    </Button>
                </div>
                { children }
            </section>
        </>
    )
}

export default function Drawer({
    isOpen, 
    onClose, 
    children, 
    preventClose = false, 
    ...restProps
}){
    const contentRef = useRef(null);

    useEffect(() => {
        if(isOpen) document.body.classList.add("overflow-y-hidden");
        else if(!isOpen && document.body.classList.contains("overflow-y-hidden")) document.body.classList.remove("overflow-y-hidden");
    }, [isOpen])

    function closeDrawer(event){
        if(isOpen && !preventClose && contentRef?.current && !contentRef.current.contains(event.target)){
            onClose()
        }
    }

    if(!isOpen) return "";

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen z-40 flex justify-end"
            onClick={closeDrawer}
        >
            <div 
                ref={contentRef} 
                className="bg-white rounded-tl-xl w-1/2 lg:w-5/12 xl:w-4/12 opacity-100 flex flex-col relative overflow-y-auto font-baloo shadow-2xl"
            >
                {children}
            </div>
        </div>
    )
}