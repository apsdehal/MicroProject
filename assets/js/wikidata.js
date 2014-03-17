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

var General = {
	createTable: function(){
		var handle = $(".entities");
		this.table = $("<table/>");
		this.table.append($("<tr/>")
				.append($("<th>").text('id'))
				.append($("<th>").text('label'))
				.append($("<th>").text('description'))
			);
			handle.append(this.table);
	},

	addRow: function(object){
		this.table.append($("<tr>")
			.append($("<td>").html($("<a href="+object.url+">").text(object.id)))
			.append($("<td>").text(object.label))
			.append($("<td>").text(object.description))
			)
	}
};

Api.init('https://www.wikidata.org/w/api.php', 'en');

$("#searchbox").bind('keydown', function(e){
	//Enter key pressed
	if(e.keyCode == 13){
		var term = $(this).val();

		Api.searchEntities('item', term).done(function(data){
			General.createTable();
			var result = data.search;
			$.each(result, function(i ,val){
				General.addRow(val);
			});
		});
	}
})