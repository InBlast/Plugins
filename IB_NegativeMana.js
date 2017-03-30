//=============================================================================
// IB_NegativeMana.js
//=============================================================================
 

/*:
 * @plugindesc v1.00 Allow the mana to take negative values
 * @author InBlast  
 *       
 *
 *
 *
 * @help 
 * --------------------------------------------------------------------------------
 * Free for non commercial and commercial use, but credits are required.
 * 
 * This plugin allow a spell to be used when you don't have enouth mana, and this will make
 * your mp takes negatives values.
 *
 * --------------------------------------------------------------------------------
 *
 * --------------------------------------------------------------------------------
 * Version History
 * --------------------------------------------------------------------------------
 * 1.00 - Release

 */
 
  (function() {
  var parameters = PluginManager.parameters('IB_NegativeMana');

Game_BattlerBase.prototype.refresh = function() {
    this.stateResistSet().forEach(function(stateId) {
        this.eraseState(stateId);
    }, this);
    this._hp = this._hp.clamp(0, this.mhp);
    if(this._mp > this.mmp) {
      this._mp = this.mmp;
    }
    this._tp = this._tp.clamp(0, this.maxTp());
};


Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return this._tp >= this.skillTpCost(skill) && this._mp > 0;
};


Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
  if(rate<0) {
    rate = 0;
  }
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

  })(); 