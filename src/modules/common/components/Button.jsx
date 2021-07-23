export default function Button({
    children,
    className,
    variant="primary",
    size="medium",
    type="button",
    fullWidth,
    hideXMargin,
    hideYMargin,
    disabled,
    ...restProps
}){
    let classWillBe = "flex items-center justify-center text-center rounded-2xl transition-colors active:shadow-sm font-medium";

    if(!hideYMargin) classWillBe += " my-2";

    if(disabled) classWillBe += " bg-gray-200 text-white cursor-not-allowed";

    // variant
    if(variant === "primary" && !disabled) classWillBe += " bg-blue hover:bg-blue-700 text-white";
    else if(variant === "secondary" && !disabled) classWillBe += " bg-blue-100 hover:bg-blue-200 text-blue";
    else if(variant === "light" && !disabled) classWillBe += " bg-white hover:bg-gray-50 text-blue";

    // size
    if(size === "large") classWillBe += ` px-8 py-4 text-lg ${!hideXMargin ? "mx-8" : ""}`;
    else if(size === "medium") classWillBe += ` px-4 py-2 ${!hideXMargin ? "mx-4" : ""}`;
    else if(size === "small") classWillBe += ` px-2 py-1 text-sm ${!hideXMargin ? "mx-2" : ""}`;

    if(fullWidth) classWillBe += " w-full";

    if(className) classWillBe += ` ${className}`;

    return (
        <button 
            className={classWillBe}
            disabled={disabled}
            type={type}
            {...restProps}
        >
            { children }
        </button>
    )
}