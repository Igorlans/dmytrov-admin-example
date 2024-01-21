import React from 'react';
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
const TariffPlanItem = ({tariffPlan, setTariffPlanList, setSelectedTariffPlan}) => {
	const handleEdit = () => {
		setSelectedTariffPlan(tariffPlan)
	}
	const handleDelete = () => {
		setTariffPlanList((prev) => prev.filter(item => item.id !== tariffPlan.id));
	}
	return (
		<div className="card bg-[#e55733] p-4 text-primary-content">
			<div className={'flex justify-between items-center'}>
				<div>
					{tariffPlan.title}
				</div>
				<div className={'flex gap-3 items-center'}>
					<button onClick={handleEdit} className="btn btn-circle btn-sm border-none">
						<AiFillEdit />
					</button>
					<button onClick={handleDelete} className="btn btn-circle btn-sm border-none">
						<AiFillDelete />
					</button>
				</div>
			</div>

		</div>
	);
};

export default TariffPlanItem;