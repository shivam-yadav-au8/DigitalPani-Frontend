import React, { FC, useState } from "react";
import styles from "./ticket.module.scss";
import edit from "../../../assets/icons/edit.png";
import trash from "../../../assets/icons/trash.png";
import env from '../../../env.json'

interface TicketProps {}

const Ticket: FC<TicketProps> = ({i,u}) =>{

  const deleted=(e)=>{
    const token = JSON.parse(localStorage.getItem('user'))?.token||null
    console.log(token,{ticket_id:i._id})
    fetch(env.Basurl+'/delete_ticket',{
      method:'delete',
      headers:{
        'token':token,
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({ticket_id:i._id}) 
    }).then(d=>d.json()).then(d=>{
      console.log(d)
      u()
    }).catch(e=>{
      console.log(e)
    })
  }
 return  (
    <div className={styles.TicketContainer}>
      <h2 className={styles.title}>{i?.title}</h2>
      <div className={styles.images}>
        <div>
          <img src={edit} alt="" className={styles.edit} />
        </div>
        <div>
          <img src={trash} alt="" className={styles.delete} onClick={()=>deleted(i)} />
        </div>
      </div>
      <div className={styles.details}>Description:{i?.description}</div>
      <div className={styles.details}>Reporter:{i?.reporter}</div>
      <div className={styles.details}>Department:{i?.department}</div>
      <div className={styles.details}>Priority:High</div>
      <div className={styles.details}>Start Date:48r4u8</div>
      <div className={styles.details}>End Date:</div>
      <div className={styles.details}>Progress:</div>
    </div>
  )
};

export default Ticket;
