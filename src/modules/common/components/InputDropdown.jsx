import DownArrowIcon from "assets/svg/down_arrow.svg"
import { forwardRef, useEffect, useRef, useState } from "react"
import InputComponent from "./InputComponent"
import { DropdownItems } from "./SearchDropdown"

const InputDropdown = forwardRef(({
    items = [],
    value,
    onChange,
    disabled,
    className,
    noItemText,
    autoComplete,
    isOpenDropdownInitial=false,
    ...restProps
}, ref) => {
    const [isOpenDropdown,setDropdownOpen] = useState(isOpenDropdownInitial)
    const inputRef = useRef(null)

    useEffect(() => {
        window.addEventListener("click", handleClick);

        () => {
            window.removeEventListener("click", handleClick);
        }
    }, [isOpenDropdown])

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
        }
        closeDropdown()
    }

    return (
        <div 
            ref={inputRef}
            className={`relative w-full ${className ?? ''}`}>
            <InputComponent
                ref={ref}
                value={value?.text ?? ''}
                autoComplete="off"
                readOnly
                onFocus={openDropdown}
                endIcon={<DownArrowIcon className={`fill-current text-gray-500 transition-transform ${isOpenDropdown && !disabled ? 'transform rotate-180' : ''}`} />}
                {...restProps}
            />
            {
                isOpenDropdown && !disabled ?
                <DropdownItems
                    items={items}
                    onClick={handleClickItem}
                    noItemText={noItemText}
                /> : ""
            }
        </div>
    )
})

export default InputDropdown