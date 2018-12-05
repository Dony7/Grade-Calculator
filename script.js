var Grade = function(testAssignment, grade, weight, id){
    this.testAssignment = testAssignment || "Unknown";
    this.grade = grade;
    this.weight = weight;
    this.id = id;
};

var testAssignmentArr = [];
var count = 0;

var assignment = document.querySelector('#assignment').value;
var grade = document.querySelector('#grade').value;
var weight = document.querySelector('#weight').value;

document.querySelector('.add').addEventListener('click', function(){
    var more = moreWeight(testAssignmentArr);
    
    if(more){
        var newPerson = new Grade(document.querySelector('#assignment').value, document.querySelector('#grade').value, document.querySelector('#weight').value, count);
        testAssignmentArr.push(newPerson);
        display(document.querySelector('#assignment').value, document.querySelector('#grade').value, document.querySelector('#weight').value, count);
        console.log(testAssignmentArr);
        var calc = calculate(testAssignmentArr);
        var currentGrade = gradeLetter(calc);
        document.querySelector('.percentage-value').innerHTML = calc.toFixed(1) + '%';
        document.querySelector('.grade-letter').innerHTML = currentGrade;
        count++;
    } else {
        return;
    }
});

var moreWeight = function(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++){
        sum += +arr[i].weight;
    }
    
    if (sum + +document.querySelector('#weight').value > 100){
        return false;
    } else{
        return true;
    }
};

var display = function(t, g, w, i){
    var item = '<div class="item"  data-id="' + i + '"><p class="info"><span>Assignment/Test:</span>' + ' ' + t + '</p><p class="info"><span>Grade:</span>' + ' ' + g + '%</p><p class="info"><span>Weight:</span>' + ' ' + w + '%</p><img src="remove.png" alt="Remove" class="remove"></div>';

    document.querySelector('.items').innerHTML += item;
};

var calculate = function(arr){
    var grade = 0;
    var total = 0;
    weightTotal = 0;

    for (var i = 0; i < arr.length; i++){
        weightTotal += +arr[i].weight;
    }
        
    if(weightTotal === 100){
        for (var i = 0; i < arr.length; i++){
            grade += ((+arr[i].grade * 0.1) * (+arr[i].weight * 0.1));
        }
    }else if (weightTotal !== 100){
        for (var i = 0; i < arr.length; i++){
            grade += ((+arr[i].grade) * (+arr[i].weight));
        }
        grade /=  +weightTotal;
    }

    return grade;
}

var gradeLetter = function(grade){
    if (grade <= 100 && grade >= 90){
        return 'A';
    } else if (grade < 90 && grade >= 80){
        return 'B';
    } else if (grade < 80 && grade >= 70){
        return 'C';
    } else if (grade < 70 && grade >= 60){
        return 'D';
    } else {
        return 'F';
    }
};

$('.items').on('click', '.remove', function(){
    $(this).parent().remove();
    var id = $(this).parent().attr('data-id');
    
    search(id, testAssignmentArr);
    console.log(id);
    console.log(testAssignmentArr);
    var calc = calculate(testAssignmentArr);
    var currentGrade = gradeLetter(calc);
    
    if(testAssignmentArr.length === 0){
        document.querySelector('.percentage-value').innerHTML = '-';
        document.querySelector('.grade-letter').innerHTML = '-';
    } else{
        document.querySelector('.percentage-value').innerHTML = calc.toFixed(1) + '%';
        document.querySelector('.grade-letter').innerHTML = currentGrade;
    }
    
});

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === +nameKey) {
            myArray.splice(i,1);
        }
    }
}
