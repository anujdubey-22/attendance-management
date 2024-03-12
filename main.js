const people =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function showPeople(){
    const peopleList = document.getElementById('peopleList');
    for(let item of people){
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(`${item} - `));

        peopleList.appendChild.div

    }
};


async function handleSubmit(event){
    event.preventDefault();

    const date = document.getElementById('date').value;
    console.log(date);
    const check = await axios.get('http://localhost:3000/get-attendence',{
        params: {
            date: date
        }
    });
    console.log(check.data);
    if(check.data==='no'){
        console.log('in if ')
        showPeople();
    }
    else{
        showPeopleAttendence(check.data);
    }

    

    // const attendence = await axios.post('http://localhost:3000/mark-attendence',
    // {
    //  date:date   
    // });

}





// const people = [
//     { name: 'Alice', choice: '' },
//     { name: 'Bob', choice: '' },
//     { name: 'Charlie', choice: '' }
// ];

// function handleSubmit(event) {
//     event.preventDefault() ;
//     const date = document.getElementById('date').value;
    
//     const attendanceChoicesDiv = document.getElementById('attendanceChoices');
//     attendanceChoicesDiv.innerHTML = '';
    
//     people.forEach(person => {
//         const p = document.createElement('p');
//         p.textContent = `${person.name}: `;
        
//         const select = document.createElement('select');
//         const presentOption = document.createElement('option');
//         presentOption.text = 'Present';
//         const absentOption = document.createElement('option');
//         absentOption.text = 'Absent';
        
//         select.add(presentOption);
//         select.add(absentOption);
        
//         select.addEventListener('change', function() {
//             person.choice = select.value;
//         });
        
//         p.appendChild(select);
//         attendanceChoicesDiv.appendChild(p);
//     });
// }



// function showAttendance() {
//     const selectedDate = document.getElementById('datePicker').value;
//     // Assume you have a list of people and their attendance based on the selected date
//     const peopleAttendance = getPeopleAttendance(selectedDate);
    
//     const attendanceList = document.getElementById('attendanceList');
//     attendanceList.innerHTML = ''; // Clear previous content
    
//     // Loop through the list of people and display their names and attendance choices
//     peopleAttendance.forEach(person => {
//       const personDiv = document.createElement('div');
//       personDiv.innerHTML = `${person.name} - <input type="checkbox" id="${person.id}" ${person.attendance ? 'checked' : ''}>`;
//       attendanceList.appendChild(personDiv);
//     });
//   }
  
//   function markAttendance() {
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     let totalData = [];
//     console.log(checkboxes);
//     checkboxes.forEach(checkbox => {
//       totalData.push({ id: checkbox.id, checked: checkbox.checked });
//     });
//     console.log(totalData)
//     const totalDataDiv = document.getElementById('totalData');
//     totalDataDiv.innerHTML = JSON.stringify(totalData);
//   }
  
//   // Dummy data function to simulate people attendance based on selected date
//   function getPeopleAttendance(selectedDate) {
//     // You can fetch real data from an API or database here
//     return [
//       { id: 1, name: 'John Doe', attendance: true },
//       { id: 2, name: 'Jane Smith', attendance: false },
//       { id: 3, name: 'Alice Johnson', attendance: true }
//     ];
//   }
  