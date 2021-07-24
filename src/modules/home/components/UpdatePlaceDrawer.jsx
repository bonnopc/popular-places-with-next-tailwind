import Button from "modules/common/components/Button";
import Drawer from "modules/common/components/Drawer";
import { DrawerContent } from "modules/common/components/Drawer";
import { DrawerAction } from "modules/common/components/Drawer";
import { Component } from "react";
// import InputComponent from "modules/common/components/InputComponent";
import SearchDropdown from "modules/common/components/SearchDropdown";
import InputDropdown from "modules/common/components/InputDropdown";
import DynamicListInput from "modules/common/components/DynamicListInput";
import AddIcon from "assets/svg/add_outlined.svg"
import CheckboxGroup from "modules/common/components/CheckboxGroup";
import actionGetDivisions from "../actions/actionGetDivisions";
import actionGetDistricts from "../actions/actionGetDistricts";
import actionGetPopularPlaces from "../actions/actionGetPopularPlaces";
export default class UpdatePlaceDrawer extends Component {
    constructor(props){
        super(props);

        this.ALL_PACKAGES = [
            { title: "Night stay", subTitle: "৳7,000", color: 'yellow', value: "pkg1" },
            { title: "Lunch & Dinner with Traditional Foods", subTitle: "৳3,000", color: 'purple', value: "pkg2" },
            { title: "Hiking with guide", subTitle: "৳3,000", color: 'blue', value: "pkg3" },
            { title: "Day tour on bike", subTitle: "৳2,500", color: 'green', value: "pkg4" },
        ]

        this.state = {
            division: {},
            district: {},
            popularPlaces: [],
            packages: [],
            divisions: [],
            districts: [],
            allPlaces: [],
            isLoadingDivisions: true,
            isLoadingDistricts: false,
            isLoadingAllPlaces: false,
        }

        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
        this.handleChangeDivision = this.handleChangeDivision.bind(this)
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this)
    }

    

    componentDidMount(){
        this.getDivisions()
    }

    componentDidUpdate(prevProps){
        if(prevProps.isOpen && !this.props.isOpen){
            this.resetInputs()
        } else if(!prevProps.isOpen && this.props.isOpen && this.props.location?.id){
            this.setInputValuesToEdit(this.props.location)
        }
    }

    setInputValuesToEdit(location){
        this.setState({
            division: {...location.division},
            district: {...location.district},
            popularPlaces: [...location.popularPlaces],
            packages: [...location.packages],
            isLoadingDistricts: true,
            isLoadingAllPlaces: true
        }, async () => {
            await this.getDistricts(location.division.value)
            await this.getAllPlaces(location.district.value)
        })
    }

    resetInputs(){
        this.setState({
            division: {},
            district: {},
            popularPlaces: [],
            packages: [],
            districts: [],
            allPlaces: [],
        })
    }

    async getDivisions(){
        const divisionResponse = await actionGetDivisions();

        this.setState({ 
            divisions : divisionResponse ?? [],
            isLoadingDivisions : false
        })
    }

    async getDistricts(divisionCode){
        const districtsResponse = await actionGetDistricts(divisionCode);

        this.setState({ 
            districts : districtsResponse ?? [],
            isLoadingDistricts : false
        })
    }

    async getAllPlaces(districtCode){
        const placesResponse = await actionGetPopularPlaces(districtCode);

        this.setState({ 
            allPlaces : placesResponse ?? [],
            isLoadingAllPlaces : false
        })
    }

    handleSubmitForm(event){
        if(event) event.preventDefault()

        const { division, district, popularPlaces, packages } = this.state

        if(this.props.location?.id) this.props.onUpdate({ id: this.props.location.id, division, district, popularPlaces, packages })
        else this.props.onCreate({ id: Date.now(), division, district, popularPlaces, packages })
        
        this.closeDrawer()
    }

    closeDrawer(){
        this.props.onClose()
    }

    handleChangeDivision(division){
        this.setState({
            division,
            district: {},
            isLoadingDistricts: true
        })

        if(division?.value) this.getDistricts(division.value)
    }

    handleChangeDistrict(district){
        this.setState({
            district,
            popularPlaces: [],
            isLoadingAllPlaces: true
        })
        this.getAllPlaces(district.value)
    }

    isValidInputs(){
        if(
            this.state.division?.value &&
            this.state.district?.value &&
            this.state.popularPlaces?.length
        ){
            return true;
        }

        return false
    }

    render(){
        return (
            <Drawer
                isOpen={this.props.isOpen}
                onClose={this.closeDrawer}
            >
                <form 
                    className="flex-grow relative flex flex-col"
                    onSubmit={this.handleSubmitForm}>
                    <DrawerContent
                        onClose={this.closeDrawer}
                    >
                        <SearchDropdown
                            value={this.state.division}
                            label="Division"
                            className="mb-8"
                            items={this.state.divisions.map(division => ({
                                text: division.display,
                                value: division.code
                            }))}
                            isLoading={this.state.isLoadingDivisions}
                            onChange={this.handleChangeDivision}
                        />
                        {
                            this.state.division?.value ?
                            <InputDropdown
                                value={this.state.district}
                                label="District"
                                className="mb-8"
                                isLoading={this.state.isLoadingDistricts}
                                items={this.state.districts.map(district => ({
                                    text: district.display,
                                    value: district.code
                                }))}
                                onChange={this.handleChangeDistrict}
                            /> : ""
                        }
                        {
                            this.state.district?.value ?
                            <>
                                <DynamicListInput
                                    label="Popular Place"
                                    value={this.state.popularPlaces}
                                    className="mb-8"
                                    isLoading={this.state.isLoadingAllPlaces}
                                    items={this.state.allPlaces.map(place => ({
                                        text: place.display,
                                        value: place.code
                                    }))}
                                    placeholder={(
                                        <>
                                            <AddIcon className="mr-2 h-4 w-4" />
                                            Add a place
                                        </>
                                    )}
                                    onChange={popularPlaces => {
                                        this.setState({ popularPlaces })
                                    }}
                                />
                                <CheckboxGroup
                                    label="Packages"
                                    value={this.state.packages}
                                    items={this.ALL_PACKAGES}
                                    onChange={packages => {
                                        this.setState({ packages })
                                    }}
                                />
                            </> : ""
                        }
                        
                    </DrawerContent>
                    <DrawerAction>
                        <Button
                            variant="light"
                            size="large"
                            className="ml-0 mr-0"
                            hideYMargin
                            onClick={this.closeDrawer}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="large"
                            type="submit"
                            disabled={!this.isValidInputs()}
                            className="mr-0"
                            hideYMargin
                            onClick={this.handleSubmitForm}
                        >
                            Submit
                        </Button>
                    </DrawerAction>
                </form>
            </Drawer>
        )
    }
}