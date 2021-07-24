export default function IconButton({
    children,
    className,
    type="button",
    ...restProps
}){
    return (
        <button
            className={`w-12 h-12 flex justify-center items-center hover:bg-black hover:bg-opacity-5 rounded-full ${className ?? ''}`}
            type={type}
            {...restProps}
        >
            { children }
        </button>
    )
}