on pourrait avoir un tableau qui contient toutes les coordonnées de la grille sur laquelle on ajoute une valeur binaire:
    - 0 la case n'est pas occupée 1 la case est occupée par une pièce
    - dans se tableau une autre valeur pourrait indiquer la couleur à dessiner de la pièce ou null si c'est une case vide
    - sur cette base on aurait une méthode draw_grid pour dessiner une grille vierge (la même que celle déjà écrite dans grid.js)
    - une seconde méthode draw_seated_pieces qui viendrait parcourir le tableau des coordonnées de la grille si c'est 1 dessine la couleur qui est liée

il faudrait également un tableau qui contient toutes les positions de chaque case occupée récupéré à partir du tableau des positions
    - se tableau nous permettrai d'interdir les positions déjà occupées, il faut les interdire:
        - lorsqu'une pièce arrive dessus en descendant 
        - lorsqu'e l'utilisateur déplace la pièce à gauche ou à droite


REMARQUE il peut être intéressant d'ajouter dans le tableau des coordonnées une case de bordure qui bloquerait les pièce elle aurait pour valeur -1