export default function IconButton({
    children,
    className,
    ...restProps
}){
    return (
        <button
            className={`w-12 h-12 flex justify-center items-center hover:bg-black hover:bg-opacity-5 rounded-full ${className ?? ''}`}
            {...restProps}
        >
            { children }
        </button>
    )
}