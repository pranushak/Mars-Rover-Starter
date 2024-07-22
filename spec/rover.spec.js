const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
   // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts”",function(){
    expect(new Rover("position").position).toBe("position");
    expect(new Rover("mode").mode).toBe("NORMAL");
    expect(new Rover("generatorWatts").generatorWatts).toBe(110);
  })
  test("response returned by receiveMessage contains the name of the message",function(){
    let rover = new Rover();
    let message = new Message('message with command')
    expect(rover.receiveMessage(message).message).toBe('message with command');
  })
  test("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let commands = [new Command("MODE_CHANGE"),new Command("STATUS_CHECK")];
    let rover = new Rover();
    let message = new Message("Testing with two commands",commands);
    let response = rover.receiveMessage(message);
    expect(rover.receiveMessage(message).results.length).toBe(commands.length);
  })
  test("responds correctly to the status check command",function(){
    //let message = new Message(commands);
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Testing with STATUS_CHECK command",commands);
    let rover = new Rover(98382); 
    let expected = {
      mode : "NORMAL",
      generatorWatts : 110,
      position : 98382
    }
    expect(rover.receiveMessage(message).results[0].roverStatus).toEqual(expected);
  })
  test("responds correctly to the mode change command",function(){
    let rover = new Rover(98382); 
    let commands = [new Command("MODE_CHANGE")];
    let message = new Message("Testing with MODE_CHANGE commands",commands);
    expect(rover.receiveMessage(message).results[0].completed).toEqual(true);
    expect(rover.mode).toBe("LOW_POWER");
  })
  test("responds with a false completed value when attempting to move in LOW_POWER mode",function(){
    let rover = new Rover(98382,mode = "LOW_POWER"); 
    let commands = [new Command("MODE_CHANGE")];
    let message = new Message("Test with MODE_CHANGE command",commands);
    expect(rover.receiveMessage(message).results[0].completed).toEqual(false);
  })
  test("responds with the position for the move command",function(){
    let rover = new Rover(98765);
    let commands = new Command("MOVE");
    let message = new Message("Testing with MOVE command",commands);
    expect(rover.receiveMessage(message).position).toEqual(56789);
  })
});
