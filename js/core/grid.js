import { game } from "../game.js";
import { piece } from "./piece.js";
import { line } from "./line.js";
import { grid_sizes } from "../data/data.js";

export const grid = {
    /* ------------------ PROPRIETES ---------------- */
    x_case_number: grid_sizes.x_case_number,
    y_case_number: grid_sizes.y_case_number,
    size: grid_sizes.size,
    all_positions: [],
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

    //* génère les valeurs initiales de la grille
    generate_values: () => {
        grid.all_positions = [];
        for(let y = 0; y < grid.y_case_number; y++) {
            for(let x = 0; x < grid.x_case_number; x++) {
                if(x % 2 === 0) {
                    grid.all_positions.push({
                        line_number: y,
                        used: 0,
                        x: (x * grid.size),
                        y: (y * grid.size),
                        color: '#dbdbdb',
                    });
                } else {
                    grid.all_positions.push({
                        line_number: y,
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
        //* boucle sur les positions de la pièce courante
        piece.current_positions.forEach(current_position => {
            //* pour chaque positions courantes on boucle sur toutes les positions
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
        //* on check si il y a des lignes complètes
        line.init();             
    },
    /* ------------------- METHODES ----------------- */
}