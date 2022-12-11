import { game } from "../game.js";
import { utils } from "../utils/utils.js";
import { grid } from "./grid.js";
import { piece } from "./piece.js";
import { scoring } from "./scoring.js";

export const line = {

    init: () => {
        line.make_array_of_rows();
    },

    make_array_of_rows: () => {
        const all_positions_copy = utils.make_deep_copy_of_array(grid.all_positions);
        let columns_counter = 0;
        let rows_array = [];
        let current_row_array = [];
        for (let i = 0; i < all_positions_copy.length; i++) {
            if(i == all_positions_copy.length - 1) {
                current_row_array.push(all_positions_copy[i]);
                rows_array.push(current_row_array);
                current_row_array = [];
            } else if(all_positions_copy[i].line_number == columns_counter) {
                current_row_array.push(all_positions_copy[i]);
            } else {
                columns_counter++;
                rows_array.push(current_row_array);
                current_row_array = [];
                current_row_array.push(all_positions_copy[i]);
            }
        }
        line.check_and_delete(rows_array);
   },

    check_and_delete: (rows_array) => {
        let flag = true;
        for (let i = 0; i < rows_array.length; i++) {
            for (let j = 0; j < rows_array[i].length; j++) {
                if (rows_array[i][j].used === 0) {
                    flag = false;
                }        
            }
            if(flag) {
                scoring.completed_lines++;
                scoring.update_score();
                if (i != 0) {
                    for (let k = i; k > 0; k--) {
                        if(k > 0) {
                            for (let row = 0; row < rows_array[k].length; row++) {
                                rows_array[k][row].used = rows_array[k - 1][row].used;
                                rows_array[k][row].color = rows_array[k - 1][row].color;      
                            }
                        }                    
                    }
                } else {
                    for (let j = 0; j < rows_array[i].length; j++) {
                        rows_array[i][j].used = 0
                        j % 2 === 0 ? rows_array[i][j].color = '#dbdbdb' : rows_array[i][j].color = '#cecece';                 
                    }   
                }
            }
            flag = true;    
        }
        grid.all_positions = utils.make_deep_copy_of_array(rows_array.flat());
        grid.draw();
        piece.get_random_type();
        game.interval = setInterval(game.on_move, game.speed);      
    },

};


/*
*DOCUMENTATION

ce fichier sert à gérer la complétion de ligne: 
le fonctionnemant est le suivant:
-> on va d'abord copier le tableau de toutes les positions de la grille
-> on va opérer un traitemant sur ce tableau pour faire en sorte qu'il ne contienne que des sous tableaux:
(chaque sous tableau représente une ligne de la grille)
-> à partir de ce tableau de sous tableau, on va checker pour chaque sous tableau (ligne), si la ligne courante est complète
-> quand c'est le cas on va donner rétroactivement la valeur de la ligne du dessus à la ligne courante
-> pour cela on va parcourir le tableau des lignes à l'envers à partir de la ligne qui est complète (afin de remonter vers la 1ere ligne de la grille)
-> dans le cas ou la ligne complète est la première ligne de la grille, on ne peut pas lui donner la valeur de la ligne du dessus
puisqu'elle est inexistante: on va donc simplement lui redonner les valeurs par défaut avant qu'il y ait des pièces placées sur cette ligne

*DESCRIPTION DES PROPRIETES: (0)

Aucune propriétés dans ce module

*DESCRIPTION DES METHODES: (3)

- init(), cette métode va simplement initialiser le module en appellant la méthode make_array_of_rows()

- make_array_of_rows(), cette méthode retourne un tableau contenant pour chaque ligne de la grille un sous tableau des positions de cette ligne:
    - on commence par faire une copie "profonde" du tableau de toutes les positions
    - on a besoin de compter le nombre de colonnes (10 par ligne), variable: (columns_counter)
    - on veut stocker toutes les lignes dans un tableau à part, variable: (rows_array)
    - chaque ligne courante sera stockée dans un tableau provisoire, variable: (current_row_array)
    - on itère sur la copie du tableau de toutes les positions:
        - si on arriva à la dernière itéraition
            - on va ajouter cette position dans le tableau (current_row_array)
            - on ajoute la ligne complètée contenu dans (current_row_array) dans le tableau des (rows_array)
            - on vide le tableau (current_row_array)
        - sinon si la valeur du compteur de colonne est égal à la valeur de la propriété line_number:
        (ici line_number est la propriété du tableau copié de toutes les position à l'index courant)
            - on push la position courante dans le tableau de la ligne courante: (current_row_array)
        - sinon:
            - on incrémente le compteur de colonne: (columns_counter)
            - on ajoute la ligne courante complétée: (current_row_array), dans le tableau des lignes: (rows_array)
            - on vide le tableau de la ligne courante: (current_row_array)
            - on débute une nouvelle ligne courante: (current_row_array) en lui ajoutant la position courante
    - on appel la méthode check_and_delete(), en lui passant en paramètre, le tableau qui contient toutes les ligne de la grille, (sous forme de sous tableaux)

- check_and_delete(), cette méthode permet de vérifier si il y a des lignes complètes, 
    de les supprimer, de faire descendre en conséquence les lignes incomplètes du dessus, puis de redessiner la grille: 
    - on a besoin d'un flag pour savoir si la ligne est complète ou non: (flag = true par défaut)
    - on va itérer sur toutes les lignes du tableau des lignes: 
        - pour chaque ligne on va parcourir chaque cases la composant:
            - si au moins un des index n'a pas sa valeur used à 1, on met le flag à false (la ligne n'est pas complète)
        - si le flag est true: (la ligne courante est complète):
            - on met à jour le score en ajoutant une ligne complète et en appelant la méthode update_score()
            - si on n'est pas en train de parcourir la 1ere ligne de la grille:
                - on a une ligne complète à l'index i, on va lui donner la valeur de la ligne du dessus 
                (mais il faut l'appliquer retroactivement aux autres lignes du dessus)
                - on sait que i est aussi égal à la valeur du nombre de ligne, on va donc parcourir i à l'envers:
                (on va utiliser l'index k pour parcourir les lignes du dessus)
                    - et dire que la ligne k prend la valeur de la ligne k - 1 sauf si la ligne k est la 1ére du tableau
                        - on fait en sorte d'attribuer la bonne valeur used et la bonne couleur
            - si on parcourt la 1ere ligne:
                - on parcourt les cases de la ligne
                - on redonne à la case la valeur used à 0
                - et donne à la case la couleur gris ou gris claire selon si l'index est impair ou pair
        - si le flag est false: (la ligne courante est incomplète):
            - on ne fait rien
        -  on remet la valeur initial du flag à true
    - quand on arrive ici on a finit d'itérer sur toutes les lignes et on a mis à jour ses valeurs: (en fonction des lignes complètes)
    - on va donc déverser le contenu du tableau des lignes dans le tableau original de toutes les positions
    (en prenant soin d'appliquer la méthode .flat() pour que les sous tableaux ne fassent plus qu'un tableau)
    - on redessine la grille avec nos nouvelles valeurs
    - puis on récupère une pièce aléatoirement
    - enfin on relance un interval pour que la nouvelle pièce se déplace
*/
 