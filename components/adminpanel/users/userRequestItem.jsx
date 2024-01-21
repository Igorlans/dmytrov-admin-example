import dayjs from "dayjs";

const UserRequestItem = ({item}) => {
	const userInfo = [
		{name: 'Тариф', value: item.tariff},
		{name: 'Квадратура', value: `${item.square} м2`},
		{name: 'Тип', value: item.type},
		// {name: 'Адреса', value: `${item.address}, ${item.street}, ${item.homeNumber}`},
		{name: 'Дата замірів', value: dayjs(Number(item.date)).format('DD.MM.YYYY')},
		{name: 'Коментар', value: item.comment},
	]
	return (
		<div className="card w-full bg-[#e55733] text-primary-content shadow-xl">
			<div className="card-body">
				<h2 className="card-title">{`${item.address}, ${item.street}, ${item.homeNumber}`}</h2>
				{userInfo.map((item, index) => {
					if (item.value) {
						return (
							<p key={index}><span className={'font-bold'}>{item.name}: </span>{item.value}</p>
						)
					}
				})}
			</div>
		</div>
	);
};

export default UserRequestItem;