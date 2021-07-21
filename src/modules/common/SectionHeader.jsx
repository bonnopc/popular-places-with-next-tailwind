export default function SectionHeader({
    children
}){
    return (
        <div className="flex items-center mb-8">
            <h4 className="font-semibold text-3xl leading-6">{children}</h4>
            <div className="flex-grow ml-4 mr-64 h-px bg-blue-300" />
        </div>
    )
}