import { forwardRef } from "react";

const InputComponent = forwardRef(({
    label,
    type="text",
    name,
    endIcon,
    ...restProps
}, ref) => {
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
                    <span
                        className="absolute right-0 top-0 h-full inline-flex items-center px-3"
                    >{ endIcon }</span> : ""
                }
            </div>
        </div>
    )
})

export default InputComponent;