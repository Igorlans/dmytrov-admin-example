const Table = ({ item }) => {
    return (
        <div>
            <div style={{ fontWeight: 600, fontSize: "20px" }}>
                {`Таблиця без приміщень: ${item?.text}`}
            </div>
            <div className="flex gap-5">
                {item?.answers?.options?.map((item) => (
                    <div className="text-center">
                        <img src={item?.image?.url} alt="" width={100} />
                        {item?.text}
                    </div>
                ))}
            </div>
            <div>Коментар: {item?.answers?.comment}</div>
        </div>
    );
};

export default Table;
