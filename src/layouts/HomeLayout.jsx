export default function HomeLayout({ children }){
    return(
        <div className="font-siliguri flex bg-gray-100 min-h-screen">
            <nav className="bg-white fixed inset-0 w-60 xl:w-72 h-screen z-50 overflow-y-visible shadow-lg">
                
            </nav>
            <main className="flex-auto overflow-visible w-full px-4 ml-60 xl:ml-72">
                { children }
            </main>
        </div>
    )
}