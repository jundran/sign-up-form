const form = document.forms.form
// Input event is modifying the input field by typing or deleting
// Change event triggers after input then focus loss
form.addEventListener("input", e => handleInputOrChange(e.target.name))
form.addEventListener("change", e => handleInputOrChange(e.target.name, true))

function handleInputOrChange(name, forceUserInterfaceUpdate) {
  // Passed in event target name attribute is the same as its parent's id in the HTML
  const input = document.querySelector(`#${name} input`)
  const icon = document.querySelector(`#${name} .is-valid`)
  const error = document.querySelector(`#${name} p`)

  // Calls the validation function matching the event target
  if (window[name + "IsValid"](input)) {
    icon.textContent = "✓"
    icon.style.color="green"
    error.textContent = ""
  }
  else {
    // Only update UI to show errors if focus is lost on a non-empty input or if an input has previously been validated
    // The conditional below prevents errors being reported while the user is filling out a field for the first time
    if (icon.textContent || forceUserInterfaceUpdate) {
      icon.textContent = "×"
      icon.style.color="red"
      error.textContent = input.validationMessage
    }
  }
}

// This function only checks validation rules declared in the HTML such as minLength
function checkHTMLValidation(input) {
  // Uncleared custom validity messages will make checkValidity always return false
  input.setCustomValidity("")
  return input.checkValidity()
}

function firstnameIsValid(input) {
  return checkHTMLValidation(input)
}

function surnameIsValid(input) {
  return checkHTMLValidation(input)
}

function emailIsValid(input) {
  return checkHTMLValidation(input)
}

function phoneIsValid(input) {
  if(!checkHTMLValidation(input)) return false

  const regex = /^\(?(\d{3})\)?[-\s]?(\d{3})[-\s]?(\d{4})$/
  if(regex.test(input.value)) return true

  input.setCustomValidity("Enter a valid ten digit phone number: (999)-555-1234, 999-555-1234")
  return false
}

function passwordIsValid(input) {
  // Need to also check passwordConfirm if it has already been set
  const passwordConfirm = document.querySelector("#passwordConfirm input")
  if(passwordConfirm.value.length) {
    handleInputOrChange(passwordConfirm.name)
  }

  return checkHTMLValidation(input)
}

function passwordConfirmIsValid(input) {
  if(!checkHTMLValidation(input)) return false

  // If HTML validation passes then check passwords match
  if (input.value === document.querySelector("#password input").value) {
    return true
  }
  else {
    input.setCustomValidity("Passwords don't match")
    return false
  }
}
