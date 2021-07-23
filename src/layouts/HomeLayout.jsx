export default function HomeLayout({ children }){
    return(
        <div className="font-siliguri text-tblack flex bg-gray-100 min-h-screen">
            <nav className="bg-white fixed inset-0 w-60 xl:w-72 min-h-screen z-10 overflow-y-visible shadow-lg">
                
            </nav>
            <main className="flex flex-col flex-auto overflow-visible w-full px-4 ml-60 xl:ml-72 min-h-screen">
                { children }
            </main>
        </div>
    )
}