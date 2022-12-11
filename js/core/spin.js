import { spin_data } from '../data/data.js';
import { utils } from '../utils/utils.js';
import { grid } from './grid.js';
import { piece } from './piece.js';

export const spin = {

    /* ------------------ PROPRIETES ---------------- */
    current_positions_copy: null,
    counter: 0,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */

    init: () => {
        spin.current_positions_copy = utils.make_deep_copy_of_array(piece.current_positions);
        spin.update_counter();
    },

    update_counter: () => {
        if(spin.counter === spin_data[piece.current_type].length - 1) {
            spin.counter = 0;
        } else {
            spin.counter++;
        }
        spin.update_current_positions_copy();
    },

    update_current_positions_copy: () => {
        for(let index = 0; index < spin.current_positions_copy.length; index++) {
            spin.current_positions_copy[index].x += spin_data[piece.current_type][spin.counter][index].x;
            spin.current_positions_copy[index].y += spin_data[piece.current_type][spin.counter][index].y;
        }
        spin.check_border();
    },

    check_border: () => {
        let flag = false;
        for(let index = 0; index < spin.current_positions_copy.length; index++) {
            if(spin.current_positions_copy[index].x < 0 || spin.current_positions_copy[index].x > 279 || spin.current_positions_copy[index].y > 682) {
                flag = true;
            } 
        };
        flag ? spin.cannot_spin() : spin.check_other_positions();
    },

    check_other_positions: () => {
        let flag = false;
        for (let i = 0; i < spin.current_positions_copy.length; i++) {
            for (let j = 0; j < grid.all_positions.length; j++) {
                if(
                    spin.current_positions_copy[i].x === grid.all_positions[j].x 
                    && spin.current_positions_copy[i].y === grid.all_positions[j].y 
                    && grid.all_positions[j].used === 1
                ) {
                    flag = true;  
                }
            };        
        };
        flag ? spin.cannot_spin() : spin.can_spin();
    },

    can_spin: () => {
        piece.current_positions = utils.make_deep_copy_of_array(spin.current_positions_copy);
        piece.draw();
        grid.draw();
        spin.current_positions_copy = null;
    },

    cannot_spin: () => {
        if(spin.counter - 1 < 0) {
            spin.counter = spin_data[piece.current_type].length - 1;
        } else {
            spin.counter--;
        }
        spin.current_positions_copy = null;
    },

    /* ------------------- METHODES ----------------- */
};

/*
*DOCUMENTATION

Ce module permet de checker si la pièce courante peut faire une rotation
-> si c'est le cas effectuer cette rotation 
-> si ce n'est pas le cas ne rien faire

Pour faire cela, je me base sur une copie des positions de la pièce courante
Cette copie va être modifiée avec les valeurs qu'aurait la pièce courante si elle faisait la rotation demandée
Une série de check des valeurs copiées permettra de déterminer si cette rotation pourra avoir lieu
Si les check sont passés sans encombre alors on fera la rotation sur les valeurs de la pièce courante
Sinon on ne fera pas de rotation
Pour qu'une rotation ait lieu il faut que la pièce ne sorte pas de la grille et ne se trouve pas sur une position déjà occupée par une autre pièce

*DESCRIPTION DES PROPRIETES: (2)

- current_positions_copy: permet de stocker une copie des positions de la pièce courante
- counter: le compteur qui permet de savoir sur quelle position nous nous trouvons pour la pièce courante
(0 étant la position par défaut, cette valeur fait référence à l'index du tableau spin_data qui se trouve dans le fichier /data/data.js)

*DESCRIPTION DES METHODES: (7)

- init(), méthode qui initie le processus de rotation de la pièce courante:
    - on va faire une copie "profonde" des positions de la pièce courante et les stocker dans la propriété current_positions_copy
    - on va mettre à jour le compteur en appellant la méthode update_counter()

- update_counter(), permet de mettre à jour la valeur de la propriété counter:
    - on check si la valeur du compteur est égal au dernier index du tableau des rotations de la pièce courante:
        - si oui on met le compteur à 0
        - sinon on incrémente la compteur
        - on appel la méthode update_current_positions_copy() pour mettre à jour les valeurs de notre copie

- update_current_positions_copy(), permet la mise à jour des valeurs de la copie des positions de la pièce courante:
    - on va parcourir les positions courantes copiées:
        - pour chaque position on va ajouter la valeur correspondante présente dans le tableau spin_data
    - à ce stade on a une copie des positions courantes mis à jour avec les valeurs de la rotation en cours
    - on va checker si il y a une bordure avec la méthode check_border()

- check_border(), permet de vérifier si la copie des positions courantes après rotation se trouve en dehors de la grille:
    - on déclare un flag à false par défaut
    - on parcourt la copie des positions courante qui on subit la rotation:
        - si au moins une des position de la pièce est en dehors de la grille on passe la flag à true
    - en fin de boucle si le flag est true on jouera la méthode cannot_spin()
    - sinon ou jouera la méthode check_other_positions()

- check_other_positions(), si on arrive dans cette méthode c'est qu'on a validé le fais que la pièce ne sort pas de la grille,
    maintenant on veut vérifier si la pièce n'est pas supperposée sur une pièce déjà placée:
    - on utilise un flag par défaut à false
    - on itère sur les positions de la copie
        - pour chaque positions de la copie on itère sur toutes les positions de la grille
            - on check si les positions match et si la valeur used de la position de la grille est à 1
                - si c'est le cas alors le flag passe à true
    - en fin de boucle si le flag est true on jouera la méthode cannot_spin()
    - sinon ou jouera la méthode can_spin()

- can_spin(), si on arrive dans cette méthode on peut faire la rotation sur la pièce courante en se basant sur les valeurs initialement copiées:
    - on va copier la valeur de la copie dans current_positions de façon "profonde"
    - dessiner la grille
    - dessiner la pièce
    - et remettre à null les valeurs de la copie pour la prochaine rotation
    (la pièce a pu effectuer la rotation)

- cannot_spin(), cette méthode est jouée quand la pièce ne peut pas faire la rotation: 
    - on remet le compteur à la valeur qu'il possèdait avant de tenter de faire la rotation
    - le tableau copié des positions de la pièce courantes est remis à null
    (la pièce n'a pas pu faire la rotation pour une des raisons suivantes: 
        -> elle sort de la grille si elle fait la rotation
        -> elle se retrouve sur une pièce déjà placée si elle fait la rotation
    )

*/