$(document).ready(function() {
	$('#choose-action').on('change', function(e) {
		$('.choose-action-options').hide();
		var action = $('#choose-action option:selected').val();
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