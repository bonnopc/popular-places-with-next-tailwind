import Button from "modules/common/components/Button";
import Drawer from "modules/common/components/Drawer";
import { DrawerContent } from "modules/common/components/Drawer";
import { DrawerAction } from "modules/common/components/Drawer";
import { Component } from "react";
// import InputComponent from "modules/common/components/InputComponent";
import SearchDropdown from "modules/common/components/SearchDropdown";

export default class UpdatePlaceDrawer extends Component {
    constructor(props){
        super(props)

        this.state = {
            district: {}
        }

        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    handleSubmitForm(event){
        if(event) event.preventDefault()

        console.log("state", this.state)
    }

    render(){
        return (
            <Drawer
                isOpen={this.props.isOpen}
                onClose={this.props.onClose}
            >
                <form 
                    className="flex-grow relative flex flex-col"
                    onSubmit={this.handleSubmitForm}>
                    <DrawerContent
                        onClose={this.props.onClose}
                    >
                        <SearchDropdown
                            value={this.state.district}
                            label="District"
                            items={[
                                { text: "Dhaka", value: "Dhaka" },
                                { text: "Chittagong", value: "Chittagong" },
                                { text: "Sylhet", value: "Sylhet" },
                            ]}
                            onChange={district => {
                                console.log({district})
                                this.setState({ district })
                            }}
                        />
                    </DrawerContent>
                    <DrawerAction>
                        <Button
                            variant="light"
                            size="large"
                            onClick={this.props.onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="large"
                            type="submit"
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