import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        opacity: 0.5,
    },
    root: {
        position: "fixed",
        top: "50vh",
        left: "50%",
        width: "400px",
        zIndex: 100,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        padding: "20px 0",
    },
    option: {
        borderTop: "1px solid #d9d9d9",
        width: "100%",
        textAlign: "center",
        padding: "15px 0",
        fontSize: 14,
        cursor: "pointer",
        fontWeight: "bold",
    },
}));
