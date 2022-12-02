import { user_input } from "./user_input.js";
import { game } from "../game.js";
import { piece } from "./piece.js";
import { line } from "./line.js";

export const grid = {
    /* ------------------ PROPRIETES ---------------- */
    x_case_number: 10,
    y_case_number: 22,
    size: 31,
    all_positions: [],
    full_lines: [],
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */

    //* dessine la grille
    draw: () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        grid.all_positions.forEach((position) => {
            ctx.fillStyle = position.color;
            ctx.fillRect(position.x, position.y, grid.size, grid.size);
        });
    },

    //* génère les valeurs initial de la grille
    generate_values: () => {
        for(let y = 0; y < grid.y_case_number; y++) {
            for(let x = 0; x < grid.x_case_number; x++) {
                if(x % 2 === 0) {
                    grid.all_positions.push({
                        position: (((y + 1) * 10) + (x + 1)),
                        used: 0,
                        x: (x * grid.size),
                        y: (y * grid.size),
                        color: '#dbdbdb',
                    });
                } else {
                    grid.all_positions.push({
                        position: ((x * 10) + y),
                        used: 0,
                        x: (x * grid.size),
                        y: (y * grid.size),
                        color: '#cecece',
                    });
                }
            };
        };
        // console.log(grid.all_positions);
        grid.draw();
    },

    //* met à jour les valeurs quand une pièce est placée
    seat_piece: () => {
        //* on boucle sur les positions de la pièce courante
        piece.current_positions.forEach(current_position => {
            //* on boucle sur toutes les positions
            grid.all_positions.forEach((grid_position) => {
                //* quand une position match avec une position courante
                if(grid_position.x === current_position.x && grid_position.y === current_position.y) {
                    //* on la modifie
                    grid_position.used = 1;
                    grid_position.color = piece.current_color;
                }
            });
        });
        //* la pièce est placée on reset les valeurs
        piece.current_positions = null;
        //* on relance une pièce et l'interval si la partie n'est pas terminée
        if(!game.over) {
            //* on check si il y a des lignes complètes
            line.init();          
        } else {
            //* sinon on retire les event sur les input du user
            user_input.remove_key_touch_event();
        }
    },
    /* ------------------- METHODES ----------------- */
}