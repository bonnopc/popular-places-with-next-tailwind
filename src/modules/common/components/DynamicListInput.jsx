import { useEffect, useRef, useState } from "react"
import IconButton from "./IconButton"
import { DropdownItems } from "./SearchDropdown"
import RemoveIcon from "assets/svg/remove.svg"

function SelectedItem({ text, value, onClickRemove, isLastItem }){
    return (
        <li className={`flex items-center ${!isLastItem ? 'mb-4' : ''}`}>
            <div className="flex-grow leading-6 p-4 border-2 border-blue-100 rounded-md">
                { text }
            </div>
            <IconButton
                className="border-2 border-blue-100 w-14 h-14 ml-6"
                onClick={onClickRemove}
            >
                <RemoveIcon className="fill-current text-gray-500 w-4 h-4" />
            </IconButton>
        </li>
    )
}

function SelectedItems({ items, onRemove }){
    if(!items?.length) return "";

    return (
        <ul className="mb-4">
            {items.map((item,i) => (
                <SelectedItem
                    key={item.value}
                    isLastItem={i === items.length - 1}
                    onClickRemove={() => onRemove(item)}
                    {...item}
                />
            ))}
        </ul>
    )
}

export default function DynamicListInput({
    items = [],
    value = [],
    onChange,
    label,
    placeholder,
    disabled,
    name,
    className,
}){
    const [isOpenDropdown,setDropdownOpen] = useState(false)
    const [searchedValue,setSearchedValue] = useState("")
    const [filteredItems,setFilteredItems] = useState([])
    const inputContainerRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        window.addEventListener("click", handleClick);
        if(isOpenDropdown) if(inputRef?.current) inputRef.current.focus();

        () => {
            window.removeEventListener("click", handleClick);
        }
    }, [isOpenDropdown])

    useEffect(() => {
        setFilteredItems(getFilteredItemsBySearchValue(items,value,searchedValue))
    }, [items,value,searchedValue])

    const getFilteredItemsBySearchValue = (itemsFromParent,selectedVal,searchVal) => {
        return itemsFromParent.filter(e => !selectedVal.find(vl => vl.value === e.value)).filter(item => {
            if(searchVal){
                const re = new RegExp(searchVal, 'i');
                return re.test(item.text);
            } else return item;
        })
    }

    const openDropdown = () => {
        setDropdownOpen(true)
        if(inputRef?.current) inputRef.current.click()
    }

    const closeDropdown = () => {
        setDropdownOpen(false)
        setSearchedValue("")
    }

    const handleClickItem = item => {
        if(item?.value !== value?.value && onChange){
            const prevVal = value?.length ? [...value] : [];
            prevVal.push(item)

            onChange(prevVal)
        }
        closeDropdown()
    }

    const handleRemoveItem = item => {
        if(onChange) onChange(value.filter(i => i.value !== item.value))
    }

    const handleClick = event => {
        if(isOpenDropdown && inputContainerRef?.current && !inputContainerRef?.current?.contains(event.target)){
            closeDropdown()
        }
    }

    return (
        <div>
            
            <div
                className={`flex flex-col ${className ?? ''}`}
                ref={inputContainerRef}
            >
                <label 
                    htmlFor={name ?? label.trim()}
                    className="mb-2 font-medium text-sm"
                >
                    { label }
                </label>
                <SelectedItems 
                    items={value} 
                    onRemove={handleRemoveItem}
                />
                <div 
                    className={`relative ${value?.length ? 'mr-20' : ''}`}
                >
                    <input 
                        type="text"
                        value={searchedValue}
                        placeholder="Search here"
                        ref={inputRef}
                        onChange={e => setSearchedValue(e.target.value)}
                        className={`p-4 leading-6 w-full rounded-md transition-colors focus:outline-none focus:bg-blue-100 ${!isOpenDropdown ? 'hidden' : ''}`}
                    />
                    <div 
                        className={`p-4 leading-6 border-2 cursor-text border-dashed rounded-md border-blue-100 w-full text-center flex items-center justify-center text-sm ${isOpenDropdown ? 'hidden' : ''}`}
                        onClick={openDropdown}
                    >
                        { placeholder }
                    </div>
                    {
                        isOpenDropdown && !disabled ?
                        <DropdownItems
                            items={filteredItems}
                            onClick={handleClickItem}
                            noItemText="No option found!"
                        /> : ""
                    }
                </div>
            </div>
        </div>
    )
}