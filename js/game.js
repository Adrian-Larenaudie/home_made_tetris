import { user_input } from "./core/user_input.js";
import { grid } from "./core/grid.js";
import { piece } from "./core/piece.js";
import { end_positions, speed } from "./data/data.js";
import { scoring } from "./core/scoring.js";
import { song } from './utils/song.js';

export const game = {
    /* ------------------ PROPRIETES ---------------- */
    over: false,
    running: false,
    interval: null,
    speed: speed.current,
    end_positions: end_positions,
    button: document.querySelector('.launch_button'),
    modal: document.querySelector('.modal'),
    pause_modal: document.querySelector('.modal_pause'),
    pause: false,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        game.running = false;
        song.init();
        scoring.init();
        grid.generate_values();
        grid.draw(); 
        game.modal.style.visibility = 'visible'; 
        game.button.addEventListener('click', (event) => {
            game.running = true;
            clearInterval(game.interval);
            game.speed = speed.current;
            piece.current_positions = null,
            piece.current_type = null,
            piece.current_color = null,   
            game.modal.style.visibility = 'hidden';
            game.launch_game();
        })
    },

    launch_game: () => { 
        piece.get_random_type();    
        game.interval = setInterval(game.on_move, game.speed);
        user_input.add_key_event();
    },

    on_move: () => {
        let move = true;

        piece.starting_positions[piece.current_type].forEach((sarting_position) => {
            grid.all_positions.forEach((grid_position) => {
                if(grid_position.x === sarting_position.x && grid_position.y === sarting_position.y && grid_position.used === 1) {
                    //* si c'est le cas on clear l'interval
                    move = false
                    game.over = true; 
                }
            });
        });

        game.end_positions.forEach((stop_position) => {
            piece.current_positions.forEach((current_position) => {
                if(current_position.x === stop_position.x && current_position.y === stop_position.y) {
                    move = false
                    clearInterval(game.interval);  
                }
            });
        });

        piece.current_positions.forEach((current_position) => {
            grid.all_positions.forEach((grid_position) => {
                if(grid_position.x === current_position.x && grid_position.y === (current_position.y + 31) && grid_position.used === 1) {
                    move = false;
                    clearInterval(game.interval);  
                }
            });
        });

        if(move){
            piece.current_positions.forEach((current_position) => {
                current_position.y += 31;
            });
            grid.draw();
            piece.draw(piece.current_type);
        } else if(!game.over) {
            grid.seat_piece();
        } else {
            scoring.set_best_score();
            game.over = false;    
            user_input.remove_key_event();
            document.querySelector('.modal_title').textContent = 'Game Over!';
            game.init();
        }
    },
    /* ------------------- METHODES ----------------- */
};

//* LET'S GOO!
game.init();
// cet event est appelé qu'une seul fois et détectera le changement de page pour activer une pause si le jeu est lancé
user_input.on_visibility_change_page_event_handler();

