import React from 'react';
import SettingsPage from "./fuzzyse";


export default function DataTableh(props) {
  let allmyapp = new Map();
  let allrate = new Map();
  let allmyworkapp = new Map();
  let allmyapapp = new Map();
  let allappstat = [];

  for(let i=0;i<props.datarar.length;i++)
  {
    const p = props.datarar[i]
    let temp = p["sumRating"]
    let temp2 = p["Raating"]
    let temp3 = 0
    if(temp2===0 || temp2 === "NaN" || isNaN(temp2) === true) temp3=0
    else{
      if(temp===0 || temp === "NaN" || isNaN(temp2) === true) temp3=0
      else{
        temp3 = temp/temp2
      }
    }
    allrate.set(p["_id"],temp3);
  }

  for(let i=0;i<props.datajj.length;i++)
  {
    const p = props.datajj[i]
    if(p["Status"]=== "accepted")
    allmyworkapp.set(p["JobId"], 1 );
    if(p["Status"] !== "rejected" || p["Status"] !== "reject")
    allmyapapp.set(p["JobId"], 1 );
    allmyapp.set(p["JobId"], 1 );
  }

  allappstat.push(allmyapapp.size );
  allappstat.push(allmyworkapp.size );
 
  // console.log(allappstat)

  let allapp = new Map();
  for(let i=0;i<props.dataall.length;i++)
  {
    const p = props.dataall[i]
    allapp.set(p["_id"], p["total"]);
  }
  let accapp = new Map();
  for(let i=0;i<props.dataacc.length;i++)
  {
    const p = props.dataacc[i]
    accapp.set(p["_id"], p["total"]);
  }
  const antyj = [];
  for(let i=0;i<props.datagetjob.length;i++)
  {
      const p = props.datagetjob[i]
      // console.log(p)
      const pa = {id:p["_id"],Title:p["Title"],RecName:p["Company_name"],sumRating:p["sumRating"],Rating:0,Salary:p["Job_Sal"],Duration:p["Job_Dura"],Type:p["Job_Type"],Deadline:p["Deadline"],Status:"Apply",Maxappli:p["Maxappli"],Maxposi:p["Maxposi"]}
      // console.log(pa)
      if(pa.Type===1 || pa.Type==='1' )
      pa.Type = "Full Time"
      if(pa.Type===2 || pa.Type==='2')
      pa.Type = "Part Time"
      if(pa.Type===3 || pa.Type==="3" )
      pa.Type = "Work From Home"
      if(pa.Duration===7 || pa.Duration==='7')
      pa.Duration = "Indefinite"

      pa.Rating = 0
      let tempp = allrate.get(pa.id)
      if(tempp===0 || tempp === null)
      {
      pa.Rating = 0
      }
      else
      pa.Rating = tempp
      
      let temp = parseInt(allapp.get(pa.id))
      if(!temp)temp = 0
      if(pa.Maxappli - temp <= 0 ) 
      pa.Status="Application Full"
      temp = parseInt(accapp.get(pa.id))
      if(!temp)temp = 0
      if(pa.Maxposi - temp <= 0 ) 
      pa.Status="Position Full"
      temp = parseInt(allmyapp.get(pa.id))
      if(!temp)temp = 0
      if(temp===1)
      pa.Status="Applied"

      // console.log(pa)

      let newDate = new Date()
      let adate = ("0"+newDate.getDate()).slice(-2);
      let amonth =("0"+(newDate.getMonth() + 1)).slice(-2);
      let ayear = ("0"+newDate.getFullYear()).slice(-4);
      let ahour = ("00"+newDate.getHours()).slice(-2);
      let aminutes = ("00"+newDate.getMinutes()).slice(-2)

      let deadd=p.Deadline.split(" ");
      let datede = deadd[0].split("/");
      let timede = deadd[1].split(":");
      // console.log(parseInt(datede[2]))
      // console.log(parseInt(datede[1]))
      // console.log(parseInt(datede[0]))
      // console.log(parseInt(timede[1]))
      // console.log(parseInt(timede[0]))
      // console.log(timede)
      if(parseInt(datede[2]) >= parseInt(ayear))
      {
        antyj.push(pa)
      }
      else
      {
          if(parseInt(datede[1]) >= parseInt(amonth))
          {
            antyj.push(pa)
          }
          else
          {
            if(parseInt(datede[0]) >= parseInt(adate))
            {
              antyj.push(pa)
            }
            else
            {
              if(parseInt(timede[0]) >= parseInt(ahour))
              {
                antyj.push(pa)
              }
              else
              {
                if(parseInt(timede[1]) >= parseInt(aminutes))
                {
                    antyj.push(pa)
                }
              }
            }
          }
      }
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <br/>
      <SettingsPage data={antyj} dataall={props.dataall} dataacc={props.dataacc} datawwacc={allappstat}></SettingsPage>
    </div>
  );
}
