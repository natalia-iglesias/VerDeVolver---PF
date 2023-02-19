import axios from 'axios';
import { useParams } from 'react-router-dom';

export const POST_DONATION_HOME = 'POST_DONATION_HOME';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_FEEDBACK = 'UPDATE_USER_FEEDBACK';

//dini prueba. No las implemente, las deje aca nomas 

export const postDonationHome = (payload) => {
    return async (dispatch) => {
      try {
        //El body debe recibir el id del usuario que hace la donacion y el id de la entidad que la recibe
        //El id de la entidad creo que lo pasan al seleccionar la entidad en el select que esta ahi pero
        //...el id del usuario no estoy segura de como lo colocariamos en el body de la peticion 
        await axios.post("http://localhost:3001/donation", payload);
    
        alert("Donación realizada")

        return dispatch({
            type: POST_DONATION_HOME,
          });
        
      } catch (error) {
        alert("Ocurrió un error durante el proceso de donación. Donación no realizada");
      }
    };
  };

  export const updateUserProfile = (payload) => {
    return async (dispatch) => {
        const { id } = useParams();
      try {
        //En el payload van los datos que el usuario ponga en el form de actualizacion en su perfil
        await axios.put(`http://localhost:3001/user/${id}`, payload);
    
        alert('Datos de usuario actualizados correctamente')
        
        return dispatch({
            type: UPDATE_USER_PROFILE,
          });
        
      } catch (error) {
        alert('Ocurrió un error. No fue posible actualizar los datos del usuario');
      }
    };
  };

  export const updateUserFeedback = (payload) => {
    return async (dispatch) => {
      try {
        //No toy segura de como implementarlo. El id del feedback se le pasa por body 
        //Esto se haria desde donde? desde las resenas del usuario en su perfil o desde las resenas en 
        //...la pagina del detalle de la vdv donde estan sus resenas?
        await axios.put('http://localhost:3001/feedback/update', payload);
    
        alert('Reseña actualizada correctamente')
        
        return dispatch({
            type: UPDATE_USER_FEEDBACK,
          });
        
      } catch (error) {
        alert('Ocurrió un error. No fue posible modificar la reseña');
      }
    };
  };