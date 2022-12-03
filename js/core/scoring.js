export const scoring = {
    /* ------------------ PROPRIETES ---------------- */
    current_score_displayer: document.querySelector('.current_score_value'),
    best_score_displayer: document.querySelector('.best_score_value'),
    completed_lines_displayer: document.querySelector('.completed_lines_value'),
    max_completed_lines_displayer: document.querySelector('.max_completed_lines_value'),
    end_game_score_displayer: document.querySelector('.end_game_score'),
    completed_lines: 0,
    current_score: 0,
    end_game_score: 0,
    /* ------------------ PROPRIETES ---------------- */

    /* ------------------- METHODES ----------------- */
    init: () => {
        scoring.get_best_score();
    },

    get_best_score: () => {
        if(localStorage.getItem("best_score")) {
            scoring.best_score_displayer.textContent = localStorage.getItem("best_tetris_score");
            scoring.max_completed_lines_displayer.textContent = localStorage.getItem("max_completed_lines_value");
        }
    },

    set_best_score: () => {
        if(localStorage.getItem("best_score")) {
            if(localStorage.getItem("best_tetris_score") < scoring.current_score) {
                localStorage.setItem("best_tetris_score", scoring.current_score);
                localStorage.setItem("max_completed_lines_value", scoring.completed_lines);
            }
        } else {
            localStorage.setItem("best_tetris_score", scoring.current_score);
            localStorage.setItem("max_completed_lines_value", scoring.completed_lines);
        }
        scoring.end_game_score = scoring.current_score;
        scoring.current_score = 0;
        scoring.completed_lines = 0;
        scoring.current_score_displayer.textContent = 0;
        scoring.completed_lines_displayer.textContent = 0;
        scoring.end_game_score_displayer.textContent =  'score: ' + scoring.end_game_score;
    },

    update_score: () => {
        scoring.current_score+= 10 * scoring.completed_lines;
        scoring.current_score_displayer.textContent = scoring.current_score;
        scoring.completed_lines_displayer.textContent = scoring.completed_lines;
    },
    /* ------------------- METHODES ----------------- */
};