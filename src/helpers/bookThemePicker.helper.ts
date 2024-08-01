import { BookPlaceHolderThemes } from "../constants/bookPlaceHolderThemes"

export const bookRandomCoverThemePicker = () : string =>{
    return BookPlaceHolderThemes[(Math.floor(Math.random() * BookPlaceHolderThemes.length))]
}