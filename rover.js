const Message = require("./message");
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode = "NORMAL", generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message){
      let commands = message.commands;
      let obj = {
         message : message.name,
         results : []
      };
      
      for(let i = 0; i < commands.length; i++) {
         if(commands[i].commandType === "STATUS_CHECK"){
            let commandObj = {completed : true};
           commandObj.roverStatus = {
            mode : this.mode,
            generatorWatts : this.generatorWatts,
            position : this.position
           }
           obj.results.push(commandObj);
         }else if(commands[i].commandType === "MODE_CHANGE"){
            if(this.mode === "LOW_POWER"){
               let lowObj = {completed : false};
               obj.results.push(lowObj);
            }else {
               this.mode = "LOW_POWER";
               let modeObj = {completed : true};
               obj.results.push(modeObj);
            }
         }else if(commands[i].commandType === "MOVE"){
            if(this.mode !== "LOW_POWER"){
               this.position = commands[i].value;
               let moveObj = {completed : true}
               obj.results.push(moveObj);
            }
            else{
               let powerObj = {completed : false};
               obj.results.push(powerObj);
            }
         }
      }
      return obj;
   }
}

module.exports = Rover;