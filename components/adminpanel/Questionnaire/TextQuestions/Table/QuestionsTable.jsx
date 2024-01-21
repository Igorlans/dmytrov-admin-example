import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import QuestionItem from "./QuestionItem/QuestionItem";

const QuestionsTable = ({ questions, setQuestions, setActiveQuestion }) => {
    const handleQuestionSave = (questionIndex, updatedQuestion) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    return (
        <TableContainer
            component={Paper}
            className="bg-white rounded-lg shadow shadow-lg"
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">№</TableCell>
                        <TableCell>Питання</TableCell>
                        <TableCell>Уточнення</TableCell>
                        <TableCell>Фільтр</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell align="right">Редагувати</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((question, index) => (
                        <QuestionItem
                            number={index + 1}
                            question={question}
                            setQuestions={setQuestions}
                            setActiveQuestion={setActiveQuestion}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuestionsTable;
