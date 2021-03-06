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
 * To activate this feature on an enemy or an actor, simply put :
 * <NegState>
 * In the character's notetag.
 * --------------------------------------------------------------------------------
 *
 * --------------------------------------------------------------------------------
 * Version History
 * --------------------------------------------------------------------------------
 * 1.00 - Release
 * 1.01 - Makes the actor unable to use a skill if it costs mana and his mana is negative.
 * 1.02 - Adding some parameters.
 * 1.03 - Adding the tag "NegState" for enemies & actors

 */
 
  (function() {
  var parameters = PluginManager.parameters('IB_NegativeMana');
  var mpColor = String(parameters['MpColor'] || '#0000CD');
  var negMpState = parameters['Negative state ID'] || 3;


//----------------------------------------------------------------------
//                          Game_BattlerBase
//----------------------------------------------------------------------


// Changes to allow the MP to go negative & applying the NegState.
Game_BattlerBase.prototype.refresh = function() {
    this.stateResistSet().forEach(function(stateId) {
        this.eraseState(stateId);
    }, this);
    this._hp = this._hp.clamp(0, this.mhp);
    if(this._mp > this.mmp) {
      this._mp = this.mmp;
    };
    this._tp = this._tp.clamp(0, this.maxTp());
    this.shouldNegativeMpState();

};

//Is the user a Negative MP State user ?
Game_BattlerBase.prototype.isNegMpUser = function() {

  return (this.isEnemy() && this.enemy().meta.NegState) || (this.isActor() && this.actor().meta.NegState);

};

// Apply or remove the NegMpState if necessary
Game_BattlerBase.prototype.shouldNegativeMpState = function() {
  if(this.isNegMpUser()) {
    if(this._mp <=0 ) {
      this.addState(negMpState);
    } else {
      this.removeState(negMpState);
    };
  };

};

Game_BattlerBase.prototype.canPaySkillCost = function(skill) {

  if(this.isNegMpUser()) {
    return this._tp >= this.skillTpCost(skill) && this._mp > 0;
  } else {
    return this._tp >= this.skillTpCost(skill) && this._mp >= this.skillMpCost(skill);
  };
};

//----------------------------------------------------------------------
//                          Window_Base
//----------------------------------------------------------------------

Window_Base.prototype.mpColor = function(actor) {
  if(actor._mp <= 0){
    return mpColor;
  } else {
    return this.normalColor();
  };
};

Window_Base.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    if(actor._mp<=0 && !actor.isDeathStateAffected()){
      this.changeTextColor(mpColor);
    } else {
      this.changeTextColor(this.hpColor(actor));
    };
    this.drawText(actor.name(), x, y, width);
};


Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
  if(rate<0) {
    rate = 0;
  };
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

})(); 
