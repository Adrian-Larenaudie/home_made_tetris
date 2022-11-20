import { game } from '../game.js';
import { grid } from './grid.js';
import { piece } from './piece.js';

export const user_input = {
    /* ------------------ PROPRIETES ---------------- */
    last_keypress_value: null,
    keydown_flag: false,
    keyup_flag: true,
    spin_index: 0,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    add_key_touch_event: () => {
        document.addEventListener('keypress', user_input.on_key_press_handler, true);
        document.addEventListener('keydown', user_input.on_key_down_handler, true);
        document.addEventListener('keyup', user_input.on_key_up_handler, true);
    },

    remove_key_touch_event: () => {
        document.removeEventListener('keypress', user_input.on_key_press_handler, true);
        document.removeEventListener('keydown', user_input.on_key_down_handler, true);
        document.removeEventListener('keyup', user_input.on_key_up_handler, true);
    },

    on_key_press_handler: (event) => {
        if(!game.over && piece.current_positions != null) {
            switch (event.key) {
                case "z":
                    //TODO rotation de la pièce
                    user_input.can_current_piece_spin();
                    break;
                case "q":                
                    if(user_input.can_current_piece_move(piece.current_positions, 0, 'left')) {
                        //* pour obtenir un comportement propre à tetris on stop l'interval tant la pièce est en déplacement
                        //* la pièce ne descend plus tant qu'elle se déplace sur un coté 
                        //* cpdt on ne clear pas l'interval si la dernière touche appuyée est de la touche courante
                        if(event.key === user_input.last_keypress_value) clearInterval(game.interval);
                        piece.current_positions.forEach((position) => {
                            position.x = position.x - 31;
                        });
                        if(event.key === user_input.last_keypress_value) {
                            //* on redessine la grille et la pièce
                            grid.draw();
                            piece.draw(piece.current_type);
                            //* et on remet l'interval pour que la pièce descende à nouveau
                            game.interval = setInterval(game.on_move, game.speed);
                        }
                       
                    }
                    break;
                case "d":
                    if(user_input.can_current_piece_move(piece.current_positions, 279, 'right')) {
                        if(event.key === user_input.last_keypress_value) clearInterval(game.interval);
                        piece.current_positions.forEach((position) => {
                            position.x = position.x + 31;
                        })
                        if(event.key === user_input.last_keypress_value) {
                            //* on redessine la grille et la pièce
                            grid.draw();
                            piece.draw(piece.current_type);
                            //* et on remet l'interval pour que la pièce descende à nouveau
                            game.interval = setInterval(game.on_move, game.speed);
                        }
                       
                    }
                    break;
                case " ":
                    //TODO on jouera une pause 
                break;
            };
            user_input.last_keypress_value = event.key;
        }     
    },

    on_key_down_handler: (event) => {
        if(event.key === 's') {
            user_input.keyup_flag = false;
            if(!user_input.keydown_flag) {
                user_input.keydown_flag = true;
                clearInterval(game.interval);
                game.speed = 50;
                game.interval = setInterval(game.on_move, game.speed);           
            }
        }
    },

    on_key_up_handler: (event) => {
        if(event.key === 's') {
            user_input.keydown_flag = false;
            if(!user_input.keyup_flag) {
                user_input.keyup_flag = true;
                clearInterval(game.interval);
                game.speed = 500;
                game.interval = setInterval(game.on_move, game.speed);
            }
        }
    },

    //* la méthode qui permet de vérifier si la pièce peut se déplacer
    can_current_piece_move: (current_piece_positions, max_position, direction) => {
        let flag = true;
        current_piece_positions.forEach((current_position) => {
            //* si la position arrive sur une bordure on interdit le déplcament
            if(current_position.x === max_position) {
                flag = false;
            }
            //* si la position arrive sur une pièce déjà placée on interdit aussi le déplacement
            grid.all_positions.forEach((grid_position) => {
                if(direction === 'right' && grid_position.x === (current_position.x + 31) && grid_position.y === current_position.y && grid_position.used === 1) {
                    flag = false;
                }
                if(direction === 'left' && grid_position.x === (current_position.x - 31) && grid_position.y === current_position.y && grid_position.used === 1) {
                    flag = false;
                }
            });
        });

        
        return flag;
    },

    //* la méthode qui vérifie si la pièce peut tourner si c'est le cas joue piece_spin
    can_current_piece_spin: () => {
        //* on aurait un switch case
        //* dans lequel on identifie le type de pièce et le type de position demandée
        //* en fonction de ces élément on éffectue une vérification si les positions sont possible on joue la méthode suivante
        user_input.piece_spin();
    },

    piece_spin: () => {
        //clearInterval(game.interval);
        if(piece.rotations_possibilities[piece.current_type].length - 1 === user_input.spin_index) {
            user_input.spin_index = 0;
        } else {
            user_input.spin_index++;
        }
        piece.current_rotation = piece.rotations_possibilities[piece.current_type][user_input.spin_index];
        console.log(piece.current_rotation);
        switch (piece.current_type) {
            case 'I':
                console.log('I');
                switch (piece.current_rotation) {
                    case 'default':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31, y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x - 62, y: piece.current_positions[3].y + 62};
                        break;
                    case 'spin_two':
                        piece.current_positions[0] = {x: piece.current_positions[0].x -31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 62, y: piece.current_positions[3].y - 62};
                        break;
                }
                break;
            case 'T':
                console.log('T');
                switch (piece.current_rotation) {
                    case 'default':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31, y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 31, y: piece.current_positions[3].y - 31};
                        break;
                    case 'spin_two':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x - 31, y: piece.current_positions[3].y - 31};
                        break;
                    case 'spin_three':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x - 31, y: piece.current_positions[3].y + 31};
                        break;
                    case 'spin_four':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31 , y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 31, y: piece.current_positions[3].y + 31};
                        break;
                }
            case 'O':
                console.log('O');
                //* cette pièce ne tourne pas
                break;
            case 'L':
                console.log('L');
                switch (piece.current_rotation) {
                    case 'default':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31, y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 62, y: piece.current_positions[3].y + 0};
                        break;
                    case 'spin_two':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 0, y: piece.current_positions[3].y - 62};
                        break;
                    case 'spin_three':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x - 62, y: piece.current_positions[3].y + 0};
                        break;
                    case 'spin_four':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31 , y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 0, y: piece.current_positions[3].y + 62};
                        break;
                }
                break;
            case 'J':
                console.log('J');
                switch (piece.current_rotation) {
                    case 'default':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31, y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 0, y: piece.current_positions[3].y + 62};
                        break;
                    case 'spin_two':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 62, y: piece.current_positions[3].y + 0};
                        break;
                    case 'spin_three':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31 , y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 0, y: piece.current_positions[3].y - 62};
                        break;
                    case 'spin_four':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31 , y: piece.current_positions[0].y - 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x - 62, y: piece.current_positions[3].y + 0};
                        break;
                }
                break;
            case 'S':
                console.log('S');
                switch (piece.current_rotation) {
                    case 'default':
                        //piece.current_positions[0] =  //* ne bouge jamais
                        piece.current_positions[1] = {x: piece.current_positions[1].x + 31, y: piece.current_positions[1].y + 31};
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x - 62, y: piece.current_positions[3].y + 0};
                        break;
                    case 'spin_two':
                        //piece.current_positions[0] = //* ne bouge jamais
                        piece.current_positions[1] = {x: piece.current_positions[1].x - 31, y: piece.current_positions[1].y - 31};
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 62, y: piece.current_positions[3].y + 0};
                        break;
                }
                break;
            case 'Z':
                console.log('Z');
                switch (piece.current_rotation) {
                    case 'default':
                        piece.current_positions[0] = {x: piece.current_positions[0].x - 31, y: piece.current_positions[0].y - 31};
                         //piece.current_positions[1] =  //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x - 31, y: piece.current_positions[2].y + 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 0, y: piece.current_positions[3].y + 62};
                        break;
                    case 'spin_two':
                        piece.current_positions[0] = {x: piece.current_positions[0].x + 31, y: piece.current_positions[0].y + 31};
                        //piece.current_positions[1] = //* ne bouge jamais
                        piece.current_positions[2] = {x: piece.current_positions[2].x + 31, y: piece.current_positions[2].y - 31};
                        piece.current_positions[3] = {x: piece.current_positions[3].x + 0, y: piece.current_positions[3].y - 62};
                        break;
                }
                break;
        };
        //* on redessine la grille et la pièce
        grid.draw();
        piece.draw(piece.current_type);
    }
    /* ------------------- METHODES ----------------- */
}