String.prototype.toArray = function(){
    return this.split("");
}

String.prototype.innerMap = function(f){
    return this.toArray().map(f).join("")
}

String.prototype.forEach = function(f){
    this.toArray().forEach(f)
}

String.prototype.map = function(f){
    return this.toArray().map(f)
}

String.prototype.reduce = function(f,init=undefined){
    return init ? this.toArray().reduce(f,init) : this.toArray().reduce(f);
}

const createLSystem = () => {
    const createRule = (a,b) => ({
        evaluate: (x) => x === a ? true : false,
        apply: () => b
    })
    const createConstant = (a) => createRule(a,a)
    
    const data = getData();
    const rules = [
        ...data.rules.map( ({ input , output }) => createRule(input,output) ),
        ...data.constants.map(createConstant)
    ];

    return {
        generate(statement){
            return statement.innerMap(char => {
                return rules.find( r => r.evaluate(char) ).apply();
            });
        },
        multi(init,iters){
            let current = init;
            if( iters > 0 ){
                current = this.generate(current);
                return this.multi(current,iters - 1)
            }else{
                return current;
            }
        }
    }
}