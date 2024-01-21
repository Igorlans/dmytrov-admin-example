import classes from './createCriterions.module.scss';
import Button from "@mui/material/Button";
import {useState} from "react";
import CriterionsModal from "@/components/adminpanel/CreateCriterions/CriterionsModal/CriterionsModal";
import {useFormContext} from "react-hook-form";
import {IconButton} from "@mui/material";
import {MdEdit} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
const CreateCriterions = () => {
	const methods = useFormContext();
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [activeCriterion, setActiveCriterion] = useState(null)
	const criterions = methods.watch('Criterions');

	function editItem(item) {
		setActiveCriterion(item)
		setIsModalVisible(true)
	}

	function deleteItem(item) {
		const newCriterions = (methods.getValues('Criterions')?.filter(cr => cr.name !== item.name))
		methods.setValue('Criterions', newCriterions)
	}

	const addCriterion = () => {

		// setIsVisible(false)
		// setDescription('')
		// setTitle('')
		// setItems(null)
	}

	return (
		<div className={classes.createCriterions}>
			<CriterionsModal activeCriterion={activeCriterion} setActiveCriterion={setActiveCriterion} isVisible={isModalVisible} setIsVisible={setIsModalVisible}/>
			<div className={classes.header}>
				<div className={classes.title}>Критерії</div>
				<Button variant={'contained'} onClick={() => setIsModalVisible(true)}>
					Додати
				</Button>
			</div>
			<div className={classes.itemList}>
				{criterions?.map(item =>
					<div className={classes.item} key={item.id}>
						<div className={classes.title}>
							<div className={classes.name}>{item.name}</div>
						</div>
						<div className={classes.controls}>
							<IconButton onClick={() => editItem(item)}><MdEdit size={'0.8em'}/></IconButton>
							<IconButton onClick={() => deleteItem(item)}><FaTrash size={'0.8em'}/></IconButton>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateCriterions;