import { user_input } from "./user_input.js";
import { utils } from "../utils/utils.js";
import { spin } from "./spin.js";

export const piece = {
    /* ------------------ PROPRIETES ---------------- */
    size: 31,
    starting_positions: {
        'I': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 124,y: 93}],
        'T': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 93,y: 31}, {x: 155,y: 31}],
        'O': [{x: 124,y: 0}, {x: 155,y: 0}, {x: 124,y: 31}, {x: 155,y: 31}],
        'L': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 155,y: 62}],
        'J': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 93,y: 62}],
        'S': [{x: 124,y: 0}, {x: 155,y: 0}, {x: 124,y: 31}, {x: 93,y: 31}],
        'Z': [{x: 124,y: 0}, {x: 155,y: 0}, {x: 155,y: 31}, {x: 186,y: 31}],
    },
    all_starting_positions: [
        {x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 124,y: 93}, {x: 93,y: 31}, {x: 155,y: 31},
        {x: 155,y: 0}, {x: 155,y: 62}, {x: 93,y: 62}, {x: 155,y: 0}, {x: 155,y: 0}, {x: 186,y: 31},
    ],
    current_positions: null,
    types: [ 'J', 'I', 'S', 'T', 'O', 'L', 'Z'],
    current_type: null,
    current_color: null,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */

    //* récupère le nom d'une pièce aléatoirement
    get_random_type: () => { 
        //* on remet la position de rotation par défaut à 0
        spin.counter = 0;
        piece.current_type = piece.types[Math.floor(Math.random() * piece.types.length)];
        //* si on veut tester un seul type de pièce -->
        //piece.current_type = 'I';
        piece.draw(piece.current_type);
        //console.log(JSON.stringify(piece.rotations_possibilities, null, 2));
    },

    //* dessine la pièce courante
    draw: (type) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        switch (type) {
            case 'I':
                piece.current_color = '#008000';
                break;
            case 'T':
                piece.current_color = '#0131b4';
                break;
            case 'O':
                piece.current_color = '#ff5109';
                break;
            case 'L':
                piece.current_color = '#e61919';
                break;
            case 'J':
                piece.current_color = '#fcdc12';
                break;
            case 'S':
                piece.current_color = '#791cf8';
                break;
            case 'Z':
                piece.current_color = '#008080';
                break;
        };
        ctx.fillStyle = piece.current_color;
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions[type]);
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.size, piece.size);
            });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.size, piece.size);
            });
        }
    },
};
