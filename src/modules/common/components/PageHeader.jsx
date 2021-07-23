export default function PageHeader({
    children, rightAction
}){
    return (
        <div className="rounded-lg bg-white flex justify-between items-center px-10 py-16 mb-4 rounded-md">
            <h2 className="text-5xl text-blue-900 font-semibold">{ children }</h2>
            { rightAction ?? "" }
        </div>
    )
}