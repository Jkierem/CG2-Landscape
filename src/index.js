import * as p5 from 'p5';
import { createLSystem } from './lsystem'
import { createPlotter } from './plotter';
import { createCore, createLagrangeInterpolator } from './utils';
import { Colors } from './data';

let main = (p) => {
    const sys = createLSystem();
    const plotter = createPlotter(p);
    const core  = createCore(p);
    const initial = "F"
    let skinny = sys.multi(initial,4);
    let bushy = sys.generate(skinny);

    const interpol = createLagrangeInterpolator([
        { x:700 , y:0 },
        { x:600 , y:200 },
        { x:500 , y:400 },
        { x:300 , y:300 },
        { x:100 , y:200 },
        { x:0 , y:400 },
        { x:900 , y:400 },
    ])

    p.setup = () => {
        p.createCanvas(900,700)
    };

    p.draw = () => {
        p.background(Colors.blue);
        p.resetMatrix();
        p.stroke(250,100)
        core
        .safe((p) => {
            for( let x = 0 ; x < 900 ; x++ ){
                for( let y = 0 ; y < 700 ; y++ ){
                    if( interpol(x) < y ){
                        const bl = y * (255/700)
                        const c = p.color( 50, 50 , bl )
                        p.set( x , y , c);
                    }
                }
            }
            p.updatePixels();
        }).safe((p) => {
            p.fill(Colors.darkgreen);
            p.stroke(Colors.darkgreen);
            p.ellipse( p.width/2 , p.height , 4 * p.width , 350)
        }).safe((p) => {
            p.translate(p.width/2-300,p.height-150);
            p.scale(0.5)
            plotter.drawTree(skinny)
        }).safe((p) => {
            p.translate(p.width/2+100,p.height-50);
            plotter.drawTree(bushy);
        }).safe((p) => {
            p.translate(100,100);
            p.fill(Colors.yellow);
            p.circle(0,0,90)
        })
    };
}

const P5 = new p5(main);