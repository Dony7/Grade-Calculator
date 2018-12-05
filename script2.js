var Gpa = function(className, grade, credits, id){
    this.className = className;
    this.grade = grade;
    this.credits = credits;
    this.id = id;
}

classGradeArr = [];
var count = 0;

document.querySelector('.add').addEventListener('click', function(){

        var start = ready();
        var inputs = allInputs();

        if(start && inputs){
            var newGpa = new Gpa(document.querySelector('#class').value, document.querySelector('#grade').value, document.querySelector('#credits').value, count);
            classGradeArr.push(newGpa);
            display(document.querySelector('#class').value, document.querySelector('#grade').value, document.querySelector('#credits').value, count);
            console.log(classGradeArr);
            var calc = calculate(classGradeArr);
            document.querySelector('.gpa').innerHTML = calc.toFixed(1);
            count++;
        } else{
            return;
        }
});

var display = function(t, g, w, i){
    var item = '<div class="item"  data-id="' + i + '"><p class="info"><span>Class:</span>' + ' ' + t + '</p><p class="info"><span>Grade:</span>' + ' ' + g + '</p><p class="info"><span>Credits:</span>' + ' ' + w + '</p><img src="remove.png" alt="Remove" class="remove"></div>';

    document.querySelector('.items').innerHTML += item;
};

var calculate = function(arr){
    var gpa;
    var credits = 0
    var grades = 0
    for (var i = 0; i < arr.length; i++){
        if(arr[i].grade === 'A'){
            grades += (4 * +arr[i].credits);
        } else if(arr[i].grade === 'B'){
            grades += (3 * +arr[i].credits);
        } else if(arr[i].grade === 'C'){
            grades += (2 * +arr[i].credits);
        } else if(arr[i].grade === 'D'){
            grades += (1 * +arr[i].credits);
        } else {
            grades += 0;
        }

        credits += +arr[i].credits;
    }

    gpa = grades / credits;
    return gpa;
}

var ready = function(){

    var complete = true

    if(document.querySelector('#grade').value === 'A' || document.querySelector('#grade').value === 'B' || document.querySelector('#grade').value === 'C' || document.querySelector('#grade').value === 'D' || document.querySelector('#grade').value === 'F'){
        complete = true;
    }else{
        complete = false;
    }
    return complete;
}

var allInputs = function(){
    var complete = true

    if(document.querySelector('#class').value && document.querySelector('#grade').value && document.querySelector('#credits').value){
        complete = true;
    } else{
        complete = false;
    }

    return complete;
}

$('.items').on('click', '.remove', function(){
    $(this).parent().remove();
    var id = $(this).parent().attr('data-id');
    
    search(id, classGradeArr);
    console.log(id);
    console.log(classGradeArr);
    var calc = calculate(classGradeArr);
    

    if(classGradeArr.length === 0){
        document.querySelector('.gpa').innerHTML = '-';
    } else{
        document.querySelector('.gpa').innerHTML = calc.toFixed(1);
    }
    
});

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === +nameKey) {
            myArray.splice(i,1);
        }
    }
}