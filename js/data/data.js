//?? ici toutes les valeurs qui définissent le jeu sont déclarées, elles sont ensuite exploitées dans les différents modules ??//

//* cet objet définit par défauts les positions de départ pour chaque type de pièce
export const starting_positions = {
    'I': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 124,y: 93}],
    'T': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 93,y: 31}, {x: 155,y: 31}],
    'O': [{x: 124,y: 0}, {x: 155,y: 0}, {x: 124,y: 31}, {x: 155,y: 31}],
    'L': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 155,y: 62}],
    'J': [{x: 124,y: 0}, {x: 124,y: 31}, {x: 124,y: 62}, {x: 93,y: 62}],
    'S': [{x: 124,y: 0}, {x: 155,y: 0}, {x: 124,y: 31}, {x: 93,y: 31}],
    'Z': [{x: 124,y: 0}, {x: 155,y: 0}, {x: 155,y: 31}, {x: 186,y: 31}],
};

//* ce tableau définit la ligne des positions final de la grille de jeu
export const end_positions = [
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
];

//* cet objet définit la taille des cases du jeu le nombre de colonne et de ligne y = ligne x = colonne
export const grid_sizes = {
    x_case_number: 10,
    y_case_number: 22,
    size: 31,
};

export const speed = {
    current: 400,
    on_key_press_s: 40
}

//* EXPLICATIONS DE L'OBJET spin_data -->
//* contient les données relatives au rotations - la lettre indique le type de pièce -
//* le nombre de tableau associé à la lettre indique le nombre de rotation possible pour cette pièce -
//* les quatres objets de chaque tableau contiennent les valeurs à ajouter à chaque case de la pièce courante correspondant au même index -
//? REMARQUE chaque pièce effectue une rotation autour d'une de ses propres cases, l'index qui possède des valeurs à zéro représente cette case -
//? REMARQUE la pièce nommée O ne faot aucune rotations puisqu'il s'agit d'un carré

export const spin_data = {
    'J': [
        [{x: -31, y: -31}, {x: 0, y: 0}, {x: 31, y: 31}, {x: 0, y: 62}],
        [{x: -31, y: 31}, {x: 0, y: 0}, {x: 31, y: -31}, {x: 62, y: 0}],
        [{x: 31, y: 31}, {x: 0, y: 0}, {x: -31, y: -31}, {x: 0, y: -62}],
        [{x: 31, y: -31}, {x: 0, y: 0}, {x: -31, y: 31}, {x: -62, y: 0}],
    ],
    'T': [
        [{x: -31, y: -31}, {x: 0, y: 0}, {x: -31, y: 31}, {x: 31, y: -31}],
        [{x: -31, y: 31}, {x: 0, y: 0}, {x: 31, y: 31}, {x: -31, y: -31}],
        [{x: 31, y: 31}, {x: 0, y: 0}, {x: 31, y: -31}, {x: -31, y: 31}],
        [{x: 31, y: -31}, {x: 0, y: 0}, {x: -31, y: -31}, {x: 31, y: 31}]
    ],
    'L': [
        [{x: -31, y: -31}, {x: 0, y: 0}, {x: 31, y: 31}, {x: 62, y: 0}],
        [{x: -31, y: 31}, {x: 0, y: 0}, {x: 31, y: -31}, {x: 0, y: -62}],
        [{x: 31, y: 31}, {x: 0, y: 0}, {x: -31, y: -31}, {x: -62, y: 0}],
        [{x: 31, y: -31}, {x: 0, y: 0}, {x: -31, y: 31}, {x: 0, y: 62}]
    ],
    'I': [
        [{x: 31, y: -31}, {x: 0, y: 0}, {x: -31, y: 31}, {x: -62, y: 62}],
        [{x: -31, y: 31}, {x: 0, y: 0}, {x: 31, y: -31}, {x: 62, y: -62}],
    ],
    'S': [
        [{x: 0, y: 0}, {x: 31, y: 31}, {x: -31, y: 31}, {x: -62, y: 0}],
        [{x: 0, y: 0}, {x: -31, y: -31}, {x: 31, y: -31}, {x: 62, y: 0}],
    ],
    'Z': [
        [{x: -31, y: -31}, {x: 0, y: 0}, {x: -31, y: 31}, {x: 0, y: 62}],
        [{x: 31, y: 31}, {x: 0, y: 0}, {x: 31, y: -31}, {x: 0, y: -62}],
    ],
    'O': [
        // cette pièce ne fait pas de rotation
    ],
};

