import { forwardRef } from "react";

const InputComponent = forwardRef(({
    label,
    type="text",
    name,
    endIcon,
    className,
    isLoading,
    disabled,
    onClickEndIcon,
    errorText,
    ...restProps
}, ref) => {
    const handleClickEndIcon = () => {
        if(onClickEndIcon) onClickEndIcon()
        if(ref) ref.current.focus()
    }

    return (
        <div className={`flex flex-col ${isLoading ? 'animate-pulse' : ''} ${className ?? ''}`}>
            {
                isLoading ?
                <div className="h-5 w-24 bg-blue-50 mb-3 rounded-md" /> :
                <label 
                    className="mb-3 font-medium text-sm"
                    htmlFor={name ?? label.trim()}>{label}</label>
            }
            
            <div className="relative flex w-full">
                <input 
                    type={type} 
                    name={name ?? label.trim()}
                    ref={ref}
                    disabled={disabled || isLoading}
                    className={`p-4 leading-6 w-full rounded-md transition-colors focus:outline-none ${errorText ? "bg-red-50 focus:bg-red-100" : "bg-blue-50 focus:bg-blue-100"}`}
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
            {
                errorText ?
                <p className="text-red-500 text-xs my-1">{errorText}</p> : ""
            }
        </div>
    )
})

export default InputComponent;