import { forwardRef } from "react";

const InputComponent = forwardRef(({
    label,
    type="text",
    name,
    endIcon,
    onClickEndIcon,
    ...restProps
}, ref) => {
    const handleClickEndIcon = () => {
        if(onClickEndIcon) onClickEndIcon()
        if(ref) ref.current.focus()
    }

    return (
        <div className="flex flex-col">
            <label 
                className="mb-2"
                htmlFor={name}>{label}</label>
            <div className="relative flex w-full">
                <input 
                    type={type} 
                    name={name ?? label.trim()}
                    ref={ref}
                    className="p-4 leading-6 bg-indigo-50 w-full rounded-md transition-colors focus:outline-none focus:bg-indigo-100"
                    {...restProps}
                />
                {
                    endIcon ? 
                    <div className="absolute right-0 top-0 h-full inline-flex items-center px-2">
                        <span
                            className={`w-10 h-10 inline-flex items-center justify-center transition-colors rounded-full ${onClickEndIcon ? 'cursor-pointer hover:bg-black hover:bg-opacity-5' : ''}`}
                            onClick={handleClickEndIcon}
                        >
                            { endIcon }
                        </span>
                    </div> : ""
                }
            </div>
        </div>
    )
})

export default InputComponent;