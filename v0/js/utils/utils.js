export const utils = {
    make_deep_copy_of_array: (array) => {
        const new_array = JSON.parse(JSON.stringify([...array.slice()]));
        return new_array;
    },
    //* cette méthode récupère un tableau qui possède pour chaque index un objet avec deux valeur elle retourne deux tableau qui séparent ces deux valeurs
    split_array_positions: (array) => {
        let first_array = [];
        let second_array = [];
        array.forEach((position) => {
            first_array.push(position.x);
            second_array.push(position.y);
        });
        return [first_array, second_array];
    }
}