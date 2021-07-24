import Button from "modules/common/components/Button";
import PageHeader from "modules/common/components/PageHeader";
import AddOutlinedIcon from "assets/svg/add_outlined.svg";
import Section from "modules/common/components/Section";
import SectionHeader from "modules/common/components/SectionHeader";
import PlaceCardItem from "./PlaceCardItem";
import { useEffect, useState } from "react";
import UpdatePlaceDrawer from "./UpdatePlaceDrawer";
import actionSetLocationsToStorage from "../actions/actionSetLocationsToStorage";
import actionGetLocationsFromStorage from "../actions/actionGetLocationsFromStorage";


export default function HomeComponent(){
    const [ isOpenRightDrawer, setRightDrawerOpen ] = useState(false);
    const [ locations, setLocations ] = useState([]);
    const [ selectedLocation, setSelectedLocation ] = useState({});

    useEffect(() => {
        setLocations(actionGetLocationsFromStorage())
    }, [])

    const openRightDrawer = () => {
        setRightDrawerOpen(true);
    }

    const closeRightDrawer = () => {
        setRightDrawerOpen(false);
        setSelectedLocation({})
    }

    const onCreateLocation = item => {
        const allLocations = [ ...locations, item ]

        setLocations(allLocations)
        actionSetLocationsToStorage(allLocations)
    }

    const onUpdateLocation = item => {
        const allLocations = locations.map(loc => loc.id === item.id ? {...item} : {...loc})

        setLocations(allLocations)
        actionSetLocationsToStorage(allLocations)
    }

    const handleClickEdit = item => {
        setSelectedLocation(item)
        openRightDrawer()
    }

    return (
        <>
            <PageHeader
                rightAction={(
                    <Button
                        size="large"
                        onClick={openRightDrawer}
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
                {
                    locations?.length ?
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                        {locations.map((location,i) => (
                            <PlaceCardItem 
                                key={i} 
                                {...location} 
                                onEdit={() => handleClickEdit(location)} 
                            />
                        ))}
                    </div> :
                    <p className="text-gray-400">
                        When you add a place, they will appear here
                    </p>
                }
            </Section>
            <UpdatePlaceDrawer
                isOpen={isOpenRightDrawer}
                onClose={closeRightDrawer}
                onCreate={onCreateLocation}
                onUpdate={onUpdateLocation}
                location={selectedLocation}
            />
        </>
    )
}