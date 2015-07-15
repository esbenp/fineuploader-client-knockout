export class KnockoutEngine {
  constructor(knockout){
    this.knockout = knockout;
  }

  render(node, viewmodel = {}){
    return this.knockout.applyBindings(viewmodel, node);
  }
}
