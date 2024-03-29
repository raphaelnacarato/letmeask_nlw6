import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/pages/Home.scss';

export function NewRoom() {
   const [newRoom, setNewRoom] = useState('');

   const { user } = useAuth();
   const history = useHistory();

   async function handleCreateRoom(e: FormEvent) {
      e.preventDefault();

      if (newRoom.trim() === '') {
         return;
      }

      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
         title: newRoom,
         authorId: user?.id
      });

      history.push(`/rooms/${firebaseRoom.key}`);
   };

   return (
      <div id='page-home'>
         <aside>
            <img src={IllustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
            <strong>Crie salas de Q&A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
         </aside>

         <main>
            <div className='main-content'>
               <img src={logoImg} alt="Letmeask" />
               <h2>Criar uma nova sala</h2>

               <form onSubmit={handleCreateRoom}>
                  <input
                     type='text'
                     placeholder='Nome da sala'
                     value={newRoom}
                     onChange={e => setNewRoom(e.target.value)}
                  />
                  <Button type='submit'>
                     Criar sala
                  </Button>
               </form>
               <p>Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link></p>

            </div>
         </main>
      </div>
   );
};
