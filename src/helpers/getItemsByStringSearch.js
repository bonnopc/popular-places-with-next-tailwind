export default function getItemsByStringSearch({
    items=[],
    searchQuery="",
    keyToSearch=""
}){
    return searchQuery ? items.filter(item => {
        const re = new RegExp(searchQuery, 'i');
        return re.test(item[keyToSearch]);
    }) : items;
}