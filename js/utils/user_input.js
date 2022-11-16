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
                    if(user_input.can_current_piece_move(piece.current_positions, 0, 'left')) {
                        piece.current_positions.forEach((position) => {
                            position.x = position.x - 31;
                        });
                    }
                    break;
                case "s":
                    //! ACCELERE LA PIECE il faut prévoir un autre évènement, keydown
                    break;
                case "d":
                    if(user_input.can_current_piece_move(piece.current_positions, 279, 'right')) {
                        piece.current_positions.forEach((position) => {
                            position.x = position.x + 31;
                        })
                    }
                    break;
                case " ":
                    //TODO on jouera une pause 
                break;
            };
        }     
    },

    //? la méthode qui permet de vérifier si la pièce peut se déplacer
    can_current_piece_move: (current_piece_positions, max_position, direction) => {
        let flag = true;
        let value;
        if(direction === 'right') value = 31;
        if(direction === 'left') value = -31;
        current_piece_positions.forEach((position) => {
            if(position.x === max_position) {
                flag = false;
            }
            game.seat_pieces.forEach((seat_piece_position) => {
                if(position.x + value === seat_piece_position.x && position.y + value === seat_piece_position.y) {
                    flag = false;
                }
            })
        });
        //* on a aussi une autre condition: on ne veut pas que la pièce puisse se déplacer sur une autre pièce
            //* il faut alors écrire en code: si la position courante de chaque case de la pièce - 31 ou + 31 est égale à une des positions du tableau seat_pieces on ne se déplace pas
        
        return flag;
    },
}