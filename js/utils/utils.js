export const utils = {
    //* méthode qui permet de faire une copie profonde d'un tableau (permet de délier la copie de son original)
    make_deep_copy_of_array: (array_object) => {
        const new_array_object = JSON.parse(JSON.stringify([...array_object.slice()]));
        return new_array_object;
    },
}

/* 
*DOCUMENTATION

Ce fichier regroupe les méthodes génériques utiles au projet et qui de ce fait ne peuvent pas être placées dans un autre module

*DESCRIPTION DES METHODES: (1)

- make_deep_copy_of_array(), permet de faire une copie "profonde" d'un tableau ou d'un objet:
    - pour comprendre l'intéret de cette méthode il faut expliquer la problématique:
        - lors de la copie d'un tableau ou d'un objet la copie sera liée au parent et si une des valeurs de l'un d'entre eux est modifiée, elle le sera également dans l'autre
        - ce comportement nous empêche donc de faire des copies et de modifier les valeurs uniquement dans la copie ou l'original
        - cette méthode va nous permettre de "casser ce lien" en utilisant 3 méthodes natives de js:
            - .slice()
            - JSON.stringify()
            - le spread operator [...tableau]
        - une fois les traitemants appliqués on repasse notre json en objet avec JSON.parse()
        - puis on retrourne la copie "profonde" qui ne sera alors plus liée à son original
*/