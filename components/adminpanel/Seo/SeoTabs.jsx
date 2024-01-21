import { Tab, Tabs } from "@mui/material"

const SeoTabs = ({ value, setValue }) => {
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <Tabs value={value} onChange={handleChange}>
            <Tab label="Усі" value="" />
            <Tab
                label="Статика"
                value="/\/(allservices|$|register|questions|contactspage|forgotPassword|blog$|politic)/"
            />
            <Tab label="Тарифи" value="/\/tariffs/" />
            <Tab label="Додаткові послуги" value="/\/additional/" />
            <Tab label="Блог" value="/\/blog/" />
        </Tabs>
    )
}

export default SeoTabs
