import {useState} from "react";
import TariffForm from "@/components/adminpanel/tariffs/TariffItem/TariffForm/TariffForm";



const TariffItem = ({tariffs, setTariffs, tariff }) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<div className="tariffs_items">
			<div>
				<div className="rates__item-top">
					<p className={tariff.activated ? "rates__item-title" : "rates__item-title_deactivated"}>{tariff.activated ? tariff.title : `${tariff.title} ДЕАКТИВОВАНО!`}</p>
				</div>
			</div>
			<div style={{ cursor: 'pointer' }}>
				<div className="rates__link" onClick={() => setIsShow(true)}>Редагувати тариф</div>
				<TariffForm tariff={tariff} isVisible={isShow} setIsVisible={setIsShow} setTariffs={setTariffs}/>
			</div>
		</div>
	);
};

export default TariffItem;


