console.log('Welcome to my Marks Percentage Calculator');

const StudentName = document.getElementById('StudentName')
const obtainedmarks = document.getElementById('ScoredMarks')
const totalmarks = document.getElementById('TotalMarks')
const calculatebtn = document.getElementById('calc-btn')
const output_txtarea = document.getElementById('output-txt-area')
const submit = document.querySelector('button[type=submit]')
const reset = document.querySelector('button[type=reset]')
const inputs = document.querySelectorAll('input')

// const totalMarks = 200
const students = [];

const submitform = submit.addEventListener('click', (event) => {
    event.preventDefault();

    const std_obj = new Object();
    std_obj.name = StudentName.value;
    std_obj.obtainedMarks = obtainedmarks.value;
    std_obj.totalMarks = totalmarks.value;
    students.push(std_obj);
    console.log(students);

    Array.from(inputs).forEach(element => {
        element.value = '';
    });
    alert(`Student with name "${std_obj.name}", obtained marks "${std_obj.obtainedMarks}" from total marks "${std_obj.totalMarks} has been submitted in the form"`)

})

const resetform = reset.addEventListener('click', (event) => {
    location.reload();
    sessionStorage.clear();
})

const calculateMarks = calculatebtn.addEventListener('click', (event) => {
    sessionStorage.setItem(`students`, JSON.stringify(students));
    const studentsVar = JSON.parse(sessionStorage.getItem('students'))

    function calculatePercentage(student) {
        const total = Number(student.obtainedMarks);
        const Max = Number(student.totalMarks);
        console.log(total, Max);
        const percentage = total / Max * 100;
        return { percentage, total, Max }
    }

    function isPassed(student) {
        const total = Number(student.obtainedMarks);
        const Max = Number(student.totalMarks);
        console.log(total, Max);

        const standard = (Max / 2) - 10;
        return total >= standard ? "PASSED" : "FAILED";
    }

    for (let index = 0; index < studentsVar.length; index++) {
        const result = calculatePercentage(studentsVar[index])
        console.log("-------------------------------------")
        console.log("-------------------------------------")
        console.log("Name: " + studentsVar[index].name);
        console.log("Marks Total: " + studentsVar[index].totalMarks);
        console.log("Marks Obtained: " + studentsVar[index].obtainedMarks);
        console.log("Percentage: " + result.percentage);
        console.log(isPassed(studentsVar[index]));

        if (!
            (
                output_txtarea.value.includes(studentsVar[index].name)
            )
        ) {
            output_txtarea.value += "\n--------------------------------";
            output_txtarea.value += "\n--------------------------------";
            output_txtarea.value += "\nName: " + studentsVar[index].name;
            output_txtarea.value += "\nMarks Total: " + studentsVar[index].totalMarks;
            output_txtarea.value += "\nMarks Obtained: " + studentsVar[index].obtainedMarks;
            output_txtarea.value += "\nPercentage: " + result.percentage + "%";
            output_txtarea.value += `\n${isPassed(studentsVar[index])}`;
        }
    }

})

