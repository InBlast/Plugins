//=============================================================================
// IB_Berserker.js
//=============================================================================
 

/*:
 * @plugindesc v1.01 Boost the damages of an actor/enemy based on a formula.
 * @author InBlast  
 *       
 *
 *
 *
 * @help 
 * --------------------------------------------------------------------------------
 * Free for non commercial and commercial use, but credits are required.
 * 
 * This plugin allow you to design an character as a berserker, and boost his 
 * damages in function of a formula.
 * The formula 
 *
 * --------------------------------------------------------------------------------
 * Actor/enemy Notetag
 * --------------------------------------------------------------------------------
 * <Berserker: formula>
 * Make the actor a "Berserker", and apply the formula as a multiplicative value
 * to the damages. 
 * --------------------------------------------------------------------------------
 * Version History
 * --------------------------------------------------------------------------------
 * 1.00 - Release
 * 1.01 - Allowing enemy to be a berserker


 */
 
  (function() {
  var parameters = PluginManager.parameters('IB_Berserker');


  var _Game_Action_Damage = Game_Action.prototype.makeDamageValue;                   // alias

  Game_Action.prototype.makeDamageValue = function(target, critical) {

    var value = _Game_Action_Damage.call(this, target, critical);    // Normal damage calculation
  	   if (this.subject().isActor() && this.subject().actor().meta.Berserker) { // Is the user a berserker ?
          var formula = String(this.subject().actor().meta.Berserker || "2 - this.subject().hpRate()");  
          console.log(eval(formula)) ;
          if(eval(formula) === 0)  {
            return value;
          } else {
            return Math.round(value *= eval(formula));  // Up the damages with the remaining HP
          }        
                                          
       } else if (this.subject().isEnemy() && this.subject().enemy().meta.Berserker) {   // Is the enemy a berserker ?
          var formula = String(this.subject().enemy().meta.Berserker || "2 - this.subject().hpRate()"); 
          console.log(eval(formula));
          if(eval(formula) === 0) {
           return value;
          } else {
           return Math.round(value *= eval(formula));     // Up the damages 
          }
                                                                                   
       } else {
          return value;                                                   // Return the normal damages
       };

  };

  })(); 
