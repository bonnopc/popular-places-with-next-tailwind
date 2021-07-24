import Button from "modules/common/components/Button";
import Card, { CardContent } from "modules/common/components/Card";

export default function PlaceCardItem({
    division, district, onEdit
}){
    return (
        <Card >
            <CardContent>
                <p className="font-medium">{division?.text}</p>
                <p className="text-xl text-yellow font-medium">{district?.text}</p>
            </CardContent>
            <Button
                variant="secondary"
                fullWidth
                hideXMargin
                onClick={onEdit}
            >
                EDIT
            </Button>
        </Card>
    )
}