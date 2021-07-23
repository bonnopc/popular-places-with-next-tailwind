export function CardContent({
    children
}){
    return (
        <div className="flex flex-col h-40 overflow-y-hidden justify-center">
            { children }
        </div>
    )
}

export default function Card({
    children, className
}){
    return (
        <div className={`bg-white rounded-lg border border-blue-300 p-4 ${className ?? ""}`}>
            { children }
        </div>
    )
}