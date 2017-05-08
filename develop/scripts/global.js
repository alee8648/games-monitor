$(document).ready(function() {
	$('#chooseAction').on('change', function(e) {
		$('.choose-action-options').hide();
		var action = $('#chooseAction option:selected').val();
		switch(action) {
			case 'game':
				$('#addGame').show();
				break;
			case 'feature':
				$('#addFeature').show();
				break;
			case 'platform':
				$('#addPlatform').show();
				break;
			case 'genre':
				$('#addGenre').show();
				break;
			case 'session':
				$('#addSession').show();
				break;
			default:
		}
	});
});