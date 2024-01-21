import dayjs from "dayjs";

const UserServiceRequestItem = ({item}) => {
    return (
        <div className="card w-full bg-[#e55733] text-primary-content shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{item?.Services?.title}</h2>
                <p><span className={'font-bold'}>Дата: </span>{dayjs(item.createdAt).format('DD.MM.YYYY')}</p>
            </div>
        </div>
    );
};

export default UserServiceRequestItem;