import { Button, Switch, TableCell, TableRow } from "@mui/material";
import { tariffIds } from "@/utils/tariffIds";
import { buildingTypes } from "@/utils/buildingTypes";
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/utils/apiRequest";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

const QuestionItem = ({
    question,
    number,
    setActiveQuestion,
    setQuestions,
}) => {
    const [checked, setChecked] = useState(question?.isActive || false);

    useEffect(() => {
        setChecked(question?.isActive);
    }, [question]);

    const handleSwitchChange = useCallback(
        debounce(async () => {
            const formData = {
                ...question,
                isActive: !checked,
            };
            console.log("FORM DATA", formData);
            try {
                await toast.promise(
                    apiRequest("/api/questionary/questions", formData, "PUT"),
                    {
                        loading: "Оновлення питання...",
                        success: (newQuestion) => {
                            setQuestions((prev) => {
                                return prev?.map((quest) =>
                                    quest.id === question?.id
                                        ? newQuestion
                                        : quest
                                );
                            });
                            return `Питання оновлено`;
                        },
                        error: (err) => err.message,
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }, 500),
        [checked]
    );

    const tariffes = question?.tariffes?.map((tariff) => tariffIds[tariff]);
    const types = question?.type?.map((type) => buildingTypes[type]);

    console.log("ITEM", question);
    return (
        <>
            <TableRow
                key={question.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="left">{number}</TableCell>
                <TableCell>{question?.text}</TableCell>
                <TableCell>{question?.hint}</TableCell>
                <TableCell>{[...tariffes, ...types]?.join(", ")}</TableCell>
                <TableCell>
                    <Switch checked={checked} onChange={handleSwitchChange} />
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => setActiveQuestion(question)}>
                        Редагувати
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default QuestionItem;
