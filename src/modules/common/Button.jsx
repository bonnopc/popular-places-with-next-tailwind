export default function Button({
    children,
    className,
    variant="primary",
    size="medium",
}){
    let classWillBe = "flex items-center text-center rounded-lg transition-colors active:shadow-sm my-2";

    // variant
    if(variant === "primary") classWillBe += " bg-blue hover:bg-blue-500 text-white";
    if(variant === "secondary") classWillBe += " bg-blue-50 text-blue";

    // size
    if(size === "large") classWillBe += " px-8 py-4 text-lg mx-8";
    if(size === "medium") classWillBe += " px-4 py-2 mx-4";
    if(size === "small") classWillBe += " px-2 py-1 text-sm mx-2";

    if(className) classWillBe += ` ${className}`;

    return (
        <button className={classWillBe}>
            { children }
        </button>
    )
}