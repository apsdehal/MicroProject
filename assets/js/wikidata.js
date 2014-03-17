/**
 * Simple js for querying wikidata api
 * @author Amanpreet Singh
 * dependencies : jquery.js
 */

var Api = {
	init: function(u,l){
		this.url = u;
		this.lingo = l;
	},
	searchEntities: function ( type, search){
		var params = {
			action: 'wbsearchentities',
			language: this.lingo,
			search: search,
			type: type,
			format: 'json',
		};
		return $.getJSON( this.url + '?callback=?', params);
	}
}


Api.init('https://www.wikidata.org/w/api.php', 'en');
console.log(Api.url);
$("#searchbox").bind('keydown', function(e){
	//Enter key pressed
	if(e.keyCode == 13){
		var term = $(this).val();
		Api.searchEntities('item', term).done(function(data){
			console.log(data);
		});
	}
})