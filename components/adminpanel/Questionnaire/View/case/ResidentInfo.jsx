 
const ResidentInfo = ({item}) => {

    console.log("ResidentInfo",item)

    return ( 
        <>
            <div style={{fontWeight: 600, fontSize: '20px'}}>
                {
                    item.isForRent ? "Для здачі в оренду" : <div>Проживаючих: {item.answers?.residentQuantity}</div>
                }   
            </div>
            <div style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll', marginBottom: '20px'}}>
                {
                    item.answers?.residents?.map(item => 
                        <div style={{width: '300px', border: "1px solid #e55733", borderRadius: '10px', padding: '10px'}}>
                            Особа:
                            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: "1px dashed #e55733", marginBottom: '10px'}}><div>Ім'я: </div> {item.name}</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: "1px dashed #e55733", marginBottom: '10px'}}><div>Вік: </div> {item.age}</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: "1px dashed #e55733", marginBottom: '10px'}}><div>Ріст: </div> {item.height}см</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: "1px dashed #e55733", marginBottom: '10px'}}><div>Вага: </div> {item.weight}кг</div>
                            {
                                item?.preferences ? <div>Особиловості: {item?.preferences}</div> : null
                            }
                        </div>
                    )
                }
            </div>
        </>
     );
}
 
export default ResidentInfo;