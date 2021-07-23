export default function Section({
    children, className
}){
    return (
        <section className={`bg-white p-8 ${className ?? ""}`}>
            { children }
        </section>
    )
}