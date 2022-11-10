/* on veut des cases sans bordure avec des colonne visibles pour l'utilisateur */

export const grid = {
    /* ------------------ PROPRIETES ---------------- */
    x_case_number: 10,
    y_case_number: 22,
    size: 31,
    all_positions: [],
    is_all_positions_set: false,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    draw: () => {
        const canvas = document.querySelector('canvas');
        //! pour le moment ces deux lignes ne fonctionnent pas il faut donner la valeur de la taille du canvas en dur sur le html
        //canvas.height = grid.y_case_number * grid.size; 682
        //canvas.width = grid.x_case_number * grid.size; 310
        const ctx = canvas.getContext('2d');
        for(let y = 0; y < grid.y_case_number ; y++) {
            for(let x = 0; x < grid.x_case_number; x++) {
                if(x % 2 === 0) {
                    ctx.fillStyle = '#dbdbdb';
                } else {
                    ctx.fillStyle = '#cecece';
                }
               
                ctx.fillRect((x * grid.size),(y * grid.size), grid.size, grid.size);
                if(!grid.is_all_positions_set) {
                    grid.all_positions.push({x: (x * grid.size), y: (y * grid.size)})
                }
            };
        };
        grid.is_all_positions_set = true;
    },
    /* ------------------- METHODES ----------------- */
};

/*
*DOCUMENTATION FR
ce fichier contient l'objet grid qui nous permet de générer la grille de jeu, de définir le nombre de case horizontale et verticale,
et de stocker toutes les valeurs de chacune des positions de la grille dans un tableau.
il nous permet également de piloter la taille des cases des bordures.
!REMARQUE les tailles sont dynamiques si elles sont modifiées ici elles seront modifiées pour le reste du code sauf pour la taille de la balise canvas
! il faut donc modifier en conséquence la taille de cette balise directement dans index.html
*DESCRIPTION DES PROPRIETES: (6)
- x_case_number, définit le nombre de cases sur l'axe des x
- y_case_number, définit le nombre de cases sur l'axe des y
- size, définit la taille en pixels d'une case
- border, définit la taille en pixels des bordures des cases
- all_positions, est un tableau qui va recevoir toutes les positions de la grille sous forme d'objets {x: <valeur>, y: <valeur>}
- is_all_positions_set, un booléen qui nous permet de savoir si toutes les positions de la grille ont déjà été stockées dans all_positions
*DESCRIPTION DES METHODES: (1)
- draw(), pour dessiner la grille et stocker nos positions dans le tableau on utilise cette méthode:
    - récupération de la balise canvas
    - on donne un contexte 2d au canvas
    - on donne une couleur à nos cases
    - on va parcourir le nombre de colonnes à l'aide d'une boucle 
        - dans cette boucle on va créer une autre boucle qui va parcourir le nombre de lignes
            - pour chaque case on va la dessiner sur la grille à l'aide des valeurs de nos propriétés 
            (une explication détaillée est donnée dans la méhode à l'aide de commentaires)
            - si notre booléen est false on incrémente notre tableau des positions avec la position courante
    - une fois les boucles parcourues on va pouvoir passer notre booléen à true 
    et éviter lors d'un nouvel appel de cette méthode-là sur implémentation de valeur dans ce tableau
*/