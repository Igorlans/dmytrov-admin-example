import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { MdExpandMore } from "react-icons/md"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"

const QuestionsItem = ({ question, number }) => {
    const router = useRouter()
    const editQuestion = () => {
        router.push(`/questions/${question.id}`)
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<MdExpandMore />}>
                {number}. {question.title}
            </AccordionSummary>
            <AccordionDetails>
                <div
                    className={"break-words"}
                    dangerouslySetInnerHTML={{ __html: question?.descr }}
                ></div>
                <Button onClick={editQuestion}>Редагувати</Button>
            </AccordionDetails>
        </Accordion>
    )
}

export default QuestionsItem
