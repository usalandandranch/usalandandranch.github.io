
// function validEmail(email) { // see:
//   var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//   return re.test(email);
// }

function validateHuman(honeypot) {
  if (honeypot) {  //if hidden form filled up
    console.log("Robot Detected!");
    return true;
  } else {
    console.log("Welcome Human!");
  }
}

// get all data in form and return object
function getFormData(form_ID) {
  var form = document.getElementById(form_ID);
  var elements = form.elements; // all form elements
  // var fields = Object.keys(elements).filter(function(k) {
  //       // the filtering logic is simple, only keep fields that are not the honeypot
  //       return (elements[k].name !== "honeypot");
  // }).map(function(k) {
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
                  // it to be appended to for each item in the loop
    if(elements[k].type === "checkbox"){ // special case for Edge's html collection
      str = str + elements[k].checked + ", "; // take the string and append 
                                              // the current checked value to 
                                              // the end of it, along with 
                                              // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space 
                                  // from the  string to make the output 
                                  // prettier in the spreadsheet
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });

  // add form-specific values into the data
  data.formDataNameOrder = JSON.stringify(fields);
  data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
  data.formGoogleSendEmail = form.dataset.email || ""; // no email by default

  // console.log(data);
  return data;
}

function handleFormSubmit(event, form_ID, thankyou_ID) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData(form_ID);         // get the values submitted in the form
  // console.log("handleFormSubmit run successfully.");

  if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
    return false;
  }
  delete data.honeypot;
  data.formDataNameOrder=data.formDataNameOrder.split('"honeypot",').join("");

  

  // if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
  //   var invalidEmail = document.getElementById(invalidEmail_ID);
  //   if (invalidEmail) {
  //     invalidEmail.style.display = "block";
  //     return false;
  //   }
  // } else {
    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        // console.log( xhr.status, xhr.statusText )
        // console.log(xhr.responseText);
        document.getElementById(form_ID).style.display = "none"; // hide form
        var thankYouMessage = document.getElementById(thankyou_ID);
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  // }
}
function loaded() {
  // console.log("Contact form submission handler loaded successfully.");
  // bind to the submit event of our form
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    handleFormSubmit(event, "contact-form", "thankyou-message");
  }, false);
  document.getElementById("buyer-form").addEventListener("submit", function(event) {
    handleFormSubmit(event, "buyer-form", "buyer-message");
  }, false);
  document.getElementById("seller-form").addEventListener("submit", function(event) {
    handleFormSubmit(event, "seller-form", "seller-message");
  }, false);
  document.getElementById("finance-form").addEventListener("submit", function(event) {
    handleFormSubmit(event, "finance-form", "finance-message");
  }, false);
    // form.addEventListener("submit", handleFormSubmit, false);
};
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

document.addEventListener("DOMContentLoaded", loaded, false);
