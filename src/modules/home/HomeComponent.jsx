import Button from "modules/common/Button";
import PageHeader from "modules/common/PageHeader";
import AddOutlinedIcon from "assets/svg/add_outlined.svg";
import Section from "modules/common/Section";
import SectionHeader from "modules/common/SectionHeader";
import PlaceCardItem from "./PlaceCardItem";


export default function HomeComponent(){
    return (
        <>
            <PageHeader
                rightAction={(
                    <Button>
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
        </>
    )
}