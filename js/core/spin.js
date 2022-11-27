import { spin_data } from '../data/spin_data.js';
import { utils } from '../utils/utils.js';
import { piece } from './piece.js';

export const spin = {

    /* ------------------ PROPRIETES ---------------- */
    current_positions_copy: null,
    counter: 0,

    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */

    //* pour initier le processus de rotation
    init: () => {
        //* on commence parfaire une copy profonde des positions de la pièce courante
        spin.current_positions_copy = utils.make_deep_copy_of_array(piece.current_positions);
        spin.update_counter();
    },

    //* met à jour la valeur du compteur, permet de récupérer les valeurs de la rotation à effectuer
    update_counter: () => {
        if(spin.counter === spin_data[piece.current_type].length - 1) {
            spin.counter = 0;
        } else {
            spin.counter++;
        }
        //* la valeur du compteur indique l'index du tableau spin_data qui nous interesse pour modifier les valeurs lié à cette rotation
        spin.update_current_positions_copy();
    },

    //* mise à jour des valeurs de la copie des positions de la pièce courante
    update_current_positions_copy: () => {
        //* on parcour les positions copiées
        for(let index = 0; index < spin.current_positions_copy.length; index++) {
            //* et on modifie les valeurs
            spin.current_positions_copy[index].x += spin_data[piece.current_type][spin.counter][index].x;
            spin.current_positions_copy[index].y += spin_data[piece.current_type][spin.counter][index].y;
        }
        spin.check_border();
    },

    //* permet de vérifier si la roation ne fait pas sortir la pièce de la grille de jeu
    check_border: () => {
        //* si au moins une des position de la pièce est en dehors de la grille ou jouera cannot_spin() sinon ou jouera can_spin()
        console.log(utils.make_deep_copy_of_array(spin.current_positions_copy));
        let flag = false;
        for(let index = 0; index < spin.current_positions_copy.length; index++) {
            if(spin.current_positions_copy[index].x < 0 || spin.current_positions_copy[index].x > 279 || spin.current_positions_copy[index].y > 682) {
                flag = true;
            } 
        };
        flag ? spin.cannot_spin() : spin.check_other_positions();
    },

    //* permet de vérifier si la rotation ne fait pas superposer la pièce courante sur une pièce déjà placée
    check_other_positions: () => {
        console.log('c\'est bon');
    },

    //* à jouer quand la pièce peut faire la rotation
    can_spin: () => {

    },

    //* à jouer quand la pièce ne peut pas faire la rotation
    cannot_spin: () => {
        //* ici on va remettre l'index à sa valeur précédente et vider le tableau des positions copiées
        if(spin.counter - 1 < 0) {
            spin.counter = spin_data[piece.current_type].length - 1;
        } else {
            spin.counter--;
        }
        spin.current_positions_copy = null;
        console.log('Bordure!!!');
    },

    /* ------------------- METHODES ----------------- */
}