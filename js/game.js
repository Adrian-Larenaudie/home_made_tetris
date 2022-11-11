import { grid } from './utils/grid.js';
import { piece } from './utils/piece.js';
import { utils } from './utils/utils.js';

export const game = {
    over: false,
    interval: null,
    speed: 100,
    current_piece_type: null,
    current_piece_index: null,
    //? un tableau qui contient les dix positions atteignables par la piece courante
    //* par défaut il s'agit de la dernière ligne de la grille
    stop_positions: [
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
    //? on déclare un tableau qui contient toutes les fonctions pour chaque type de piece
    draw_pieces_functions: [
        {'method': piece.draw_I, 'type': 'I'},
        {'method': piece.draw_T, 'type': 'T'},
        {'method': piece.draw_O, 'type': 'O'},
        {'method': piece.draw_L, 'type': 'L'},
        {'method': piece.draw_J, 'type': 'J'},
        {'method': piece.draw_S, 'type': 'S'},
        {'method': piece.draw_Z, 'type': 'Z'},
    ],

    //? ce tableau nous servira à stocker les pièce qui sont placées
    seat_pieces: [],
    //? initialisation du jeu
    init: () => {
        //? on commence par dessiner la grille
        grid.draw();
        //? on pioche un index au hasard dans se tableau
        game.current_piece_index = Math.floor(Math.random() * game.draw_pieces_functions.length);
        //? on joue la méthode prepare drawing en lui passant la fonction qui dessinera la piece tirée au hasard
        piece.prepare_drawing(game.draw_pieces_functions[game.current_piece_index]['method']);
        game.current_piece_type = game.draw_pieces_functions[game.current_piece_index]['type'];
        game.interval = setInterval(game.on_move, game.speed);
    },

    on_move: () => {
        //* à chaque fois qu'on itère avec l'interval on va donner +31 à chacune des cases composant la pièce courante
        let move = true;
        //* on va parcourir toutes les stop_positions
        game.stop_positions.forEach((stop_position) => {
            //* si au moins une des cases de la pièce courante se trouve sur une des stop_postions on arrête l'interval
            piece.current_positions.forEach((current_position) => {
                if(current_position.x === stop_position.x && current_position.y === stop_position.y) {
                    move = false
                    clearInterval(game.interval);  
                }
            });
        });
        //* 
        if(move){
            piece.current_positions.forEach((position) => {
                position.y += 31;
            })
            grid.draw();
            piece.prepare_drawing(game.draw_pieces_functions[game.current_piece_index]['method'], piece.current_positions);
            //! PARTIE IMPORTANTE
        } else {
            //* si on la pièce est arrivée en bas on va modifier le tableau des stop position avec les nouvelles valeurs
            //* pour ça il faut analyser les current positions et stocker les valeurs y les plus petites 
            //* on va parcourir le tableau des stop position
            game.stop_positions.forEach((stop_position) => {
                piece.current_positions.forEach((current_position) => {
                    if(current_position.x === stop_position.x && current_position.y <= stop_position.y) {
                        stop_position.y = current_position.y - 31;
                  /*       console.log(
                            `current_position: ${JSON.stringify(current_position, null, 0)}, stop_position: ${JSON.stringify(stop_position, null, 0)}`
                        ); */
                        //* quand on détecte une postion courante sur le même axe des x qu'une stop position
                        //* on veut que si le y de cette stop position est supérieur au y de la position courante
                        //* alors on remplace la valeur du y de la stop position par la valeur du y de la position courante
                        //* en prenant soin de faire une copy profonde cet index pour éviter qu'ils soient liés entre eux
                    }
                });
            });
            //* maintenant qu'on a mis à jour notre tableau des stop positions on veut sauvegarder la pièce et son type dans le tableau des pièce placées
            //* dans le but de les redessiner par la suite
            game.seat_pieces.push({'position': utils.make_deep_copy_of_array(piece.current_positions), 'type': game.current_piece_type});
            //* maintenant nous allons générer une nouvelle pièce avec un nouvelle interval

            // on vide les current positions
            piece.current_positions = null;
            // on génère une nouvelle pièce
            game.current_piece_index = Math.floor(Math.random() * game.draw_pieces_functions.length);
            piece.prepare_drawing(game.draw_pieces_functions[game.current_piece_index]['method']);
            game.current_piece_type = game.draw_pieces_functions[game.current_piece_index]['type'];
            game.check_over();
            if(!game.over) {
                game.interval = setInterval(game.on_move, game.speed);
            }
        }
    },

    check_over: () => {
        //* dans cette méthode on veu vérifier si au moins une des postions dans le tableau des pieces placées est égal à une des positions de départ d'une des pièces
        game.seat_pieces.forEach((seat_piece) => {
            seat_piece.position.forEach((seat_position) => {
                piece.all_starting_positions.forEach((starting_position) => {
                    if(seat_position.x === starting_position.x && seat_position.y === starting_position.y) {
                        //* si c'est le cas pour le moment on clear l'interval et on log game over
                        console.log('game over!');
                        game.over = true;
                        clearInterval(game.interval);
                    }
                });  
            })
           
        });
    },
}

game.init();