import { game } from "./game.js";

export const index = {
    init: () => {
        index.manage_to_small_screen_message();
    },
       
    manage_to_small_screen_message: () => {
        if(window.innerWidth < 680 || window.innerHeight < 720) {
            document.querySelector('.core').style.display = "none";
            document.querySelector('.screen_not_supported').style.display = "block";

        } else {
            //* LET'S GOO!
            game.init();
            index.slider_display_panel();
        }
    },

    slider_display_panel: () => {
        document.querySelector('.img_bloc_info_panel').addEventListener('mouseover', (event) => {
            document.querySelector('.side_how_to_play_panel').classList.add('slide_animation_panel');
        });
         
        document.querySelector('.img_bloc_info_panel').addEventListener('mouseleave', (event) => {
            document.querySelector('.side_how_to_play_panel').classList.remove('slide_animation_panel');
        });
        
    },
};

index.init();