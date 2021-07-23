import Button from "modules/common/components/Button";
import PageHeader from "modules/common/components/PageHeader";
import AddOutlinedIcon from "assets/svg/add_outlined.svg";
import Section from "modules/common/components/Section";
import SectionHeader from "modules/common/components/SectionHeader";
import PlaceCardItem from "./PlaceCardItem";
import { useState } from "react";
import UpdatePlaceDrawer from "./UpdatePlaceDrawer";


export default function HomeComponent(){
    const [ isOpenRightDrawer, setRightDrawerOpen ] = useState(false);

    function toggleRightDrawerOpen(){
        setRightDrawerOpen(isOpen => !isOpen);
    }

    return (
        <>
            <PageHeader
                rightAction={(
                    <Button
                        size="large"
                        onClick={toggleRightDrawerOpen}
                    >
                        <AddOutlinedIcon className="fill-current mr-2"/>
                        Add New Place
                    </Button>
                )}
            >
                Want to add a new place?
            </PageHeader>
            <Section className="flex-grow">
                <SectionHeader>Popular Places</SectionHeader>
                <div className="grid grid-cols-3 gap-4">
                    {[0,1,2,3,4,5,6,7].map(i => <PlaceCardItem key={i} />)}
                </div>
            </Section>
            <UpdatePlaceDrawer
                isOpen={isOpenRightDrawer}
                onClose={toggleRightDrawerOpen}
            />
        </>
    )
}