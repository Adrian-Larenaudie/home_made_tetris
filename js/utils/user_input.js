import { game } from '../game.js';
import { piece } from './piece.js';
export const user_input = {
    on_key_press: () => {
        document.addEventListener('keypress', user_input.on_key_press_handler, true);
    },

    remove_on_key_press: () => {
        document.removeEventListener('keypress', user_input.on_key_press_handler, true);
    },

    on_key_press_handler: (event) => {
        if(!game.over && piece.current_positions != null) {
            switch (event.key) {
                case "z":
                    //TODO rotation de la pièce
                    console.log(event.key);
                    break;
                case "q":
                    //TODO se déplace vers la gauche
                    console.log(event.key);
                    piece.current_positions.forEach((position) => {
                        position.x = position.x - 31;
                    })
                    break;
                case "s":
                    //! ACCELERE LA PIECE il faut prévoir un autre évènement, keydown
                    break;
                case "d":
                    //TODO se déplace vers la droite
                    console.log(event.key);
                    piece.current_positions.forEach((position) => {
                        position.x = position.x + 31;
                    })
                    break;
                case " ":
                    //TODO on jouera une pause 
                break;
            };
        }     
    },
}