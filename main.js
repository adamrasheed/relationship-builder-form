const CONSTANTS = {
  AGE: "#age",
  RELATIONSHIP: "#rel",
  SMOKER: "#smoker",
  HOUSEHOLD: ".household",
  REMOVE_BUTTON: "[data-remove]",
  ADD_BUTTON: ".add",
  DEBUG: ".debug",

  ERROR: "error",
};

// Selectors
const $age = document.querySelector(CONSTANTS.AGE);
const $rel = document.querySelector(CONSTANTS.RELATIONSHIP);
const $smoker = document.querySelector(CONSTANTS.SMOKER);
const $household = document.querySelector(CONSTANTS.HOUSEHOLD);
const $add_btn = document.querySelector(CONSTANTS.ADD_BUTTON);
const $form = document.querySelector("form");
const $debug = document.querySelector(CONSTANTS.DEBUG);

const householdMembers = [];

// Functions
function enableRequired() {
  $age.setAttribute("required", "");
  $rel.setAttribute("required", "");
}

function disableRequired() {
  $age.removeAttribute("required");
  $rel.removeAttribute("required");
}

function renderMembers(members) {
  let membersHTML = "";

  if (members.length) {
    disableRequired();
  } else {
    enableRequired();
  }

  members.forEach(({ id, age, relationship, smoker }) => {
    const memberHTML = `<li id="${id}" class="household-member">
      <p>
        <span class="household-member__label">Relationship</span>
        <span>${relationship}</span>
      </p>
      <p>
        <span class="household-member__label">Age</span>
        <span>${age}</span>
      </p>
      <p>
        <span class="household-member__label">Smoker</span>
        <span>${smoker ? "Yes" : "No"}</span>
      </p>
      <button class="remove-button" data-remove="${id}">Remove</button
    </li>`;

    membersHTML += memberHTML;
  });

  console.log(membersHTML);

  document.querySelector(CONSTANTS.HOUSEHOLD).innerHTML = membersHTML;
}

function addMember({ age, relationship, smoker }) {
  const id = Date.now().toString();
  householdMembers.push({ id, age, relationship, smoker });

  renderMembers(householdMembers);
}

function removeMember(id) {
  const filteredArray = householdMembers.filter((member) => member.id !== id);
  householdMembers.splice(0, householdMembers.length, ...filteredArray);

  renderMembers(householdMembers);
}

function handleInputChange(e) {
  e.srcElement.classList.remove(CONSTANTS.ERROR);
}

function handleAddMember(e) {
  e.preventDefault();

  const age = Number($age.value);
  const relationship = $rel.value;
  const smoker = $smoker.checked;

  if (!$age.value || age < 1) {
    console.log("0 alert");
    $age.classList.add(CONSTANTS.ERROR);
    return;
  }
  if (!$rel.value) {
    $rel.classList.add(CONSTANTS.ERROR);
    return;
  }

  addMember({ age, relationship, smoker });
  $form.reset();
}

function handleRemoveMember(e) {
  if (e.target?.dataset?.remove) {
    const id = e.target.dataset.remove;
    removeMember(id);
  }
}

function handleSubmitForm(e) {
  e.preventDefault();

  const serializedData = JSON.stringify(householdMembers);
  $debug.innerHTML = serializedData;
}

document.addEventListener("click", handleRemoveMember);
document.querySelector(CONSTANTS.REMOVE_BUTTON)?.addEventListener("click");

// Init
document.addEventListener("DOMContentLoaded", function () {
  enableRequired();
  $add_btn.setAttribute("type", "button");

  $age.addEventListener("change", handleInputChange);
  $rel.addEventListener("change", handleInputChange);

  $add_btn.addEventListener("click", handleAddMember);
  $form.addEventListener("submit", handleSubmitForm);
});
