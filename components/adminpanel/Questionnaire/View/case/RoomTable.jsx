const RoomTable = ({ item }) => {
    console.log("Room Table ======", item);

    return (
        <div className="mb-10">
            <div style={{ fontWeight: 600, fontSize: "20px" }}>
                {`Таблиця з приміщенями: ${item.text}`}
            </div>
            <div>
                {item.answers.picks.map((item) => (
                    <div
                        style={{
                            border: "1px solid #e55733",
                            borderRadius: "10px",
                            padding: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ fontSize: "20px" }}>
                            {item?.room.name}
                        </div>
                        <div
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            {item?.option?.options?.map((option) => (
                                <div>{option.text}</div>
                            ))}
                            {item?.option?.comment && (
                                <div>Коментар: {item?.option?.comment}</div>
                            )}
                        </div>

                        {/*<div>*/}
                        {/*    <div style={{ fontSize: "14px" }}>Коментар:</div>*/}
                        {/*    {item?.comment}*/}
                        {/*</div>*/}
                        {/* <div>
                            <div style={{fontSize: '14px'}}>Наповнення:</div>
                            {item.RoomFurniture.map(furniture =>
                                <div style={{backgroundColor: "#e55733", borderRadius: '10px', padding: '2px 5px', marginBottom: '5px', color: '#fff'}}>
                                    {furniture.name}
                                </div>
                            )}
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomTable;
