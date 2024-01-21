import FilterItem from "./FilterItem/FilterItem";
import {useEffect} from "react";

const Filters = ({selectedFilters, setSelectedFilters, filterItems, label, callback}) => {

    useEffect(() => {
        callback && callback()
    }, [selectedFilters])


    return (
        <div>
            <div className="text-bold text-lg mb-2">{label}</div>
            <div className="w-[80%] flex flex-col">
                {filterItems?.map((item) => (
                    <FilterItem
                        key={item.value}
                        item={item}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />
                ))}
            </div>
        </div>

    );
};

export default Filters;
