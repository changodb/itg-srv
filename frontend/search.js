const $ = require('jquery');
const _ = require('underscore');
const ko = require('knockout');

function SearchViewModel() {
    var self = this;
    self.results = ko.observableArray();
    self.resultsVisible = ko.computed(function() {
        return self.results().length > 0;
    });
}


$(document).ready(function(){
    const searchViewModel = new SearchViewModel();
    ko.applyBindings(searchViewModel);
    const songSearch = $('#song-search')
    songSearch.on("submit", function(event) {
        const payload = _.object($(this).serializeArray().map((v) => {return [v.name, v.value]}));
        $.ajax({
            url: '/search',
            method: 'GET',
            data: $(this).serialize(),
        }).done((data) => {
            console.log(data);
            searchViewModel.results.removeAll();
            _.each(data, (simfile) => {
                searchViewModel.results.push(simfile);
            });
        });
    });
});
