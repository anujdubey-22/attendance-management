const people = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function showAttendSummary(array,totalDays){
  const peopleList = document.getElementById('peopleList');
  peopleList.innerHTML ='';

  for(let item of array){
    const div = document.createElement('div');
    const percent = Math.floor((item.total/totalDays)*100);
    div.appendChild(document.createTextNode(`${item.name} - ${item.total}/${totalDays} - ${percent}% `));
    peopleList.appendChild(div)
  }

}

async function getData() {
  console.log("btn clicked");
  const data = await axios.get("http://localhost:3000/distinct-attendance");
  console.log(data.data);
  const TotalAttendance = data.data.length;
  console.log(TotalAttendance);
  let objSummary = [];
  data.data.forEach(async (date) => {
    try {
      console.log(date.date);
      const dateToCheck = date.date;
      const result = await axios.get("http://localhost:3000/get-attendance", {
        params: {
          date: dateToCheck,
        },
      });
      console.log(result, "result in getting date summary in main.js");
      let obj = {};
      for (let item of result.data) {
        if (item.name in obj) {
          if (item.status === "present") {
            obj[item.name].total++;
          }
        } else {
          obj[item.name] = {
            name: item.name,
            total: item.status === "present" ? 1 : 0,
          };
        }
        //console.log(obj);
        const objSummary = Object.values(obj);

        //console.log(objSummary);
        showAttendSummary(objSummary,TotalAttendance);
      }
    } catch (error) {
      console.log(error, "error in gettings date summary in main.js ");
    }
  });
}

function showPeopleAttendence(data) {
  console.log(data);
  const peopleList = document.getElementById("peopleList");
  peopleList.innerHTML = "";
  for (let item of data) {
    var div = document.createElement("div");
    div.appendChild(
      document.createTextNode(`${item.name} - ${item.attendance}`)
    );
    peopleList.appendChild(div);
  }
}

function showPeople(date) {
  const peopleList = document.getElementById("peopleList");
  peopleList.innerHTML = "";
  people.forEach((person) => {
    var div = document.createElement("div");

    // making radio "input" using DOM
    var present = document.createElement("input");
    var absent = document.createElement("input");

    present.type = "radio";
    present.name = `${person}Attendance`;
    present.value = "Present";

    absent.type = "radio";
    absent.name = `${person}Attendance`;
    absent.value = "Absent";

    // giving label to radio input
    var labelPresent = document.createElement("label");
    labelPresent.innerHTML = "Present";

    var labelAbsent = document.createElement("label");
    labelAbsent.innerHTML = "Absent";

    div.appendChild(document.createTextNode(`${person} - `));
    div.appendChild(present);
    div.appendChild(labelPresent);
    div.appendChild(absent);
    div.appendChild(labelAbsent);

    peopleList.appendChild(div);
  });

  const btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Mark Attendance"));

  peopleList.appendChild(btn);

  const objArr = [];
  btn.addEventListener("click", async function () {
    try {
      // Loop through each person to check their attendance status
      people.forEach((person) => {
        const isCheckedPresent = document.querySelector(
          `input[name='${person}Attendance'][value='Present']:checked`
        );
        //  console.log(isCheckedPresent)
        //   if (isCheckedPresent) {
        //     console.log(`${person} is present`);
        //   } else {
        //     console.log(`${person} is absent`);
        //   }
        const obj = {
          name: person,
          attendance: isCheckedPresent ? "Present" : "Absent",
          date: date,
        };
        objArr.push(obj);
        //console.log(person,obj,objArr)
      });
      const data = await axios.post("http://localhost:3000/add-attendance", {
        obj: objArr,
      });
      // once the attendance is marked show the marked attendance with persons name
      showPeopleAttendence(objArr);
    } catch (error) {
      console.log(error, "error in post in main.js");
    }
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  const date = document.getElementById("date").value;
  console.log(date);
  const data = await axios.get("http://localhost:3000/get-attendance", {
    params: {
      date: date,
    },
  });
  console.log(data);
  if (data.data.length === 0) {
    console.log("in if ");
    showPeople(date);
  } else {
    const result = [];
    for (let item of data.data) {
      //console.log(item);
      const obj = {
        name: item.name,
        attendance: item.status,
        date: item.date,
      };
      result.push(obj);
    }
    showPeopleAttendence(result);
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
