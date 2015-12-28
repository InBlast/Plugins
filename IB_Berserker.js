//=============================================================================
// IB_Berserker.js
//=============================================================================
 

/*:
 * @plugindesc v1.00 Boost the physical damage of an actor based on a formula.
 * @author InBlast  
 *       
 *
 * @param PhysicalFormula
 * @desc Change the physical damages by this formula :    
 * Default: 2 - this.subject().hpRate()
 * @default 2 - this.subject().hpRate()
 *
 *
 * @help 
 * --------------------------------------------------------------------------------
 * Free for non commercial and commercial use, but credits are required.
 * 
 * This plugin allow you to design an actor as a berserker, and boost his damages
 * in function of the remaining HP.
 * 
 *
 * Use "this.subject()" instead of "a" to use parameters in the formulas.
 * example : this.subject().hp is the same as a.hp
 * --------------------------------------------------------------------------------
 * Version History
 * --------------------------------------------------------------------------------
 * 1.0 - Release



 */
 
  (function() {
  var parameters = PluginManager.parameters('IB_Berserker');
  
  var formula = String(parameters['PhysicalFormula'] || "2 - this.subject().hpRate()");  


  var _Game_Action_Damage = Game_Action.prototype.makeDamageValue;                   // alias

  Game_Action.prototype.makeDamageValue = function(target, critical) {

    var value = _Game_Action_Damage.call(this, target, critical);    // Normal damage calculation
  	 if (this.subject().isActor() && this.subject().actor().meta.Berserker) {            // Is the user a berserker ?
      return Math.round(value *= eval(formula));                                    // Up the damages with the remaining HP
     } else {
      return value;                                                      // Return the normal damages
     };

  };

  })(); 
