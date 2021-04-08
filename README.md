# slippi-replay-differ

Compares two .slp replay files and checks for differences.

## Usage:

Run npm install to grab slippi-js if you don't have it.
Copy two replays into the same folder as the script.js.

In the command line, run:
"Node script.js 'fileName1.slp' 'fileName2.slp'"

A 3rd optional field for amount of desyncs to show can be added on the CLI, but the default amount of desyncs shown is the first 15 frames of mismatch.

An example of no desync:  
![No Desync Example](https://i.imgur.com/n9iHIbM.png)

An example of a desync and the logs for it:  
(The "3" is to indicate logging the first 3 frames of desync rather than default first 15)  
![With Desync Example](https://i.imgur.com/yUWvDYO.png)

