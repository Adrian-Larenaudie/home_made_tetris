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

    draw: () => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        grid.all_positions.forEach((position) => {
            ctx.fillStyle = position.color;
            ctx.fillRect(position.x, position.y, grid.size, grid.size);
        });
    },

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
        grid.draw();
    },

    seat_piece: () => {
        piece.current_positions.forEach(current_position => {
            grid.all_positions.forEach((grid_position) => {
                if(grid_position.x === current_position.x && grid_position.y === current_position.y) {
                    grid_position.used = 1;
                    grid_position.color = piece.current_color;
                }
            });
        });
        piece.current_positions = null;      
        line.init();             
    },
    /* ------------------- METHODES ----------------- */
};

/* 
*DOCUMENTATION

*DESCRIPTION DES PROPRIETES: (4)

- x_case_number: définit le nombre de case (colonnes) sur l'axe des x 
- y_case_number: définit le nombre de case (lignes) sur l'axe des y
- size: définint la taille d'une case en pixel
- all_positions: contiendra le tableau de toutes les positions de la grille lorsqu'elles seront générées avec la méthode generate_values()

*DESCRIPTION DES METHODES: (3)
- draw(), permet de dessiner la grille:
    - en parcourant tous les index du tableau de toutes les positions
    - on va dessiner une case avec les valeurs qui correspondent à l'index courant parcouru

- generate_values(), permet de générer toutes les valeurs des positions de la grille:
    - on s'assure que le tableau de toutes les positions est vide
    - on itère sur le nombre de ligne 
        - pour chaque ligne on itère sur chaque colonne
            - pour chaque case:
                - si l'index est pair: on donne les valeurs de la position courante et une couleur gris claire
                - si l'index est impair: on donne les valeurs de la position courante et une couleur grise un peu plus foncée
    - une fois que le tableau des positions est rempli on va appeler la méthode grid.draw() pour dessiner la grille

- seat_piece(), permet de placer la pièce courante arrivée en fin de parcours
    - on va mettre à jour le tableau de toutes les positions
    - pour cela on boucle sur les positions de la pièce courante (à placer)
        - pour chaque position de la pièce à placer on boucle sur toutes les positions de la grille 
            - si les positions match
                - la position de la grille prend la couleur de la position de la piece à placer
                - la position de la grille prend pour valeur 1 sur sa propriété used 
            (used permet de définir si la case est occupée par une pièce (used = 1) ou non (used = 0), par défaut toutes les positons used sont à 0)
    - une fois que les valeurs sont bien modifiées dans la tableau de toutes les positions de la grille
    - on va passer les positions de la piece courante à null
    - on appel la méthode line.init() pour checker si des lignes sont complétées pour ensuite les "supprimer"
*/