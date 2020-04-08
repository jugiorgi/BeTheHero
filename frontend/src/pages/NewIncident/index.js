import React, { useState } from 'react'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'

export default function NewIncident() {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [value, setValue] = useState('');

   const history = useHistory();
   const ongId = localStorage.getItem('ongId')

   async function handleAddIncidents(e){
      e.preventDefault();

      try {
         await api.post('incidents', {
            title,
            description, 
            value
         }, 
         {
            headers: {
               Authorization: ongId
            },
         })

         alert(`Caso ${title} cadastrado com sucesso`);
         history.push('/profile');
      } catch (error) {
         alert('Não foi possível cadastrar o caso, por favor, tente novamente.')
      }
   }

   return (
      <div className="new-incident-container">
         <div className="content">
            <section>
               <img src={logoImg} alt="Be The Hero" />

               <h1>Cadastrar novo caso</h1>
               <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

               <Link className="back-link" to="/profile">
                  <FiArrowLeft size={16} color="#E02041" />
                  Voltar para home
               </Link>
            </section>


            <form onSubmit={handleAddIncidents}>
               <input 
                  placeholder="Título do caso" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
               />
               <textarea  
                  placeholder="Descrição" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
               />
               <input 
                  placeholder="Valor em reais" 
                  value={value}
                  onChange={e => setValue(e.target.value)}
               />

               <button className="button" type="submit">Cadastrar</button>
            </form>
         </div>
      </div>
   )
}