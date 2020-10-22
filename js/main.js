var noOfSeats = 0, clickCounter = 0, k = 0, UserCount = 0;
$(document).ready(function () {
    $('.table').attr('disabled', true);
    var TableRows = $('.table tr');
    var emptyCell = '<td></td>';
    for (var i = 1; i < TableRows.length; i++) {
        var rowID = 1;
        var colId = $('.table tbody tr:nth-child(' + i + ') td:nth-child(' + 1 + ')').text();
        for (var j = 0; j < 21; j++) {
            var id = rowID + colId;
            var appendString = '<td><span class="tdBox" id=' + id + '></span></td>';
            if (j == 10) {
                $('.table tbody tr:nth-child(' + i + ')').append(emptyCell);
                rowID--;
            }
            else {
                $('.table tbody tr:nth-child(' + i + ')').append(appendString);
            }
            rowID++;
        }
    }

    $('#mce-MMERGE5').focusout(function () {
        var BookedSeats = $('#mce-MMERGE5').val();
        noOfSeats = BookedSeats;
        if (BookedSeats > 50)
        {
            alert('Please select max of 50 seats only');
            $('#mce-MMERGE5').val('');
            $('.table tbody tr td span').css({opacity: 0.4});
        }
    });
    var redCount = 0;
    $('#Selectseat').unbind('click').bind('click', function () {
        if ($('#mce-MMERGE5').val() != '' || $('#mce-MMERGE5').val() != 0) {
            var table = document.getElementById("seatTable");
            for (var i = 1, row; row = table.rows[i]; i++) {
                for (var j = 1, col; col = row.cells[j]; j++) {
                    if (col.firstChild != null)
                    {
                        var ClassName = col.firstChild.className;
                        if (ClassName != '' && typeof ClassName !== "undefined" && ClassName !== null) {
                            if (ClassName[1] == 'redColor') {
                                redCount++;
                            }
                            else
                            {
                                break;
                            }
                        }
                    }
                }
            }
            if (redCount == 200)
            {
                $('.table tbody tr td').unbind('click');
                $('.table tbody tr td span').css({opacity: 0.4});
                alert('Sorry HouseFull');
                return;
            }
            $('.table').attr('disabled', false);
            $('.table tbody tr td span').css({opacity: 1});
            $('.table tbody tr td').unbind('click').bind('click', function () {
                var ClassName = $(this).find('span').attr('class');
                ClassName = ClassName.split(" ");
                if (ClassName[1] == 'greenColor') {
                    $(this).find('span').removeClass('greenColor');
                    clickCounter--;
                }
                else
                {
                    if (clickCounter >= noOfSeats)
                    {
                        return;
                    }
                    else
                    {
                        if (ClassName[1] == 'redColor')
                        {
                            return;
                        }
                        else
                        {
                            $(this).find('span').addClass('greenColor');
                            clickCounter++;
                        }
                    }
                }
            });
        }
        else
        {
            alert('Please select no of seats');
        }
    });
    $('#ConfirmSeat').unbind('click').bind('click', function () {
        var table = document.getElementById("seatTable");
        var idList = '';
        var UserName = $('#mce-FNAME').val();
        if (UserName == '')
        {
            alert('Please enter the name to confirm the seats');
            return;
        }
        if ($('#mce-MMERGE5').val() == '' || $('#mce-MMERGE5').val() == 0)
        {
            alert('Please enter number of seats to confirm');
            return;
        }
        else
        {
            for (var i = 1, row; row = table.rows[i]; i++) {
                for (var j = 1, col; col = row.cells[j]; j++) {
                    if (col.firstChild != null)
                    {
                        var ClassName = col.firstChild.className;
                        if (ClassName != '' && typeof ClassName !== "undefined" && ClassName !== null) {
                            ClassName = ClassName.split(" ");
                            if (ClassName[1] == 'greenColor') {
                                UserCount++;
                                idList += $('.table tbody tr:nth-child(' + i + ') td:nth-child(' + (j + 1) + ') span').attr('id') + ',';
                                $('.table tbody tr:nth-child(' + i + ') td:nth-child(' + (j + 1) + ') span').removeClass('greenColor').addClass('redColor');
                            }
                            if (ClassName[1] == 'greenColor') {
                                redCount++;
                            }
                        }
                    }
                }
            }
            if (UserCount != parseInt(noOfSeats))
            {
                UserCount = 0;
                var array = idList.split(',');
                for (var l = 0; l < array.length; l++) {
                    $('#' + array[l]).removeClass('redColor').addClass('greenColor');
                }
                alert('selected seats does not match with the number of seats specified');
                return;
            }
            idList = idList.substring(0, idList.length - 1);
            var newRow = document.createElement('tr');
            newRow.setAttribute('id', 'id_' + k);
            $('.resultTable').append(newRow);
            var td = document.createElement('td');
            td.innerHTML = UserName;
            document.getElementById('id_' + k).appendChild(td);
            td = document.createElement('td');
            td.innerHTML = UserCount;
            document.getElementById('id_' + k).appendChild(td);
            td = document.createElement('td');
            td.innerHTML = idList;
            document.getElementById('id_' + k).appendChild(td);
            k++;
            clickCounter = 0;
            UserCount = 0;
            $('.table tbody tr td').unbind('click');
            $('.table tbody tr td span').css({opacity: 0.4});

            // set the reserved input to reserved seats
            $('#mce-MMERGE2').val(idList);

            // Originally clears fields after clear is pressed 
            // but now, clear when subscribe is pressed
            // $('#mce-FNAME').val('');
            // $('#mce-MMERGE5').val('');
            
        }
    });

});

function sendMail()
{
   var mailBody=document.getElementById('mailBody').innerHTML;
   window.location="mailto:kariukindegwa98@gmail.com?subject=hii&body="+mailBody;
}