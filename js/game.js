import { user_input } from "./core/user_input.js";
import { grid } from "./core/grid.js";
import { piece } from "./core/piece.js";
import { end_positions } from "./data/data.js";

export const game = {
    /* ------------------ PROPRIETES ---------------- */
    over: false,
    interval: null,
    speed: 500,
    end_positions: end_positions,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        grid.generate_values();
        piece.get_random_type();
        game.interval = setInterval(game.on_move, game.speed);
        user_input.add_key_event();
    },

    on_move: () => {
        //* le flag qui détermine si la pièce peut bouger ou non
        let move = true;

        //* quand au moins une des positions de départ de la pièce courante arrrive sur une pièce déjà placée le jeu est terminé 
        piece.starting_positions[piece.current_type].forEach((sarting_position) => {
            grid.all_positions.forEach((grid_position) => {
                if(grid_position.x === sarting_position.x && grid_position.y === sarting_position.y && grid_position.used === 1) {
                    //* si c'est le cas on clear l'interval
                    move = false
                    game.over = true;
                    clearInterval(game.interval);  
                }
            });
        });

        //* quand la piece courante arrive en bas elle doit s'arrêter (le flag move passe à false)
        game.end_positions.forEach((stop_position) => {
            piece.current_positions.forEach((current_position) => {
                if(current_position.x === stop_position.x && current_position.y === stop_position.y) {
                    move = false
                    clearInterval(game.interval);  
                }
            });
        });

        //* quand la pièce courante arrive sur une autre pièce elle doit s'arrêter aussi (le flag move passe à false)
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
        //* sinon si game.over est true c'est que la partie est terminée
        } else if(game.over) {
            //* on retire les event sur les input du user
            user_input.remove_key_event();
            //* pour le moment on log que la partie est términée
            console.log('game over!');
        //* sinon c'est que la pièce courante est soit arrivée en bas de la grille soit arrivée sur une pièce déjà placée 
        } else {
            //* on va donc placé cette pièce sur la grille
            grid.seat_piece();
        }
    },
    /* ------------------- METHODES ----------------- */
}

game.init();