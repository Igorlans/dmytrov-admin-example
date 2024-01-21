import { buildingTypes } from "@/utils/buildingTypes";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const FilterItem = ({
    item,
    selected,
    selectedFilters,
    setSelectedFilters,
}) => {
    const isSelected = selectedFilters?.includes(item.value);
    const handleFilterClick = () => {
        const newFilters = [...selectedFilters, item?.value];
        setSelectedFilters(newFilters);
    };

    const handleDelete = () => {
        const newFilters = selectedFilters?.filter(
            (filter) => filter !== item?.value
        );
        setSelectedFilters(newFilters);
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={isSelected}
                    onChange={isSelected ? handleDelete : handleFilterClick}
                />
            }
            label={item?.label}
        />
    );
};

export default FilterItem;
