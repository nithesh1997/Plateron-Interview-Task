import './App.css';
import {useState} from 'react'
import datTime from './components/datTime';
import { Button, Modal } from 'antd';

function App() {
  const [day,setDay] = useState([{day:'Monday',toggle:true},{day:'Tuesday',toggle:true},{day:'Wednesday',toggle:true},{day:'Thursday',toggle:true},{day:'Friday',toggle:true},{day:'Saturday',toggle:true},{day:'Sunday',toggle:true}])
  const [data,setData] = useState(datTime)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [input,setInput] = useState({
    startTime:'',
    endTime:'',
    endDay:'',
    startDay:''
  })
  const {startTime,startDay,endTime,endDay} = input

  const showModal = (day) => {
    setIsModalOpen(true);
    setInput({
      ...input,
      endDay:day,
      startDay:day,
    })
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setInput({
      startTime:'',
      endTime:'',
      endDay:'',
      startDay:''
    })
  };


  function handleChange(e){
    setInput({
      ...input,
      [e.target.id] : e.target.value
    })
  }


  function handleAddTime(){
    if(startTime && startDay && endTime && endDay){
      let newArry = [...data]

      newArry.push({'_id':Math.random(),'timeSlots':[{
        "startsAt": {
            "day": startDay,
            "time": startTime,
        },
        "endsAt": {
            "day": endDay,
            "time": endTime
        },
        "_id": Math.random()
    }]})
  
    setData(newArry)

    setInput({
      startTime:'',
      endTime:'',
      endDay:'',
      startDay:''
    })

    setIsModalOpen(false);
    }else{
      alert('Please fill all details')
    }
   
  }



  function handleDelete(dt){
    let newArry = [...data]

    let arryValue =[]
     newArry.map(e=>{

      arryValue.push({
        '_id':e['_id'],
        timeSlots:(e.timeSlots.filter(f=>{
          return f['_id'] !== dt['_id']
        }))
      }) 
    })
    setData(arryValue)

  }

  function handleToggle(dateToggle,index){
    let newArry = [...day]
    newArry[index] = {...newArry[index],toggle:!newArry[index].toggle}

    setDay(newArry)
  }

  // console.log(data)
  return (
    <div className="container">
     <table class="table table-borderless">
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col"></th>
      <th scope="col">Start</th>
      <th scope="col">End</th>
    </tr>
  </thead>
  <tbody>

{day.map((e,index1)=>(
  <tr>
  <td scope="row">{e.day}</td>
  <td>
  <div class="form-check form-switch">
  <input class="form-check-input" onClick={()=>handleToggle(e.day,index1)} type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={e.toggle}/>
</div>
  </td>
  {e.toggle &&(<><td>{
    (data.length &&  data.map(f=>(
      
       ( f.timeSlots.map(r=>(
         (r.startsAt.day == day[index1].day && <><td>{r.startsAt.time }</td><br/></>)
        )))
      )))
    
    }</td>

<td>{
    (data.length &&  data.map((f,index3)=>(
       (f.timeSlots.map(r=>(
       
         (r.startsAt.day == day[index1].day && <><td>{r.endsAt.time} {r.startsAt.day !== r.endsAt.day && <span style={{color:'red'}}> - {r.endsAt.day }</span>} <><ion-icon name="trash" onClick={()=>handleDelete(r)}></ion-icon> 
         
          </> </td><br/></>)
        )))
      )))
    
    }<Button onClick={()=>showModal(e.day)} className='btnModel'><ion-icon name="add-circle"></ion-icon></Button>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
    <div className='container'>
          <label htmlFor="">Star Time</label>
          <input type="text" id='startTime' value={startTime} onChange={handleChange}  className='form-control'/>
          <label htmlFor="">End Day</label>
          <select class="form-select" id='endDay' value={endDay} onChange={handleChange} aria-label="Default select example">
            {day.map(o=>(
               <option value={o.day}>{o.day}</option>
            ))}
        </select>
          <label htmlFor="">End Time</label>
        
          <input type="text" id='endTime' value={endTime} onChange={handleChange} className='form-control'/>
          <button className='btn btn-success mt-3' onClick={()=>handleAddTime()}>Add</button>
         </div>
    </Modal></td>  </>)}
  
</tr>
))}

  </tbody>
</table>
    </div>
  );
}

export default App;
