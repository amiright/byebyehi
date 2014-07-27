// DOM Ready ==================
$(document).ready(function(){
	
	//Submit Button click
	$('#submit').on('click', addUser);
	
	//Bakc button click
	$('#goBack').on('click', homeScreen);
	
});

// Add User
function addUser(event){
	event.preventDefault();

	//form validation - increase errorCount if number fails regexp test
	var errorCount = 0;
	var chatClient = $('input[type="radio"][name="chatClient"]:checked').val();
	var numberInput = $('#userPin input').val();
	var numberTest = $('#userPin input').val().replace(/[^\d]/g, "");
	if(chatClient === "WhatsApp" && numberTest.length !== 10) {errorCount++;}
	else if (chatClient === "BBM" && numberInput.length !== 8) {errorCount++;}
	
	if(errorCount === 0) {
		
		var newUser = {
			'chatClient': chatClient,
			'number': numberInput
		}
		
		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/adduser',
			dataType: 'JSON'
		}).done(function(response){
			
			//check for successful blank response
			if(response.msg === '') {
				
				//clear number input field
				$('#userPin input').val('');
				
				//toggle css display settings (display thankyou msg)
				$('#chatPreference').toggle();
				$('#userPin').toggle();
				$('#submit').toggle();
				$('#thankyou').toggle();
			}
			else {
				//show error storing the user in the db
				alert('Error: ' + response.msg);
			}
		});
	}
	else {
	alert('Please check the number and try again');
	return false;
	}
};

//HomeScreen
function homeScreen(event){
	event.preventDefault();
		$('#thankyou').toggle();
		$('#chatPreference').toggle();
		$('#userPin').toggle();
		$('#submit').toggle();
		
}	
