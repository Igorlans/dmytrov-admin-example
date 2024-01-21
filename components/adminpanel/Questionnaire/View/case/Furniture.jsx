 


const Furniture = ({item}) => {

    const groupedFurniture = 
        item.answers.furniture.reduce((result, furniture) => {
            const { roomId } = furniture;
            if (!result[roomId]) {
                result[roomId] = [];
            }
            result[roomId].push(furniture);
            return result;
        }, {});


    return ( 
        <>
            <div style={{fontWeight: 600, fontSize: '20px'}}>
                Наповнення приміщень:
            </div>
            {
                Object.entries(groupedFurniture).map(([id, furniture]) =>
                   <div style={{border: "1px solid #e55733", borderRadius: '10px', padding: '10px', marginBottom: '20px'}}>
                        <div style={{marginBottom: '10px'}}>
                            {furniture[0].roomName}
                        </div>
                    {
                        furniture.map(item => 
                            <div className="flex justify-between" style={{borderBottom: "1px dashed #e55733", marginBottom: '10px'}}>
                                <div style={{}}>{item.name}</div>
                                <div>{item.comment}</div>
                            </div>
                        )
                     }
                   </div>
                )
            }
        </>
     );
}
 
export default Furniture;