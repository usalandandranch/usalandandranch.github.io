
function displayForm(form_ID, thankyou_ID) {
  // display form and hide thankyou message
  document.getElementById(thankyou_ID).style.display="none";
  document.getElementById(form_ID).style.display = "block";
  document.getElementById("message").value="";
}

function fillForm(message)  {
  // fill form with message
  document.getElementById("message").value="I am interested in "+message+".";
  // $('.modal').modal('hide');
  document.getElementById("contact-in-menu").click();
}

