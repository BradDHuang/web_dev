
function avg(scores) {
    var res = scores[0];
    for (var i = 1; i < scores.length; i++) {
        res += scores[i];
    }    
    res = Math.round(res/scores.length);
    console.log(res);
    return res;
}

var scores = [90, 98, 94, 91];
avg(scores);