
import QuestionItem from "@/components/adminpanel/questions/questionsitem";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { openBlock, pushQuestion, setData } from "@/features/questionSlice";
import checkAuth from "@/utils/checkAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
import Layout from "@/components/adminpanel/Layout";
import prisma from "@/prisma/client";

export async function getServerSideProps (context) {
  const data = await prisma.question.findMany({
    orderBy: { order: 'asc' }
  });
  return {
    props: {
      data: data
    },
  }
  
}

const QuestionPage = ({ data }) => {
  const [storage, setStorage] = React.useState(data);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState();
  const [newDescr, setNewDescr] = React.useState();
  const [newOrder, setNewOrder] = React.useState();

  checkAuth()

  const handleSubmit = async (title, descr, order) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/question`, {
        method: 'POST',
        body: JSON.stringify({ title: title, descr: descr, order: order }),
      })
      const json = await response.json();
      setStorage([...storage, json.data]);
      setNewTitle('');
      setNewDescr('');
      setIsLoading(false);
      setIsShow(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
    <TitlePage title="Питання та відповіді"/>
      <Button variant="contained" onClick={() => setIsShow(true)}>Додати питання</Button>
      <section className="questions questions-page">
        <div className="container">
          
          <div className="questions__wrapper">
            <div className="questions__items">
              {storage.map((item, idx) => (
                <div className="flex justify-between items-center gap-10">
                  <QuestionItem storage={storage} setStorage={setStorage} key={idx} idx={idx} item={item} line={true}/>                 
                </div>
              ))}
            </div>
          </div>
        </div>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000000}}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

          
            {/* <div  style={{cursor: 'pointer', marginLeft: '18px', marginTop: '20px', border: '1px solid #000', width: '110px', padding: '5px', borderRadius: '5px', backgroundColor: '#c7c6c5'}}>Редагувати</div> */}
            <Drawer
              anchor={'right'}
              open={isShow}
              onClose={() => setIsShow(false)}
            >
              <div className="p-8" style={{minWidth: '400px'}}>
                  <div className="mb-5">Редагувати питання</div>
                  <FormControl style={{minWidth: '400px'}} >
                      <TextField onChange={(e) => setNewTitle(e.target.value)} id="outlined-basic" fullWidth label="Питання" variant="outlined" multiline rows={3} className="mb-5"/>         
                      <TextField onChange={(e) => setNewDescr(e.target.value)} id="outlined-basic" fullWidth label="Відповідь" variant="outlined" multiline rows={6} className="mb-5"/>
                      <TextField onChange={(e) => setNewOrder(e.target.value)} id="outlined-basic" fullWidth label="Порядок" variant="outlined" multiline rows={1} className="mb-5"/>        
                  </FormControl>
                  <div className='mt-8'>
                    <Button onClick={() => handleSubmit(newTitle, newDescr, Number(newOrder))} variant="contained">Зберегти</Button> 
                  </div>

      
              </div>
            </Drawer>
      </section>
    </Layout>
  );
};



export default QuestionPage
