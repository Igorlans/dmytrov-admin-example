import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { MdExpandMore } from "react-icons/md"
import Button from "@mui/material/Button"

const ServiceItem = ({ service, number, onEdit }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<MdExpandMore />}>
                {number}. {service.title}
            </AccordionSummary>
            <AccordionDetails>
                <div className={"grid grid-cols-2 gap-10"}>
                    <div className={"relative w-full"}>
                        <img
                            className={"w-full h-full object-cover"}
                            src={service?.image?.url}
                            alt={service?.title}
                        />
                    </div>
                    <div
                        className={"break-words"}
                        dangerouslySetInnerHTML={{ __html: service?.descr }}
                    ></div>
                </div>

                <Button onClick={onEdit}>Редагувати</Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default ServiceItem
