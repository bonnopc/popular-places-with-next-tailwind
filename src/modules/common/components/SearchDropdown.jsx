import { forwardRef, useEffect, useRef, useState } from "react";
import InputComponent from "./InputComponent";
import SearchIcon from "assets/svg/search.svg";
import CloseIcon from "assets/svg/close.svg";
import getItemsByStringSearch from "helpers/getItemsByStringSearch";

export const DropdownItems = ({ items, onClick, noItemText }) => {
    return (
        <ul className="absolute top-full left-0 w-full shadow-lg rounded-md max-h-48 overflow-y-auto z-20 bg-white">
            {
                items?.length ? items.map((item,i) => (
                    <li
                        className={`px-8 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${i === items.length - 1 ? 'border-b rounded-b-md' : ''} ${i === 0 ? 'rounded-t-md' : ''}`}
                        key={item.value}
                        onClick={() => onClick(item)}
                    >{item.text}</li>
                )) :
                <li className="px-8 py-4 text-xs">
                    {noItemText ?? "We can't find anything related to your search keyword, Try with other keyword.."}
                </li>
            }
        </ul>
    )
}

const SearchDropdown = ({
    items = [],
    value,
    onChange,
    className,
    isLoading=false,
    onSearch,
    autoComplete,
    isOpenDropdownInitial=false,
    // onClickEndIcon,
    ...restProps
}) => {
    const [isOpenDropdown,setDropdownOpen] = useState(isOpenDropdownInitial)
    const [filteredItems,setFilteredItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const inputDelay = useRef(null)
    const inputContainerRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        window.addEventListener("click", handleClick);

        () => {
            window.removeEventListener("click", handleClick);
        }
    }, [isOpenDropdown])

    useEffect(() => {
        if(inputDelay.current !== null) clearTimeout(inputDelay.current);

        inputDelay.current = setTimeout(() => {
            if(onSearch) onSearch(searchValue)
        }, 300);

        () => {
            if(inputDelay.current != null) clearTimeout(inputDelay.current)
        }
    }, [searchValue])

    useEffect(() => {
        setFilteredItems(getItemsByStringSearch({
            items: value?.value ? items.filter(e => value.value === e.value) : items,
            searchQuery: searchValue,
            keyToSearch: 'text'
        }))
    }, [items?.length,value,searchValue])

    const handleClick = event => {
        if(isOpenDropdown && inputContainerRef?.current && !inputContainerRef.current.contains(event.target)){
            closeDropdown()
        }
    }

    const openDropdown = () => {
        setDropdownOpen(true)
    }

    const closeDropdown = () => {
        setDropdownOpen(false)
    }

    const handleClickItem = item => {
        if(item?.value !== value?.value && onChange){
            onChange(item)
            setSearchValue(item.text)
        }
        closeDropdown()
    }

    const handleChangeSearchValue = event => {
        setSearchValue(event.target.value)
        onChange({})
    }

    const clearValue = () => {
        setSearchValue('');
        if(onChange) onChange({})
    }

    return (
        <div 
            ref={inputContainerRef}
            className={`relative w-full ${className ?? ''}`}>
            <InputComponent
                ref={inputRef}
                value={searchValue || value?.text || ''}
                autoComplete="off"
                // type="search"
                onFocus={openDropdown}
                endIcon={
                    (value?.value || searchValue) && !isLoading ?
                    <CloseIcon className="fill-current text-gray-500 " /> :
                    <SearchIcon className={`fill-current text-gray-500 ${isLoading ? 'animate-ping' : ''}`} />
                }
                onChange={handleChangeSearchValue}
                onClickEndIcon={clearValue}
                {...restProps}
            />
            {
                isOpenDropdown && !isLoading ?
                <DropdownItems
                    items={filteredItems}
                    onClick={handleClickItem}
                /> : ""
            }
        </div>
    )
}

export default SearchDropdown