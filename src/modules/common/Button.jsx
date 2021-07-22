export default function Button({
    children,
    className,
    variant="primary",
    size="medium",
    fullWidth,
    hideXMargin,
    hideYMargin,
    ...restProps
}){
    let classWillBe = "flex items-center justify-center text-center rounded-lg transition-colors active:shadow-sm font-medium";

    if(!hideYMargin) classWillBe += " my-2";

    // variant
    if(variant === "primary") classWillBe += " bg-blue hover:bg-blue-700 text-white";
    else if(variant === "secondary") classWillBe += " bg-blue-50 hover:bg-blue-100 text-blue";

    // size
    if(size === "large") classWillBe += ` px-8 py-4 text-lg ${!hideXMargin ? "mx-8" : ""}`;
    else if(size === "medium") classWillBe += ` px-4 py-2 ${!hideXMargin ? "mx-4" : ""}`;
    else if(size === "small") classWillBe += ` px-2 py-1 text-sm ${!hideXMargin ? "mx-2" : ""}`;

    if(fullWidth) classWillBe += " w-full";

    if(className) classWillBe += ` ${className}`;

    return (
        <button 
            className={classWillBe}
            {...restProps}
        >
            { children }
        </button>
    )
}