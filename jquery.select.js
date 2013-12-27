/*!
 * jQuery Styled Select, v1.0, 2013-11-29
 * https://github.com/georgekosmidis/jquery-select
 *
 * Based on styledSelect from http://jsfiddle.net/tovic/ZTHkQ/
 */
 
$(document).ready(function () {
    // Iterate over each select element
    $('select').each(function () {

        // Cache the number of options
        var $this = $(this),
	        numberOfOptions = $(this).children('option').length;
        // Hides the select element
        $this.addClass('jquery-select-hidden');
        // Wrap the select element in a div
        $this.wrap('<div class="jquery-select-wrapper"></div>');
        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="jquery-select"></div>');
        // Cache the styled div
        var $select = $this.next('div.jquery-select');
        // Show the first select option in the styled div
        $select.text($this.children('option:selected').text());
        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'jquery-select-options'
        }).insertAfter($select);
        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $select.click(function (e) {
            e.stopPropagation();
            $('div.jquery-select.jquery-select-active').each(function () {
                $(this).removeClass('jquery-select-active').next('ul.jquery-select-options').hide();
            });
            $(this).toggleClass('jquery-select-active').next('ul.jquery-select-options').toggle();
        });

        //handle filtering
        var _select_keypress_hold = '';
        var filterList = function () {
			//write key 
            $select.text(_select_keypress_hold);
			//filter rest
            for (var i = $listItems.length - 1; i >= 0 ; i--) {
                $($listItems[i]).show();
                var html = $($listItems[i]).html();
                if (_select_keypress_hold.length > 0 && html.toLowerCase().indexOf(_select_keypress_hold.toLowerCase()) == -1) {
                    $($listItems[i]).slideUp();
                }
            }
        };
		
		//bind keypress
        $(document).keypress(function (event) {           
            if ($select.attr("class").indexOf("jquery-select-active") != -1) {
				//find key pressed
                if (event.which == 8) {
                    if (_select_keypress_hold.length >= 1)
                        _select_keypress_hold = _select_keypress_hold.substr(0, _select_keypress_hold.length - 1);
                }
                else {
                    if (
                        (event.which >= 48 && event.which <= 57)
                        || (event.which >= 96 && event.which <= 105)
                        || (event.which != 8 && event.which != 9
                            && event.which != 16 && event.which != 17 && event.which != 18 && event.which != 20
                            && event.which != 91 && event.which != 93
                            && event.which != 13 && event.which != 27 && event.which != 46
                            && event.which != 33 && event.which != 34 && event.which != 35 && event.which != 36 && event.which != 37 && event.which != 38 && event.which != 39 && event.which != 40
                            && event.which != 144
                        )
                       )
                        _select_keypress_hold += String.fromCharCode(event.which);
                    else
                        return;
                }

                filterList();
            }
			//bind keydown
        }).keydown(function (event) {
			
            if (event.which == 8) {
                if ($select.attr("class").indexOf("jquery-select-active") != -1) {
                    if (_select_keypress_hold.length >= 1)
                        _select_keypress_hold = _select_keypress_hold.substr(0, _select_keypress_hold.length - 1);
                    event.preventDefault();

                    filterList();
                }
            }
            if (event.which == 13) {
                if ($select.attr("class").indexOf("jquery-select-active") != -1) {
                    for (var i = $listItems.length - 1; i >= 0 ; i--) {
                        var text = $($listItems[i]).text();
                        if (_select_keypress_hold.length > 0 && text == _select_keypress_hold) {
                            $($listItems[i]).trigger("click");
                            return;
                        }
                    }
                }
            }
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $select.text($(this).text()).removeClass('jquery-select-active');
            $this.val($(this).attr('rel'));
            $list.hide();
            $this.trigger('change');
            //alert( $this.prop("selectedIndex") );/
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $select.removeClass('jquery-select-active');
            $list.hide();
        });

    });
});