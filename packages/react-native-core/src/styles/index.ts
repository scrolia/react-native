import { StyleSheet } from "react-native";

import { MARGIN_START } from "#/configs";

/** Default styles for the components. */
const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        width: "100%",
    },
    trackX: {
        zIndex: 1,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 16,
    },
    trackY: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        width: 16,
        height: "100%",
    },
    thumbX: {
        position: "absolute",
        borderRadius: 20,
        height: 10,
        marginTop: 2.5,
        marginLeft: MARGIN_START,
        marginBottom: 2.5,
    },
    thumbY: {
        position: "absolute",
        borderRadius: 20,
        width: 10,
        marginTop: MARGIN_START,
        marginLeft: 2.5,
        marginRight: 2.5,
    },
});

export { styles };
