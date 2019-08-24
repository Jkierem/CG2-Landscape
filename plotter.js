const drawTree = (statement,length=10,angle=HALF_PI) => {
    const actions = {
        "F": (width) => {
            line(0,0,0,-length);
            translate(0,-length);
        },
        "[": () => {
            push();
        },
        "]": () => {
            pop();
        },
        "+": () => {
            rotate(angle)
        },
        "-": () => {
            rotate(-angle)
        },
    }
    statement.forEach(order => {
        actions[order]();
    });
}

const drawRealTree = (statement) => {
    const step = (char,angle=HALF_PI,length=30,weight=10,color=Colors.brown) => {
        const actions = {
            "F": () => {
                stroke(color);
                strokeWeight(weight);
                line(0,0,0,-length);
                translate(0,-length);
            },
            "[": () => {
                push();
            },
            "]": () => {
                pop();
            },
            "+": () => {
                rotate(angle)
            },
            "-": () => {
                rotate(-angle)
            },
        }
        actions[char]();
    }

    const chooseAngle = (level) => {
        return HALF_PI/5
    }
    const chooseLength = (level) => {
        return level == 1 ? 100: 50/level
    }    
    const chooseWeight = (level) => {
        return 10/level
    }    
    const chooseColor = (level) => {
        return level < 4 ? Colors.brown : Colors.green;
    } 

    let level = 1;
    statement.forEach(
        (c) => {
            c === "[" ? level++: level;
            c === "]" ? level--: level;
            const angle = chooseAngle(level);
            const length = chooseLength(level);
            const weight = chooseWeight(level);
            const color = chooseColor(level);
            step(c,angle,length,weight,color);
        }
    )
}