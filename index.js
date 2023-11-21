const registrationForm=document.getElementById('registration-form');
const userDataTable=document.getElementById('user-data');
const userDataTableBody=userDataTable.querySelector('tbody');
const dobInput=document.getElementById('dob');
const dobError=document.getElementById('doberror');

window.addEventListener('load', () => {
    updateUserDataTable();
});
 registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

const userData= {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    dob: document.getElementById('dob').value,
    terms: document.getElementById('terms').value,
};

if (!validateUserData(userData)){
    const errorMessage=document.createElement('p');
    errorMessage.textContent='Value must be 09/11/1967 or later';
    errorMessage.classList.add('error-message');

    const dataField=document.getElementById('dob');
    dataField.parentNode.appendChild(errorMessage);

}else{
    saveUserData(userData);
    updateUserDataTable();
    clearForm();
}
 });

 function saveUserData(userData)
 {
    const existingUserData=JSON.parse(localStorage.getItem('usetList'));
    existingUserData.push(userData);
    localStorage.setItem('userList',JSON.stringify(existingUserData));

 }
 function updateUserDataTable()
 {
    userDataTableBody.innerHTML = '';
    const userList =JSON.parse(localStorage.getItem('userList')) || [];
    userList.forEach((userData) => {
        const userDataRow = createUserDataTableRow(userData);
        userDataTableBody.appendChild(userDataRow);
    });
    if (userList.length > 0) {
        userDataTable.classList.remove('hidden');
    }else{
        userDataTable.classList.add('hidden');
        }
    }
function createUserDataTableRow(userData) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${userData.name}</td>
    <td>${userData.email}</td>
    <td>${userData.password}</td>
    <td>${userData.dob}</td>
    <td>${userData.terms ? 'true' : 'false'}</td>
    `;
    return row;
}
function clearForm() {
    registrationForm.reset();
        
 }
