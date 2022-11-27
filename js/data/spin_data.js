
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
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
    ],
    'L': [
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
    ],
    'I': [
        [{x: 31, y: -31}, {x: 0, y: 0}, {x: -31, y: 31}, {x: -62, y: 62}],
        [{x: -31, y: 31}, {x: 0, y: 0}, {x: 31, y: -31}, {x: 62, y: -62}],
    ],
    'S': [
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
    ],
    'Z': [
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
    ],
    'O': [
        // cette pièce ne fait pas de rotation
    ],
}