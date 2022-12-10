//* ce fichier sert à gérer la complétion de ligne
import { game } from "../game.js";
import { utils } from "../utils/utils.js";
import { grid } from "./grid.js";
import { piece } from "./piece.js";
import { scoring } from "./scoring.js";

export const line = {

    //* initialise le module
    init: () => {
        line.make_array_of_rows();
    },

    //* On va écrire une fonction qui va retourner un tableau contenant pour chaque lignes de la grille un sous tableau de positions
    make_array_of_rows: () => {
        //* on va faire une copie profonde du tableau de toutes les positions
        const all_positions_copy = utils.make_deep_copy_of_array(grid.all_positions);

        //* on a besoin de compter le nombre de colonnes (10 par ligne)
        let columns_counter = 0;
        //* on veut stocker toutes les lignes dans un tableau à part
        let rows_array = [];
        //* chaque ligne courantes seront stockées dans un tableau provisoire
        let current_row_array = [];
        //* on itère sur la copie du tableau de toutes les positions
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

    //* cette méthode permet de check les lignes complètes les supprimer et redessiner la grille avec les nouvelles valeurs
    check_and_delete: (rows_array) => {
        //* on a besoin d'un flag pour savoir si la ligne est complète ou non
        let flag = true;
        //* on parcourt toutes les lignes
        for (let i = 0; i < rows_array.length; i++) {
            //* on parcourt chaque case de la ligne
            for (let j = 0; j < rows_array[i].length; j++) {
                //* si au moins un des index n'est pas utilisé par une pièce on met le flag à false (la ligne n'est pas complète)
                if (rows_array[i][j].used === 0) {
                    flag = false;
                }        
            }
            if(flag) {
                scoring.completed_lines++;
                scoring.update_score();
                if (i != 0) {
                    //* on a une ligne complète à l'index i
                    //* donc là on veut donner à cette ligne la valeur de la ligne du dessus
                    //* on pourrait écrire simplement
                    // rows_array[i] = rows_array[i - 1];
                    //* mais il faut l'appliquer retroactivement aux lignes du dessus
                    //* on sait que le nbr de ligne du dessus est égal à la valeur de i 
                    //* on va donc parcourir i à l'envers
                    for (let k = i; k > 0; k--) {
                        //* et dire que la ligne k prend la valeur de la ligne k - 1 sauf si la ligne k est la 1ére du tableau
                        if(k > 0) {
                            for (let row = 0; row < rows_array[k].length; row++) {
                                rows_array[k][row].used = rows_array[k - 1][row].used;
                                rows_array[k][row].color = rows_array[k - 1][row].color;      
                            }
                        }                    
                    }
                //* si c'est la première ligne
                } else {
                    //* on parcourt la ligne
                    for (let j = 0; j < rows_array[i].length; j++) {
                        //* on lui redonne la valeur used à 0
                        rows_array[i][j].used = 0
                        //* et on lui donne la couleur gris ou gris claire selon si l'index est impair ou pair
                        j % 2 === 0 ? rows_array[i][j].color = '#dbdbdb' : rows_array[i][j].color = '#cecece';                 
                    }   
                }
            }
            //* on remet la valeur initial du flag à true
            flag = true;    
        }
        //* on fait de nos tableaux un seul tableau et on le copie dans le tableau principal all_positions
        grid.all_positions = utils.make_deep_copy_of_array(rows_array.flat());
        grid.draw();
        piece.get_random_type();
        game.interval = setInterval(game.on_move, game.speed);      
    },

};

