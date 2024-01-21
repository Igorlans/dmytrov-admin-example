 
const Question = ({item}) => {

    return ( 
        <>
            <div style={{fontWeight: 600, fontSize: '20px'}}>
               Питання
            </div>
            <div style={{border: "1px solid #e55733", borderRadius: '10px', padding: '10px', marginBottom: '20px'}}>
                <div style={{fontWeight: 600, fontSize: '20px'}}>{item.text}</div>
                {item.answers?.answer}
            </div>
        </>
     );
}
 
export default Question;