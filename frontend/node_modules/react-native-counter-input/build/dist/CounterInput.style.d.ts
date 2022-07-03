import { ViewStyle, ImageStyle, TextStyle } from "react-native";
interface Style {
    textInputStyle: TextStyle;
    buttonImageStyle: ImageStyle;
}
export declare const _container: (width: number | undefined, horizontal: boolean, backgroundColor: string, borderRadius: number) => ViewStyle;
export declare const _increaseButtonStyle: (isPressed: boolean, increaseButtonBackgroundColor: string) => ViewStyle;
export declare const _decreaseButtonStyle: (isPressed: boolean, decreaseButtonBackgroundColor: string) => ViewStyle;
declare const _default: Style;
export default _default;
