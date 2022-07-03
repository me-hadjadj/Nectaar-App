"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._decreaseButtonStyle = exports._increaseButtonStyle = exports._container = void 0;
const react_native_1 = require("react-native");
exports._container = (width, horizontal, backgroundColor, borderRadius) => ({
    width: width,
    backgroundColor,
    borderRadius: borderRadius,
    padding: horizontal ? 0 : 9,
    minHeight: horizontal ? 45 : 140,
    maxWidth: horizontal ? undefined : 70,
    flexDirection: horizontal ? "row" : "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowRadius: 8,
    shadowOpacity: 0.2,
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: {
        width: 0,
        height: 3,
    },
});
exports._increaseButtonStyle = (isPressed, increaseButtonBackgroundColor) => ({
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isPressed ? increaseButtonBackgroundColor : "transparent",
    shadowOpacity: isPressed ? 0.1 : 0,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
});
exports._decreaseButtonStyle = (isPressed, decreaseButtonBackgroundColor) => ({
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isPressed ? "transparent" : decreaseButtonBackgroundColor,
    shadowOpacity: isPressed ? 0 : 0.1,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
});
exports.default = react_native_1.StyleSheet.create({
    textInputStyle: {
        width: 40,
        minHeight: 40,
        fontSize: 24,
        marginTop: 12,
        marginBottom: 8,
        alignSelf: "center",
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonImageStyle: {
        width: 15,
        height: 15,
    },
});
//# sourceMappingURL=CounterInput.style.js.map