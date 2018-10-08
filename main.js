//Initialize function getting data from local storage and fetching it into HTML code
function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
 	var issuesList = document.getElementById('issuesList');

 	issuesList.innerHTML = '';

  // Iterate through data and set it into variables
 	for(let i = 0; i < issues.length; i++) {
 		var id = issues[i].id;
 		var summary = issues[i].summary;
 		var desc = issues[i].description;
 		var severity = issues[i].severity;
 		var assignedTo = issues[i].assignedTo;
 		var status = issues[i].status;

 	issuesList.innerHTML +=     '<div class="card-panel blue-grey lighten-5">'+
                                '<h6><strong>Incident Number: INC' + id + '</strong></h6>'+
                                '<h6><strong>' + status + '</strong></h6>'+
                                '<h4>' + summary + '</h4>'+
                                '<p>' + desc + '</p>'+
                                '<p><i class="material-icons">query_builder</i> ' + severity + '<br>'+
                                '<i class="material-icons">group</i> ' + assignedTo + ' </p> '+
                                '<a class="waves-effect waves-light btn orange darken-1" onclick="setStatusClosed(\''+id+'\')"><i class="material-icons left">close</i>Close</a> '+
                                '<a class="waves-effect waves-light btn orange darken-4" onclick="deleteIssue(\''+id+'\')"><i class="material-icons left">delete_forever</i>Delete</a>'+
                              '</div>';
 	}
}

// Save form after submit and put it into LocalStorage data
function saveIssue(e) {
	var issueId = new Date().valueOf();
	var issueSummary = document.getElementById('issueSummaryDesc').value;
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueStatus = 'Open';

	var issue = {
		id: issueId,
		summary: issueSummary,
	    description: issueDesc,
	    severity: issueSeverity,
	    assignedTo: issueAssignedTo,
	    status: issueStatus
	}

	if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  
  document.getElementById('issueInputForm').reset();
 
  fetchIssues();
  
  e.preventDefault(); 
}

// Close the Incident
function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }
    
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}

// Iterate through data and remove target incident
function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);