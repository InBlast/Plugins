//=============================================================================
// IB_NegativeMana.js
//=============================================================================
 

/*:
 * @plugindesc v1.02 Allow the mana to take negative values
 * @author InBlast  
 *       
 * @param MpColor     
 * @desc The color of the Mp bar when mana is negative (Hexa):    
 * Default: #0000CD 
 * @default #0000CD
 *
 * @param Negative state ID     
 * @desc The ID of the negative Mana State:    
 * Default: 3
 * @default 3
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
 * 1.01 - Makes the actor unable to use a skill if it costs mana and his mana is negative.
 * 1.02 - Adding some parameters.

 */
 
  (function() {
  var parameters = PluginManager.parameters('IB_NegativeMana');
  var mpColor = String(parameters['MpColor'] || '#0000CD');
  var negMpState = parameters['Negative state ID'] || 3;


Game_BattlerBase.prototype.refresh = function() {
    this.stateResistSet().forEach(function(stateId) {
        this.eraseState(stateId);
    }, this);
    this._hp = this._hp.clamp(0, this.mhp);
    if(this._mp > this.mmp) {
      this._mp = this.mmp;
    }
    this._tp = this._tp.clamp(0, this.maxTp());
    if(this._mp <0 ) {
      this.addState(negMpState);
    }else {
      this.removeState(negMpState);
    };

};


Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    return this._tp >= this.skillTpCost(skill) && this._mp > 0;
};

Window_Base.prototype.mpColor = function(actor) {
  if(actor._mp < 0){
    return mpColor;
  } else {
    return this.normalColor();
  }
};

Window_Base.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    if(actor._mp<0 && !actor.isDeathStateAffected()){
      this.changeTextColor(mpColor);
    } else {
      this.changeTextColor(this.hpColor(actor));
    }
    this.drawText(actor.name(), x, y, width);
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