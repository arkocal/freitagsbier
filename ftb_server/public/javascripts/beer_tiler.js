function TileBeer () {
    var page_height = document.getElementById('page').offsetHeight;
    var page_width = document.getElementById('page').offsetWidth;

    var beer_size = 100;
    var number_rows = (page_height + beer_size) / beer_size;
    var number_columns = (page_width + beer_size) / beer_size;
    var real_size = 100/number_rows;
    alert(number_rows);
    for (i=0; i < number_rows; i++) {
        var next_div = document.createElement('div');
        next_div.id = 'div_' + i;
	next_div.style = "height:" + real_size + "%";
	for (j=0; j<number_columns; j++) {
	    var next_canv = document.createElement('canvas');
	    next_canv.style = "height:100%; width=" + real_size + "%";
	    next_canv.id = "beer_" + i +"_"+ j;
	    next_div.appendChild(next_canv);
	}
        page.appendChild(next_div);
    }
}
