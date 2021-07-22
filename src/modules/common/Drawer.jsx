import { useRef } from "react";

export default function Drawer({
    isOpen, 
    onClose, 
    children, 
    preventClose = false, 
    ...restProps
}){
    const contentRef = useRef(null);

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
                className="bg-white rounded-tl-md w-1/2 opacity-100"
            >
                Content
            </div>
        </div>
    )
}