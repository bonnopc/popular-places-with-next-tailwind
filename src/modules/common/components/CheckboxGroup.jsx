import CheckboxTile from "./CheckboxTile";

export default function CheckboxGroup({
    items=[],
    value=[],
    label,
    className,
    onChange,
}){
    const isCheckedItem = (item) => Boolean(value.find(vl => item.value === vl.value));

    const handleClickItem = (item) => {
        if(isCheckedItem(item)) onChange(value.filter(it => it.value !== item.value))
        else onChange([...value, item])
    }

    return (
        <div className={`flex flex-col ${className ?? ''}`}>
            <label 
                className="mb-3 font-medium text-sm"
            > { label } </label>
            {items.map((item,i) => (
                <CheckboxTile
                    key={i}
                    value={item.value}
                    isChecked={isCheckedItem(item)}
                    onClick={() => handleClickItem(item)}
                >
                    <div className="flex items-center">
                        <div
                            className={`w-12 h-12 rounded-md bg-${item.color}-100 mr-4`}
                        />
                        <div>
                            <h6 className={`font-semibold text-base text-${item.color}-500`}>{ item.title }</h6>
                            <p className="font-semibold text-blue-800"> { item.subTitle } </p>
                        </div>
                    </div>
                </CheckboxTile>
            ))}
        </div>
    )
}