import { useEffect, useState } from "react";
import QuestionForm from "@/components/adminpanel/Questionnaire/TextQuestions/QuestionForm/QuestionForm";
import QuestionsTable from "./Table/QuestionsTable";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const TextQuestions = ({ questions: initQuestions }) => {
    const [questions, setQuestions] = useState(initQuestions || []);
    const [activeQuestion, setActiveQuestion] = useState(null);

    useEffect(() => {
        setQuestions(initQuestions);
    }, [initQuestions]);

    return (
        <>
            <div className="flex justify-between alignt-item">
                <TitlePage title="Текстові питання" />
                <Button onClick={() => setActiveQuestion({})}>Створити</Button>
            </div>
            <QuestionForm
                activeQuestion={activeQuestion}
                onClose={() => setActiveQuestion(null)}
                setQuestions={setQuestions}
            />
            <QuestionsTable
                questions={questions}
                setQuestions={setQuestions}
                setActiveQuestion={setActiveQuestion}
            />
        </>
    );
};

export default TextQuestions;
