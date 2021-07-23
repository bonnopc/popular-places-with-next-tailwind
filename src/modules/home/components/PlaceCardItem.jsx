import Button from "modules/common/components/Button";
import Card, { CardContent } from "modules/common/components/Card";

export default function PlaceCardItem(){
    return (
        <Card >
            <CardContent>
                <p className="font-medium">মানিকগঞ্জ</p>
                <p className="text-xl text-yellow font-medium">হরিরামপুর</p>
            </CardContent>
            <Button
                variant="secondary"
                fullWidth
                hideXMargin
            >
                EDIT
            </Button>
        </Card>
    )
}