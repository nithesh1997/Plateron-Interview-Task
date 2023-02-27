import './App.css';
import {useState} from 'react'
import datTime from './components/datTime';
import { Button, Modal } from 'antd';

function App() {
  const [day,setDay] = useState([{day:'Monday',toggle:true},{day:'Tuesday',toggle:true},{day:'Wednesday',toggle:true},{day:'Thursday',toggle:true},{day:'Friday',toggle:true},{day:'Saturday',toggle:true},{day:'Sunday',toggle:true}])
  const [data,setData] = useState(datTime)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentDay,setPresentDay] = useState('')
  
  const [input,setInput] = useState({
    startTimeHour:'',
    startTimeMin:'',
    endTimeHour:'',
    endTimeMin:"",
    endDay:'',
    startDay:''
  })
  const {startTimeHour,startTimeMin,startDay,endTimeHour,endTimeMin,endDay} = input

  const showModal = (day) => {
    setPresentDay(day)
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
    setPresentDay('')
    setIsModalOpen(false);
    setInput({
      startTimeHour:'',
      startTimeMin:'',
      endTimeHour:'',
      endTimeMin:"",
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
    if(startTimeHour && startTimeMin && startDay && endTimeHour && endTimeMin && endDay){
      let newArry = [...data]

      let inputValid = []
      let startTimeArr = []
      let endTimeArr = []

      newArry.map(f=>{
      
         f.timeSlots.map(r=>{
          r.startsAt.day == startDay && inputValid.push({'startTimeArr':r.startsAt.time.split(':')[0],'endTimeArr':r.endsAt.time.split(':')[0],startDay:r.startsAt.day,endDay:r.endsAt.day}) 
         })
        })
    
console.log(inputValid)

        let numIncludes = []

      inputValid.map(f=>{
          if(Number(f.startTimeArr)<Number(f.endTimeArr)){
            for(let i=Number(f.startTimeArr);i<=Number(f.endTimeArr);i++){
              numIncludes.push(i)
              
            }
          }else if(Number(f.startTimeArr)>Number(f.endTimeArr)){
          
            if(f.startDay==f.endDay){
              for(let i=Number(f.endTimeArr);i>=Number(f.startTimeArr);i--){
                numIncludes.push(i)
                // console.log(i)
              }
         
            }else if(f.startDay!==f.endDay){
              for(let i=Number(f.startTimeArr);i<=24;i++){
                numIncludes.push(i)
            
              }
            }
           
          }
          
        })

        console.log(numIncludes)

        

        if(!numIncludes.includes(Number(startTimeHour.split(':')[0])) && !numIncludes.includes(Number(endTimeMin.split(':')[0]))){
                            
          console.log(inputValid)

          newArry.push({'_id':Math.random(),'timeSlots':[{
            "startsAt": {
                "day": startDay,
                "time": `${startTimeHour}:${startTimeMin}`,
            },
            "endsAt": {
                "day": endDay,
                "time": `${endTimeHour}:${endTimeMin}`,
            },
            "_id": Math.random()
          }]})



          setData(newArry)

          setInput({
          startTimeHour:'',
          startTimeMin:'',
          endTimeHour:'',
          endTimeMin:"",
          endDay:'',
          startDay:''
          })

          console.log(input)

          setIsModalOpen(false);
        }else{
          alert('Timing is alredy booked')
        }


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
          <div class=" text-center">
                <div class="row">
                  <div class="col">
                   <select name="" id="startTimeHour" value={startTimeHour} onChange={handleChange} className='form-control'>
                   {Array(25).fill('').map((d,iSelec)=>(
                     <option value={iSelec >=10 ? iSelec : '0'+iSelec}>{iSelec >=10 ? iSelec : '0'+iSelec}</option>
                   ))}
                   </select>
                  </div>:
                  <div class="col">
                  <select name="" id="startTimeMin" value={startTimeMin} onChange={handleChange} className='form-control'>
                  {Array(60).fill('').map((d,iSelec)=>(
                     <option value={iSelec >=10 ? iSelec : '0'+iSelec}>{iSelec >=10 ? iSelec : '0'+iSelec}</option>
                   ))}
                   </select>
                  </div>
                </div>
              </div>
          <label htmlFor="">End Day</label>
          <select class="form-select" id='endDay' value={endDay} onChange={handleChange} aria-label="Default select example">
            {presentDay == 'Saturday' ? (day.slice(5).concat(day.slice(0,5)).map((o,indexDay)=>(
                <option value={o.day}>{o.day}</option> 
       
            ))) :presentDay == 'Sunday' ? (day.slice(6).concat(day.slice(0,6)).map((o,indexDay)=>(
              <option value={o.day}>{o.day}</option> 
          ))) : day.map((o,indexDay)=>(
            <>
              {day.findIndex(b=>b.day == presentDay) <= indexDay ?   <option value={o.day}>{o.day}</option> : ''} 
              </>
          ))}
        </select>
          <label htmlFor="">End Time</label>
        
          <div class=" text-center">
                <div class="row">
                  <div class="col">
                   <select name="" id="endTimeHour" value={endTimeHour} className='form-control' onChange={handleChange}>
                   {Array(25).fill('').map((d,iSelec)=>(
                     <option value={iSelec >=10 ? iSelec : '0'+iSelec}>{iSelec >=10 ? iSelec : '0'+iSelec}</option>
                   ))}
                   </select>
                  </div>:
                  <div class="col">
                  <select name="" id="endTimeMin" value={endTimeMin}  className='form-control' onChange={handleChange}>
                  {Array(60).fill('').map((d,iSelec)=>(
                     <option value={iSelec >=10 ? iSelec : '0'+iSelec}>{iSelec >=10 ? iSelec : '0'+iSelec}</option>
                   ))}
                   </select>
                  </div>
                </div>
              </div>
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
