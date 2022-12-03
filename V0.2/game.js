import { user_input } from "./core/user_input.js";
import { grid } from "./core/grid.js";
import { piece } from "./core/piece.js";

export const game = {
    /* ------------------ PROPRIETES ---------------- */
    over: false,
    interval: null,
    speed: 500,
    end_positions: [
        {x: 0, y: 651},
        {x: 31, y: 651},
        {x: 62, y: 651},
        {x: 93, y: 651},
        {x: 124, y: 651},
        {x: 155, y: 651},
        {x: 186, y: 651},
        {x: 217, y: 651},
        {x: 248, y: 651},
        {x: 279, y: 651},
    ],
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        grid.generate_values();
        piece.get_random_type();
        game.interval = setInterval(game.on_move, game.speed);
        user_input.add_key_touch_event();
    },

    on_move: () => {
        let move = true;

        //* quand une piece arrive en bas elle doit s'arrêter (le flag move passe à false)
        game.end_positions.forEach((stop_position) => {
            piece.current_positions.forEach((current_position) => {
                if(current_position.x === stop_position.x && current_position.y === stop_position.y) {
                    move = false
                    clearInterval(game.interval);  
                }
            });
        });

        //* quand une pièce arrive sur une autre pièce elle doit s'arrêter aussi (le flag move passe à false)
        piece.current_positions.forEach((current_position) => {
            grid.all_positions.forEach((grid_position) => {
                if(grid_position.x === current_position.x && grid_position.y === (current_position.y + 31) && grid_position.used === 1) {
                    move = false;
                    clearInterval(game.interval);  
                }
            });
        });

        //* si le pièce peut bouger
        if(move){
            //* on incrémente chaques cases de la pièce de la valeur d'une case vers le bas
            piece.current_positions.forEach((current_position) => {
                current_position.y += 31;
            });
            //* puis on redessine la grille et la pièce
            grid.draw();
            piece.draw(piece.current_type);
        //* sinon c'est que la pièce est soit arrivée en bas de la grille soit sur une pièce déjà placée
        } else {
            //* on vérifie si le jeu est terminé
            game.check_over();
        }
    },

    check_over: () => {
        piece.all_starting_positions.forEach((sarting_position) => {
            grid.all_positions.forEach((grid_position) => {
                if(grid_position.x === sarting_position.x && grid_position.y === sarting_position.y && grid_position.used === 1) {
                    //* si c'est le cas on clear l'interval et on log game over
                    console.log('game over!');
                    game.over = true;
                    clearInterval(game.interval);  
                }
            });
        });
        //* on place la pièce
        grid.seat_piece();
    }
    /* ------------------- METHODES ----------------- */
}

game.init();