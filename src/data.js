export const getData = () => ({
    axiom: "F",
    rules: [
        { input: "F" , output: "F-[F-F-[+F-F]]+[+F+F-[F+F-]]" }
    ],
    constants: [
        "[","]","+","-"
    ]
})

export const Colors = {
    green: "#1c911c",
    darkgreen: "#236e0c",
    brown: "#965b03",
    yellow: "#ffe51f",
    blue: "#8dd7fc",
    red: "#6e110c",
    roof: "#6e4c0c",
    black: "#000000"
}