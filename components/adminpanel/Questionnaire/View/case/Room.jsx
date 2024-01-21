 
const Room = ({item}) => {

    return ( 
        <div style={{maxWidth: '300px'}}>  
            <div style={{fontWeight: 600, fontSize: '20px'}}>
                Вибрані приміщення
            </div>
            {
                item.answers.rooms.map(item => 
                    <div style={{border: "1px solid #e55733", borderRadius: '10px', padding: '10px', marginBottom: '20px'}}>
                        <div style={{fontSize: '20px'}}>
                            {item?.name}
                        </div>
                        <div style={{width: '100%', height: '1px', margin: '10px 0px', backgroundColor: "#e55733"}}></div>
                        <div>
                            <div style={{fontSize: '14px'}}>Коментар:</div>
                            {item?.comment}
                        </div>
                        {/* <div>
                            <div style={{fontSize: '14px'}}>Наповнення:</div>
                            {item.RoomFurniture.map(furniture => 
                                <div style={{backgroundColor: "#e55733", borderRadius: '10px', padding: '2px 5px', marginBottom: '5px', color: '#fff'}}>
                                    {furniture.name}
                                </div>    
                            )}
                        </div> */}
                    </div>
                )
            }    
        </div>
     );
}
 
export default Room;