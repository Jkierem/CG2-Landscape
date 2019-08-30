import { JString } from "@juan-utils/structures";
import { Colors } from "./data";

const baseConfig = {
    chooseAngle: (p,level) => {
        return p.HALF_PI/5
    },
    chooseLength: (p,level) => {
        return level == 1 ? 100: 50/level
    },    
    chooseWeight: (p,level) => {
        return 10/level
    },    
    chooseColor: (p,level) => {
        return level < 4 ? Colors.brown : Colors.green;
    }
}

export const createPlotter = (p) => {
    return {
        drawTree: (statement,config=baseConfig) => {
            const step = (
                char,
                angle=HALF_PI,
                length=30,
                weight=10,
                color=Colors.brown
            ) => {
                const actions = {
                    "F": () => {
                        p.stroke(color);
                        p.strokeWeight(weight);
                        p.line(0,0,0,-length);
                        p.translate(0,-length);
                    },
                    "[": () => {
                        p.push();
                    },
                    "]": () => {
                        p.pop();
                    },
                    "+": () => {
                        p.rotate(angle)
                    },
                    "-": () => {
                        p.rotate(-angle)
                    },
                }
                actions[char]();
            }
        
            let level = 1;
            JString(statement).forEach(
                (c) => {
                    c === "[" ? level++: level;
                    c === "]" ? level--: level;
                    const angle = config.chooseAngle(p,level);
                    const length = config.chooseLength(p,level);
                    const weight = config.chooseWeight(p,level);
                    const color = config.chooseColor(p,level);
                    step(c,angle,length,weight,color);
                }
            )
        }
    }
}