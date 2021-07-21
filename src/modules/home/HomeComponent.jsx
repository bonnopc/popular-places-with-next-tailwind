import Button from "modules/common/Button";
import PageHeader from "modules/common/PageHeader";
import AddOutlinedIcon from "assets/svg/add_outlined.svg";

export default function HomeComponent(){
    return (
        <div>
            <PageHeader
                rightAction={(
                    <Button
                        // size="large"
                    >
                        <AddOutlinedIcon className="fill-current mr-2"/>
                        Add New Place
                    </Button>
                )}
            >
                Want to add a new place?
            </PageHeader>
        </div>
    )
}