import { grid_sizes, starting_positions } from "../data/data.js";
import { utils } from "../utils/utils.js";
import { spin } from "./spin.js";

export const piece = {
    /* ------------------ PROPRIETES ---------------- */
    size: grid_sizes.size,
    starting_positions: starting_positions,
    current_positions: null,
    types: [ 'J', 'I', 'S', 'T', 'O', 'L', 'Z'],
    current_type: null,
    current_color: null,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */

    get_random_type: () => { 
        spin.counter = 0;
        piece.current_type = piece.types[Math.floor(Math.random() * piece.types.length)];
        //* pour tester un type de pièce en particulier -->
        //piece.current_type = 'I';
        piece.draw(piece.current_type);
    },

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

/* 
*DOCUMENTATION

*DESCRIPTION DES PROPRIETES: (6)

- size: définit la taille des cases de la pièce
- starting_positions: contient le tableau des positions de départ pour chaque type de pièce
- current_positions: contient les positions de la pièce courante
- types: contient le tableau qui répertorie tous les types de pièce existentes (7) 
- current_type: contient le type de la pièce courante 
- current_color: contient la couleur de la pièce courante

*DESCRIPTION DES METHODES: (2)

- get_random_type(), permet de récupérer le nom d'une pièce aléatoirement dans le tableau des types de pièces:
    - on commence par mettre le compteur des rotations à 0 
    (la valeur du compteur permet de savoir sur quel type de rotation nous nous trouvons, (plus de détails dans la doc de spin.js)
    - on pioche un index aléatoire dans le tableau des types de pièce, on donne la valeur de l'index à la propriété piece.current_type
    - on appel la méthode draw() pour dessiner la pièce à partir de ce type

- draw(), permet de dessiner ou de redessiner la pièce courante:
    - récupération du canvas dans une constante
    - on donne un context 2d au canves
    - un switch case permet de donner la couleur désirée à la propriété current color en fonction du type de pièce
    - ensuite on donne la couleur 
    - on a alors un check:
        - si les positions de la pièce courante sont null, on est dans le cas ou la pièce est dessinée pour la premère fois:
            - dans ce cas on va utiliser les datas des positions de départs pour dessiner la pièce
            - on fait une copie "profonde" à partir du tableau des positions de départ
            (plus de détail dans la doc du module utils.js pour les copies "profondes")
            - une fois qu'on a stocké les positions, on va les parcourir pour dessiner chaque case de la pièce
        - sinon c'est qu'on est dans le cas ou la pièce courante est redessinée:
            - on parcourt les positions de la pièce courante pour dessiner chaque case de la pièce courante
*/