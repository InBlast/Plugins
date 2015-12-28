//=============================================================================
// IB_XParameterFormula.js
//=============================================================================
 

/*:
 * @plugindesc v1.00 Write a formula to modify the xParam chances.
 * @author InBlast  
 *       
 * @param HitFormula      
 * @desc Change hit rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param EvasionFormula      
 * @desc Change evasion rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param CriticalFormula      
 * @desc Change critical rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param CriticalEvasionFormula      
 * @desc Change critical evasion rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param MagicEvasionFormula      
 * @desc Change magic evasion rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param MagicReflexionFormula      
 * @desc Change magic reflexion rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param CounterAttackFormula      
 * @desc Change counter attack rate by this formula (0.01 = 1%):    
 * Default: 0 
 * @default 0
 *
 * @param HpRegenerationFormula      
 * @desc Change HP regeneration rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param MpRegenerationFormula      
 * @desc Change MP regeneration rate by this formula (0.01 = 1%):    
 * Default: 0  
 * @default 0
 *
 * @param TpRegenerationFormula      
 * @desc Change TP regeneration rate by this formula (0.01 = 1%):    
 * Default: 0
 * @default 0
 *
 *
 * @help 
 * --------------------------------------------------------------------------------
 * Free for non commercial and commercial use, but credits are required.
 * 
 * This plugin allow you to modify the way xparam chances are calculated. The 
 * formulas in the parameters will be added to the xparam chances set with RPG 
 * Maker or another plugin. 
 *
 * Use "this" instead of "a" to use the parameters in the formulas.
 * example : this.luk is the same as a.luk 
 * --------------------------------------------------------------------------------
 * Version History
 * --------------------------------------------------------------------------------
 * 1.0 - Release



 */
 
  (function() {
  var parameters = PluginManager.parameters('IB_XParameterFormula');
  
  var formula = [String(parameters['HitFormula'] || "0"), String(parameters['EvasionFormula'] || "0"), 
  String(parameters['CriticalFormula'] || "0"), String(parameters['CriticalEvasionFormula '] || "0"), 
  String(parameters['MagicEvasionFormula'] || "0"), String(parameters['MagicReflexionFormula'] || "0"), 
  String(parameters['CounterAttackFormula'] || "0"), String(parameters['HpRegenerationFormula'] || "0"), 
  String(parameters['MpRegenerationFormula'] || "0"), String(parameters['TpRegenerationFormula'] || "0")];    // array which contains the formulas


  var _Game_BattlerBase_xparam = Game_BattlerBase.prototype.xparam;                   // alias

  Game_BattlerBase.prototype.xparam = function(xparamId) {

  		return _Game_BattlerBase_xparam.call(this, xparamId) + eval(formula[xparamId]);
  	
};
  
  
  
  
  
  })(); 
