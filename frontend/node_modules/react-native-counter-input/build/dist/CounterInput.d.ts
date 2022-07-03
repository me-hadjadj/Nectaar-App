import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
declare type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export interface ICounterInputProps {
    style?: CustomStyleProp;
    initial?: number;
    ImageComponent?: any;
    horizontal?: boolean;
    backgroundColor?: string;
    increaseButtonBackgroundColor?: string;
    decreaseButtonBackgroundColor?: string;
    width?: number;
    height?: number;
    borderRadius?: number;
    onIncreasePress?: (counter: number) => void;
    onDecreasePress?: (counter: number) => void;
    onChangeText?: (counter: number | string) => void;
    onChange: (counter: number) => void;
}
interface IState {
    counter: number;
    isPressed: boolean;
}
export default class CounterInput extends React.Component<ICounterInputProps, IState> {
    constructor(props: ICounterInputProps);
    handleOnIncreasePress: () => void;
    handleOnDecreasePress: () => void;
    handleOnChangeText: (text: string) => void;
    renderIncreaseCounter: () => JSX.Element;
    renderDecreaseCounter: () => JSX.Element;
    renderTextInput: () => JSX.Element;
    render(): JSX.Element;
}
export {};
