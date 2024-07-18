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

  })
  test("response returned by receiveMessage includes two results if two commands are sent in the message",function(){

  })
  test("responds correctly to the status check command",function(){

  })
  test("responds correctly to the mode change command",function(){

  })
  test("responds with a false completed value when attempting to move in LOW_POWER mode",function(){

  })
  test("responds with the position for the move command",function(){
    
  })
});
