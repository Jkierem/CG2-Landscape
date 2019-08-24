const getData = () => ({
    axiom: "F",
    rules: [
        { input: "F" , output: "F-[F-F-[+F-F]]+[+F+F-[F+F-]]" }
    ],
    constants: [
        "[","]","+","-"
    ]
})

const Colors = {
    green: "#1c911c",
    brown: "#965b03"
}