/* 
*DOCUMENTATION

game.js est le fichier principale du jeu.

On retrouve une partie importation des différents objets contenus dans différents fichiers:
- user_input.js permet la gestion des inputs utilisateur
- grid.js permet de générer les positions de la dessiner et de placer une pièce arrivée en bout de parcourt
- piece.js permet de générer une pièce aléatoirement et de la dessiner puis de la redessiner tout au long de son parcourt
- data.js regroupe un certain nombre de données spécifiques pour faciliter leur pilotage
- scoring.js qui nous permet de jouer un son lors du croquage de pomme, d'activer désactiver ce son à l'aide d'un bouton sur le document
TODO - song.JS permet la gestion du son (fonctionnalité à faire)

Ensuite nous avons la partie qui contient notre objet game dans lequel on retrouve plusieurs propriétés et méthodes.

Les propriétés vont nous permettre de déterminer un état et les méthodes de modifier cet état.

*DESCRIPTION DES PROPRIETES: (8)

- over,  booléen qui détermine si la partie est terminée ou non
- interval: ui va recevoir le setInterval du jeu (permet de gérer le parcourt d'une pièce jusqu'à son positionnement)
- speed: définit la vitesse de déplacement de la pièce (du set interval)
- end_positions: regroupe les positions de la dernière ligne de la grille
- button: reçoit l'élément du DOM qui permet de lancé la partie lors du clique sur ce dernie
- modal: reçoit l'élément du DOM qui contient la boite modale affiché en début et fin de partie
TODO - pause_modal: reçoit l'élément du DOM qui contient la boite modale affichée lors d'une pause
TODO - pause: booléen qui définit si la pause est activée ou non

*DESCRIPTION DES METHODES: (3)

- init() permet d'initialiser une partie, on va y appeler plusieurs méthodes et effectuer différentes actions:
    - initialisation du module scoring.js
    - génération des valeur de la grille et de leurs attributs
    - dessin de la grille dans la balise canva à l'ai des des valeurs générées
    - affichage de la modal de lancemant de partie
    - ajout de l'event click sur le bouton de lancement de partie au click sur ce bouton:
        - on clear l'interval précédant (utile dans le cas ou la partie a été relancée)
        - on définit la vitesse du jeu à l'aide des datas
        - on définit les valeurs de la pièce courante: (les valeurs de la pièce sont toutes à null puisque la pièce courante n'a pas encore été générée)
            - les positions de la pièce courante reçoit null pour valeur 
            - le type de pièce courante reçoit null pour valeur 
            - la couleur de la pièce courante reçoit null pour valeur  
        - on cache la modal
        - on appel la méthode qui lance la partie

- launch_game(), permet de lancer la partie, détailles des instructions:
    - on appel la méthode du module piece.js qui permet de récupérer une pièce aléatoirement parmis les 7 possibles
    - on stock notre interval dans la propriété interval ce qui nous permettra de la stopper facilement, l'interval appelera la métode on_move toute les game.speed millisecondes
    - on appel la méthode du module user_inputs.js qui permet d'activer les évènement sur les inputs utilisateur

- on_move(), permet de gérer toute la partie parcourt de la pièce courante:
    - on a d'abord un flag nommé move, passé par défaut à true et qui détermine si la pièce courante peut se déplacer à true ou pas à false
    - ensuite on a 3 bloques de vérifications qui vont changer ou non notre flag:
        - 1er bloque: check si une des positions de départ de notre pièce est la même qu'une pièce déjà placée:
            - pour cela on parcourt toutes les positions de départ de notre pièce courante
            - pour chacune de ces positions on va parcourir toute la grille
            - si la position de départ match avec la position de la grille et que la valeur used est à 1 (signifie que la case est occupée par une pièces déjà placée)
            - on change le flag move à false
            - on passe la valeur de game.over à true
        - 2ème bloque: check si une des positions de la pièce courante arrive sur une des positions de la dernière ligne de la grille:
            - on parcourt le tableau des positions de la dernière ligne de la grille
            - pour chacune de ces positions on va parcourir toutes les positions de la pièce courante
            - si la la position de la pièce courante match avec la position de la dernière ligne de la grille
            - on change notre flag move à false
            - on clear l'interval en cours
        3ème bloque: check si une des position de la pièce courante se trouve sur la case juste avant une case occupée par une pièce déjà placée:
            - on parcourt toutes les position de la pièce courante
            - pour chacune des ces positions on va parcourir toute la grille
            - pour vérifier si il y a un match on va anticiper la valeur qu'aura la positions de la pièce courante lors de son prochain déplacement on peut le traduire comme ceci:
                - si la position courante de la pièce + une case vers le bas match avec la position de la grille et que la position de la grille est occupée par une pièce déjà placée
                - alors on passe notre flag move à false
                - et on clear notre interval
    - après avoir fait toutes ces vérifications on va checker si le flag move est à true:
        - si il est true:
            - on parcourt toutes les positions de la pièce courante et on leur ajoute la valeur d'une case vers le bas
            - on redessine la grille
            - on redessine la pièce avec ses nouvelles positions
        - si game.over est true:
            - on appel la méthode seat_piece() du module grid.js (nous permettra de placer la pièce dans l'objet des positions de la grille)
        - sinon dans la cas ou seulement le flag move est false:
            - on appel la méthode set_best_score() du module scoring.js qui mettra à jour le meilleure score en local storage
            - on remet la valeur du booléen game.over à false
            - on appel la méthode remove_key_event() du module user_input.js pour désactiver les inputs utilisateur
            - on modifie le titre de la modal par Game Over!
            - on appel notre méthode game.init() 
            - la boucle est bouclée le user peut relancer une partie

    * --> RDV dans les autres fichiers pour des explications similaires <-- *
*/
