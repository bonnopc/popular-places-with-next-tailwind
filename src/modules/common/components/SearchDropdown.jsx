import { forwardRef, useEffect, useRef, useState } from "react";
import InputComponent from "./InputComponent";
import SearchIcon from "assets/svg/search.svg";

const DropdownItems = ({ items, onClick }) => {
    return (
        <ul className="absolute top-full left-0 w-full shadow-lg rounded-md max-h-48 overflow-y-auto">
            {
                items?.length ? items.map((item,i) => (
                    <li
                        className={`px-8 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${i === items.length - 1 ? 'border-b rounded-b-md' : ''} ${i === 0 ? 'rounded-t-md' : ''}`}
                        key={item.value}
                        onClick={() => onClick(item)}
                    >{item.text}</li>
                )) :
                <li className="px-8 py-4 text-xs">
                    We can't find anything related to your search keyword, Try with other keyword..
                </li>
            }
        </ul>
    )
}

const SearchDropdown = forwardRef(({
    items = [],
    value,
    onChange,
    isLoadingResult=false,
    onSearch,
    autoComplete,
    isOpenDropdownInitial=false,
    ...restProps
}, ref) => {
    const [isOpenDropdown,setDropdownOpen] = useState(isOpenDropdownInitial)
    const [searchValue, setSearchValue] = useState(value?.text ?? '')
    const inputDelay = useRef(null)
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

    const handleClick = event => {
        if(isOpenDropdown && inputRef?.current && !inputRef.current.contains(event.target)){
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
    }

    return (
        <div 
            ref={inputRef}
            className="relative w-full">
            <InputComponent
                ref={ref}
                value={searchValue}
                autoComplete="off"
                type="search"
                onFocus={openDropdown}
                endIcon={<SearchIcon className={`fill-current text-gray-500 ${isLoadingResult ? 'animate-ping' : ''}`} />}
                onChange={handleChangeSearchValue}
                {...restProps}
            />
            {
                isOpenDropdown && !isLoadingResult &&
                <DropdownItems
                    items={items}
                    onClick={handleClickItem}
                />
            }
        </div>
    )
})

export default SearchDropdown