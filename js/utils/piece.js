import { grid } from "./grid.js";
import { utils } from './utils.js';

export const piece = {
    square_size: 31,
    all_starting_positions: [
        {x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 124,y: 93}, {x: 93,y: 31}, {x: 155,y: 31},
        {x: 155,y: 0}, {x: 155,y: 62}, {x: 93,y: 62}, {x: 155,y: 0}, {x: 155,y: 0}, {x: 186,y: 31},
    ],
    //? ici on va définir un tableau des positions pour les pièces 
    //? ce tableau contient toutes lesp ositions de départ pour chacune des pièce puis sera mis à jour pendant que la pièce se déplacera
    starting_positions: {
        _I: [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 124,y: 93}],
        _T: [{x: 124,y: 0}, {x: 124,y: 31}, {x: 93,y: 31}, {x: 155,y: 31}],
        _O: [{x: 124,y: 0}, {x: 155,y: 0}, {x: 124,y: 31}, {x: 155,y: 31}],
        _L: [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 155,y: 62}],
        _J: [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 93,y: 62}],
        _S: [{x: 124,y: 0}, {x: 155,y: 0}, {x: 124,y: 31}, {x: 93,y: 31}],
        _Z: [{x: 124,y: 0}, {x: 155,y: 0}, {x: 155,y: 31}, {x: 186,y: 31}],
    },

    current_positions : null,
   
    //? méthode jouée avant de dessiner une piece: elle permet d'éviter de ce répéter
    prepare_drawing: (draw_function) => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        draw_function(ctx); 
    },

    draw_I: (ctx,) => {
        ctx.fillStyle = '#008000';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._I);
            piece.current_positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
        }
    },

    draw_T: (ctx) => {
        ctx.fillStyle = '#0131b4';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._T);
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
            } else {
                piece.current_positions.forEach((position) => {
                    ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
                });
            }
    },

    draw_O: (ctx) => {
        ctx.fillStyle = '#ff5109';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._O);
            piece.current_positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
        }
    },

    draw_L: (ctx) => {
        ctx.fillStyle = '#e61919';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._L);
            piece.current_positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
        }
    },

    draw_J: (ctx) => {
        ctx.fillStyle = '#fff100';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._J);
            piece.current_positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
        }
    },

    draw_S: (ctx) => {
        ctx.fillStyle = '#791cf8';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._S);
            piece.current_positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
        }
    },

    draw_Z: (ctx) => {
        ctx.fillStyle = '#008080';
        if(piece.current_positions === null) {
            piece.current_positions = utils.make_deep_copy_of_array(piece.starting_positions._Z);
            piece.current_positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
        } else {
            piece.current_positions.forEach((position) => {
                ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
            });
        }
    },

    draw_seat: (ctx, type, positions) => {
        //? on va commencer par donner la bonne couleur à la pièce
        switch (type) {
            case 'I':
                ctx.fillStyle = '#008000';
                break;
            case 'T':
                ctx.fillStyle = '#0131b4';
                break;
            case 'O':
                ctx.fillStyle = '#ff5109';
                break;
            case 'L':
                ctx.fillStyle = '#e61919';
                break;
            case 'J':
                ctx.fillStyle = '#fff100';
                break;
            case 'S':
                ctx.fillStyle = '#791cf8';
                break;
            case 'Z':
                ctx.fillStyle = '#008080';
                break;
        };
        //? puis dessiner chacune des des cases
        positions.forEach((position) => {
            ctx.fillRect(position.x, position.y, piece.square_size, piece.square_size); 
        });
    }
}