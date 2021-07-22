import Drawer from "modules/common/Drawer";

export default function UpdatePlaceDrawer({
    isOpen, onClose
}){
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
        >
            UpdatePlaceDrawer
        </Drawer>
    )
}