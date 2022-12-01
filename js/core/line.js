//* ce fichier sert à gérer la complétion de ligne
import { utils } from "../utils/utils.js";
import { grid } from "./grid.js";

//? le comportement qu'on veut -->
//? connaitre le nombre de ligne à suprimer
//? surpimer les lignes
//? faire descendre les autres lignes en conséquence

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
            //* si on est à la toute première itération
            if(i === 0) {
                //* on ajoute au tableau de la ligne courante sa première position
                current_row_array.push(all_positions_copy[i]);
            //* sinon si le compteur du nbr de colonne est inférieur à 9 (il y a 10 colonnes par ligne en comptant l'index 0 on arrive à 9) 
            } else if(columns_counter < 9) {
                //* on va pusher la position courante dans le tableau de la ligne courante
                current_row_array.push(all_positions_copy[i]);
                //* et incrémenter notre compteur
                columns_counter++;
            //* sinon c'est qu'on arrive sur le dernier index de la ligne courante
            } else {
                //* on va alors pusher la ligne courante dans le tableau qui stockera chaque lignes sous forme de sous tableaux
                rows_array.push(current_row_array);
                //* on vide le tableau de la ligne courante
                current_row_array = [];
                //* on incrémente avec le premier index de la ligne suivante notre tableau de la ligne courante
                current_row_array.push(all_positions_copy[i]);
                //* puis on repasse notre compteur de colonnes à 0
                columns_counter = 0;
            } 
        }
        //console.log(rows_array);
        line.check_and_delete(rows_array);
   },

    //* ici on check si il y a des lignes complètes
    check_and_delete: (rows_array) => {
        //* on a besoin d'un flag pour savoir si la ligne est complète ou non
        let flag = true;
        //* on parcourt toutes les lignes
        for (let i = 0; i < rows_array.length; i++) {
            //* on parcourt chaque case de la ligne
            for (let j = 0; j < rows_array[i].length; j++) {
                //* au moins un des index est pas utilisé par une pièce on met le flag à false (la ligne n'est pas complète)
                if (rows_array[i][j].used === 0) {
                    flag = false;
                }              
            }
            //* si le flag est à true on va donner la valeur de la ligne précédente à la ligne courante
            //* sauf si il s'agit de la 1ere ligne

            //* si le flag est à true
            if(flag) {
                //* on va parcourir le tableau des lignes
                for (let k = i; k >= i; k--) {
                    if(i === 0) {
                        for (let j = 0; j < rows_array[i].length; j++) {
                            rows_array[i][j].used = 0;
                            j % 2 === 0 ? rows_array[i][j].color = '#dbdbdb' : rows_array[i][j].color = '#cecece';            
                        }      
                    } else {
                        //* on va donner la 
                        rows_array[i] = rows_array[i - 1];
                    }  
                }
            }
            //* on remet la valeur initial du flag à true
            flag = true;    
        }
        console.log(rows_array);
        //* on fait de nos tableau un seul tableau et on le copie dans le tableau principal all_positions
        grid.all_positions = utils.make_deep_copy_of_array(rows_array.flat());
        //* enfin on redessine la grill
        grid.draw();
    },
   
    //* ici on met à jour les valeur du tableau de toutes les positions on fonction des lignes suprimées
    update_grid_positions: () => {

    },
}