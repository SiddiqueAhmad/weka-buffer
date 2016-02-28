// file reader util
var fs = require('fs');
var results = [];
var csv = [];
function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    } else {
    	// console.log(results2);
    	results.forEach(function (data, i) {
  csv.push(data.join('\t'));
});
    	console.log(csv.join('\n'))
    }

  });
}

function func(data) {
	var re = /weka\.filters\.unsupervised\.attribute\.Remove/;
    var match;
    var weightedLine = [];
    var relationLine = [];
    if ((match = re.exec(data)) !== null) {
    	relationLine = (match['input'].replace("Relation: ",'').split('-weka.filters.unsupervised.attribute.Remove-'));
     // console.log(relationLine);
     
     // results['relation'].push(relationLine);
     results.push(relationLine)

    }

    var re = /Weighted Avg\.    /;
    var match;
    if ((match = re.exec(data)) !== null) {
    	weightedLine = match['input'].replace("Weighted Avg.    ",'').replace(/ +/g,' ').split(' ').slice(0,-1);

     // console.log( weightedLine );
    // results.push(relationLine.concat(weightedLine))
    
     // results['weightedLine'].push(weightedLine);

     var lastArray = results.pop();
     results.push(lastArray.concat(weightedLine))

    } 

}



var input = fs.createReadStream('ARIR/NaiveBayes.txt');
readLines(input, func);
// var input = fs.createReadStream('AR/J48.txt');
// readLines(input, func);


