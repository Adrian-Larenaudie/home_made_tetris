export const utils = {
    //* méthode qui permet de faire une copie profonde d'un tableau (permet de délier la copie de son original)
    make_deep_copy_of_array: (array) => {
        const new_array = JSON.parse(JSON.stringify([...array.slice()]));
        return new_array;
    },
    make_deep_copy_of_object: (object) => {
        const new_array = [...object.slice()];
        return new_array;
    },
}