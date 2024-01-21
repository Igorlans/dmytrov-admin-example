import Furniture from "./case/Furniture"
import Question from "./case/Question"
import ResidentInfo from "./case/ResidentInfo"
import Room from "./case/Room"
import RoomTable from "./case/RoomTable"
import Table from "./case/Table"

const View = ({data}) => {

    const renderTour = (item) => {
        switch (item.type) {
            case "RESIDENT_INFO" :
                return (
                    <ResidentInfo item={item}/>
                )
            case "ROOM" :
                return (
                    <Room item={item}/>
                )
            case "ROOM_TABLE" :
                return (
                    <RoomTable item={item}/>
                )
            case "TABLE" :
                return (
                    <Table item={item}/>
                )
            case "FURNITURE" :
                return (
                    <Furniture item={item}/>
                )
            case "QUESTION" :
                return (
                    <Question item={item}/>
                )
        }
    }


    return ( 
        <>
            <div className="grid grid cols-2">
               
            </div>

            <div>
                {data?.questionary?.answers?.map((item, index) => 
                    <div key={index}>
                        {renderTour(item)}
                    </div>
                )}
            </div>
        </>
     );
}
 
export default View;