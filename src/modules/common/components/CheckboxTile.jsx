export default function CheckboxTile({
    children, 
    isChecked, 
    onClick,
    value,
    className,
}){
    return (
        <div 
            className={`flex items-center p-4 rounded-md cursor-pointer hover:bg-black hover:bg-opacity-5 ${className ?? ''}`}
            onClick={onClick}
        >
            <div className="flex-grow">
                { children }
            </div>
            <input 
                type="checkbox" 
                value={value}
                className="ring-red-500"
                checked={isChecked} 
                readOnly
                onChange={() => false}
                onClick={() => false}
            />
        </div>
    )
}